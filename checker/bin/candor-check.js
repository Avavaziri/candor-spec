#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { scan, shouldScan, MAX_FILE_BYTES, MAX_FILES } from '../src/scan.js'
import { toMarkdown, toPrompt } from '../src/report.js'
import { SKIP_DIRS } from '../src/detect.js'

const HELP = `candor-check: scan an AI web app's code against the Candor patterns.

Usage: candor-check [folder] [options]

Options:
  --json             Print the full report as JSON
  --md               Print the report as Markdown
  --prompt           Print a fix list to paste into an AI coding tool
  --fail-on <level>  Exit with code 1 on "fail" (default), "warn" or "never"
  -h, --help         Show this help

Nothing leaves your computer. The scan reads files only.`

const args = process.argv.slice(2)
if (args.includes('-h') || args.includes('--help')) {
  console.log(HELP)
  process.exit(0)
}
const flag = (name) => args.includes(name)
const failOnIndex = args.indexOf('--fail-on')
const failOn = failOnIndex >= 0 ? args[failOnIndex + 1] : 'fail'
const root = resolve(args.find((a, i) => !a.startsWith('-') && args[i - 1] !== '--fail-on') ?? '.')

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (out.length >= MAX_FILES) break
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) walk(full, out)
    } else if (entry.isFile()) {
      const path = relative(root, full).replace(/\\/g, '/')
      if (shouldScan(path) && statSync(full).size <= MAX_FILE_BYTES) out.push({ path, text: readFileSync(full, 'utf8') })
    }
  }
  return out
}

let files
try {
  files = walk(root)
} catch (error) {
  console.error(`candor-check: cannot read ${root}: ${error.message}`)
  process.exit(2)
}

const report = scan(files)

if (flag('--json')) console.log(JSON.stringify(report, null, 2))
else if (flag('--md')) console.log(toMarkdown(report))
else if (flag('--prompt')) console.log(toPrompt(report))
else printText(report)

const failed = failOn === 'never' ? false : failOn === 'warn' ? report.summary.fail + report.summary.warn > 0 : report.summary.fail > 0
process.exit(failed ? 1 : 0)

function printText(r) {
  const tty = process.stdout.isTTY && !process.env.NO_COLOR
  const c = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s)
  const bold = (s) => c(1, s)
  const dim = (s) => c(2, s)
  console.log(bold('Candor check') + dim(`  ${r.scannedFiles} files scanned`))
  if (!r.aiApp) {
    console.log('\nNo AI features found, so no rules ran.')
    return
  }
  if (r.providers.length) console.log(dim(`Model providers: ${r.providers.join(', ')}`))
  for (const rule of r.results.filter((x) => x.findings.length)) {
    console.log('\n' + bold(rule.title))
    console.log(dim(rule.why))
    for (const f of rule.findings) {
      const tag = f.severity === 'fail' ? c(31, 'MUST FIX') : c(33, 'LOOK')
      console.log(`  ${tag}  ${f.file}:${f.line}  ${f.message}`)
    }
    console.log(`  ${c(32, 'Fix:')} ${rule.fix}`)
    console.log(dim(`  Rules: ${rule.refs.map((x) => x.label).join(', ')}`))
  }
  console.log('\n' + bold('Check by hand'))
  for (const m of r.manual) console.log(`  [ ] ${m.id}  ${m.text}`)
  const { fail, warn, passed } = r.summary
  console.log(`\n${c(31, `${fail} must fix`)}, ${c(33, `${warn} worth a look`)}, ${c(32, `${passed} rules passed`)}.`)
  console.log(dim('A clean scan finds no common problems. It does not prove conformance to Candor.'))
}
