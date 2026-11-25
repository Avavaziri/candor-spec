// A small, made-up vibe-coded chat app with typical problems. Used by the "Try a sample" button and the tests.
export const SAMPLE_PROJECT = [
  {
    path: 'sample-app/src/lib/ai.ts',
    text: `import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export const SYSTEM_PROMPT = 'You are a helpful assistant for Acme. Always answer confidently.'

export const tools = [
  {
    type: 'function',
    function: {
      name: 'send_email',
      description: 'Send an email for the user',
      parameters: { type: 'object', properties: { to: { type: 'string' }, body: { type: 'string' } } }
    }
  }
]
`
  },
  {
    path: 'sample-app/src/components/Chat.tsx',
    text: `import { useState } from 'react'
import { marked } from 'marked'
import { openai, SYSTEM_PROMPT, tools } from '../lib/ai'

export function Chat() {
  const [messages, setMessages] = useState([])
  async function send(text) {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages, { role: 'user', content: text }],
      tools
    })
    const next = [...messages, { role: 'user', content: text }, res.choices[0].message]
    setMessages(next)
    localStorage.setItem('chat-history', JSON.stringify(next))
  }
  return (
    <div className="chat">
      {messages.map((m, i) => (
        <div key={i} className={m.role} dangerouslySetInnerHTML={{ __html: marked.parse(m.content ?? '') }} />
      ))}
    </div>
  )
}
`
  }
]
