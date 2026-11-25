// Turns a scan report into Markdown, or into a prompt that a coding assistant can act on.

const issues = (report) =>
  report.results.flatMap((r) => r.findings.map((f) => ({ rule: r, ...f }))).sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'fail' ? -1 : 1))

export function toMarkdown(report) {
  const out = ['# Candor check report', '']
  if (!report.aiApp) {
    out.push(`Scanned ${report.scannedFiles} files. No AI features were found, so no rules ran.`)
    return out.join('\n')
  }
  const { fail, warn, passed } = report.summary
  out.push(`Scanned ${report.scannedFiles} files (${report.aiFiles} with AI code).`)
  if (report.providers.length) out.push(`Model providers found: ${report.providers.join(', ')}.`)
  out.push('', `- Must fix: ${fail}`, `- Worth a look: ${warn}`, `- Rules passed: ${passed}`, '')
  for (const r of report.results.filter((x) => x.findings.length)) {
    out.push(`## ${r.title}`, '', r.why, '', `**Fix:** ${r.fix}`, '', `Rules: ${r.refs.map((x) => `[${x.label}](${x.href})`).join(', ')}`, '')
    for (const f of r.findings) out.push(`- **${f.severity === 'fail' ? 'Must fix' : 'Worth a look'}** \`${f.file}:${f.line}\`: ${f.message}`)
    out.push('')
  }
  out.push('## Check by hand', '', 'Code scans cannot test these. Try them in the running app.', '')
  for (const m of report.manual) out.push(`- [ ] [${m.id}](${m.href}) ${m.text}`)
  out.push('', 'Passing this check does not mean the app conforms to Candor. It finds common problems only.')
  return out.join('\n')
}

export function toPrompt(report) {
  const list = issues(report)
  if (!list.length) return 'The Candor check found no problems in the code. Please help me test the manual checks: ' + report.manual.map((m) => m.text).join(' ')
  const lines = [
    'Fix these problems in my AI app. They come from a Candor check (open patterns for honest, safe AI interfaces).',
    'Fix one problem at a time. Keep the current behaviour otherwise. Tell me what you changed.',
    ''
  ]
  list.forEach((i, n) => {
    lines.push(`${n + 1}. ${i.rule.title} (${i.severity === 'fail' ? 'must fix' : 'should fix'})`)
    lines.push(`   Where: ${i.file}, line ${i.line}. ${i.message}`)
    lines.push(`   Why: ${i.rule.why}`)
    lines.push(`   Fix: ${i.rule.fix}`)
    lines.push(`   Rule: ${i.rule.refs.map((r) => `${r.label} ${r.href}`).join('; ')}`)
    lines.push('')
  })
  return lines.join('\n')
}
