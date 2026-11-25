// File classification shared by every rule.

export const SCAN_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte', '.astro', '.html', '.htm']
export const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', '.nuxt', '.svelte-kit', '.vercel', '.netlify', 'out', 'coverage', 'vendor', '.turbo', '.cache']
export const MAX_FILE_BYTES = 1_000_000
export const MAX_FILES = 5000

export function shouldScan(path) {
  const parts = path.replace(/\\/g, '/').split('/')
  if (parts.some((p) => SKIP_DIRS.includes(p))) return false
  const name = parts[parts.length - 1]
  if (/\.min\.js$|\.d\.ts$|\.map$/.test(name)) return false
  return SCAN_EXTENSIONS.some((ext) => name.endsWith(ext))
}

const LLM_IMPORTS = /from\s+['"](openai|@anthropic-ai\/sdk|ai|ai\/react|@ai-sdk\/[\w-]+|langchain|@langchain\/[\w-]+|@google\/generative-ai|@google\/genai|groq-sdk|@mistralai\/mistralai|ollama|cohere-ai|replicate|together-ai)['"]|require\(['"](openai|@anthropic-ai\/sdk|ai|langchain|@google\/generative-ai|groq-sdk)['"]\)/
const LLM_CALLS = /\b(useChat|useCompletion|useAssistant|streamText|generateText|streamObject|generateObject|chat\.completions\.create|responses\.create|messages\.create|generateContent|sendMessageStream)\b|api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com|api\.groq\.com|openrouter\.ai\/api/
const CHAT_UI = /role\s*===?\s*['"]assistant['"]|\bmessages\.map\(|\bmessage\.content\b|\bmsg\.content\b|\bm\.content\b|\bcompletion\b|\bassistantMessage\b|\baiResponse\b|\bbotMessage\b/

export const PROVIDERS = [
  { name: 'OpenAI', re: /api\.openai\.com|from\s+['"]openai['"]|@ai-sdk\/openai/ },
  { name: 'Anthropic', re: /api\.anthropic\.com|@anthropic-ai\/sdk|@ai-sdk\/anthropic/ },
  { name: 'Google', re: /generativelanguage\.googleapis\.com|@google\/generative-ai|@google\/genai|@ai-sdk\/google/ },
  { name: 'Groq', re: /api\.groq\.com|groq-sdk|@ai-sdk\/groq/ },
  { name: 'Mistral', re: /api\.mistral\.ai|@mistralai\/mistralai|@ai-sdk\/mistral/ },
  { name: 'OpenRouter', re: /openrouter\.ai/ }
]

export function isAiFile(text) {
  return LLM_IMPORTS.test(text) || LLM_CALLS.test(text) || CHAT_UI.test(text)
}

export function isServerFile(path, text) {
  const p = path.replace(/\\/g, '/')
  if (/^\s*['"]use client['"]/.test(text)) return false
  if (/^\s*['"]use server['"]/.test(text) || /from\s+['"]server-only['"]/.test(text)) return true
  if (/(^|\/)(api|server|functions|netlify|supabase\/functions|edge|backend|lambda|workers?)\//.test(p)) return true
  if (/\.server\.[jt]sx?$|(^|\/)route\.[jt]s$|(^|\/)middleware\.[jt]s$|(^|\/)\+server\.[jt]s$|(^|\/)\+page\.server\.[jt]s$/.test(p)) return true
  if (/from\s+['"](express|fastify|hono|koa|@nestjs\/core|next\/server)['"]|require\(['"]express['"]\)/.test(text)) return true
  return false
}

export function lineOf(text, index) {
  let line = 1
  for (let i = 0; i < index && i < text.length; i++) if (text.charCodeAt(i) === 10) line++
  return line
}

export function excerpt(text, line, around = 1) {
  const lines = text.split('\n')
  const start = Math.max(0, line - 1 - around)
  const end = Math.min(lines.length, line + around)
  return lines
    .slice(start, end)
    .map((l, i) => `${String(start + i + 1).padStart(4)} | ${l.length > 160 ? l.slice(0, 157) + '...' : l}`)
    .join('\n')
}
