// Runs every rule over a list of files. Pure: no file system, so it works in Node and in the browser.
import { isAiFile, isServerFile, lineOf, excerpt, shouldScan, MAX_FILE_BYTES, MAX_FILES } from './detect.js'
import { RULES, MANUAL_CHECKS, providerNames, maskSecrets } from './rules.js'

export { shouldScan, MAX_FILE_BYTES, MAX_FILES }

/**
 * @param {{ path: string, text: string }[]} input
 */
export function scan(input) {
  const files = input
    .filter((f) => shouldScan(f.path) && f.text.length <= MAX_FILE_BYTES)
    .slice(0, MAX_FILES)
    .map((f) => {
      const text = f.text.replace(/\r\n/g, '\n')
      return { path: f.path.replace(/\\/g, '/'), text, ai: isAiFile(text), server: isServerFile(f.path, text) }
    })

  const aiApp = files.some((f) => f.ai)
  const results = []
  if (aiApp) {
    for (const rule of RULES) {
      const raw =
        rule.scope === 'file'
          ? files.flatMap((f) => rule.check(f).map((hit) => ({ ...hit, file: f.path })))
          : rule.check({ files })
      const findings = raw.map((hit) => {
        const file = files.find((f) => f.path === hit.file)
        const line = lineOf(file.text, hit.index)
        return {
          severity: hit.severity ?? rule.severity,
          file: hit.file,
          line,
          message: hit.message,
          code: maskSecrets(excerpt(file.text, line))
        }
      })
      results.push({ ...rule, check: undefined, findings: dedupe(findings) })
    }
  }

  const count = (sev) => results.reduce((n, r) => n + r.findings.filter((f) => f.severity === sev).length, 0)
  return {
    version: 1,
    scannedFiles: files.length,
    aiFiles: files.filter((f) => f.ai).length,
    aiApp,
    providers: providerNames(files),
    summary: {
      fail: count('fail'),
      warn: count('warn'),
      passed: results.filter((r) => !r.findings.length).length,
      rules: results.length
    },
    results,
    manual: aiApp ? MANUAL_CHECKS : []
  }
}

function dedupe(findings) {
  const seen = new Set()
  return findings.filter((f) => {
    const key = `${f.file}:${f.line}:${f.message}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
