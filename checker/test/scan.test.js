import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scan } from '../src/scan.js'
import { toMarkdown, toPrompt } from '../src/report.js'
import { SAMPLE_PROJECT } from '../src/sample.js'

const ids = (report, sev) => report.results.filter((r) => r.findings.some((f) => !sev || f.severity === sev)).map((r) => r.id).sort()

test('sample project fails the expected rules', () => {
  const report = scan(SAMPLE_PROJECT)
  assert.equal(report.aiApp, true)
  assert.deepEqual(report.providers, ['OpenAI'])
  assert.deepEqual(ids(report, 'fail'), ['api-key-in-code', 'markdown-raw-html', 'raw-html-output', 'tools-without-approval'])
  assert.ok(ids(report, 'warn').includes('prompt-no-uncertainty'))
  assert.ok(ids(report, 'warn').includes('chat-stored-no-delete'))
  assert.ok(ids(report, 'warn').includes('stream-not-announced'))
  assert.ok(ids(report, 'warn').includes('browser-calls-provider'))
})

test('non-AI project runs no rules', () => {
  const report = scan([{ path: 'src/App.tsx', text: 'export const App = () => <h1>Hello</h1>' }])
  assert.equal(report.aiApp, false)
  assert.equal(report.results.length, 0)
  assert.match(toMarkdown(report), /No AI features/)
})

test('a careful app passes the code rules', () => {
  const report = scan([
    {
      path: 'app/api/chat/route.ts',
      text: `import { streamText, tool } from 'ai'
import { openai } from '@ai-sdk/openai'
export async function POST(req) {
  const result = streamText({
    model: openai('gpt-4o'),
    system: 'If you do not know, say so in your first sentence.',
    tools: { sendEmail: tool({ description: 'Send an email', needsApproval: true, inputSchema: schema }) }
  })
  return result.toUIMessageStreamResponse()
}`
    },
    {
      path: 'app/chat.tsx',
      text: `'use client'
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'
export function Chat() {
  const { messages } = useChat()
  return <div role="log">{messages.map((m) => m.parts.map((p) => p.type === 'tool-sendEmail'
    ? <ToolCall part={p} />
    : <ReactMarkdown components={{ img: SafeImage, a: SafeLink }}>{p.text}</ReactMarkdown>))}</div>
}`
    }
  ])
  assert.equal(report.aiApp, true)
  assert.deepEqual(ids(report), [])
  assert.match(toPrompt(report), /no problems/)
})

test('secrets are masked in the report', () => {
  const key = 'sk-proj-' + 'a'.repeat(40)
  const report = scan([{ path: 'src/ai.js', text: `import OpenAI from 'openai'\nconst c = new OpenAI({ apiKey: '${key}' })` }])
  const text = JSON.stringify(report)
  assert.ok(!text.includes(key))
  assert.match(text, /\[hidden\]/)
})

test('server files may read secret env vars', () => {
  const report = scan([{ path: 'server/ai.js', text: `import OpenAI from 'openai'\nconst c = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })` }])
  assert.deepEqual(ids(report, 'fail'), [])
})

test('skips node_modules and unknown file types', () => {
  const report = scan([
    { path: 'node_modules/openai/index.js', text: "import OpenAI from 'openai'" },
    { path: 'README.md', text: 'sk-proj-' + 'b'.repeat(40) }
  ])
  assert.equal(report.scannedFiles, 0)
})
