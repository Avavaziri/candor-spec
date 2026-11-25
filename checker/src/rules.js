// Candor check rules. Each rule finds code patterns that break, or often break, a Candor requirement.
import { PROVIDERS } from './detect.js'

const SPEC = 'https://avavaziri.github.io/candor-spec'
const req = (id, page) => ({ label: id, href: `${SPEC}/patterns/${page}#${id.toLowerCase()}` })
const ext = (label, href) => ({ label, href })

const OWASP_LLM02 = ext('OWASP LLM02:2025', 'https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/')
const OWASP_LLM05 = ext('OWASP LLM05:2025', 'https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/')
const OWASP_LLM06 = ext('OWASP LLM06:2025', 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/')
const WCAG_413 = ext('WCAG 2.2 SC 4.1.3', 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html')

const SECRET_PATTERNS = [
  /\bsk-ant-[A-Za-z0-9_-]{20,}/g,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}/g,
  /\bAIza[0-9A-Za-z_-]{35}\b/g,
  /\bgsk_[A-Za-z0-9]{20,}/g,
  /\bxai-[A-Za-z0-9]{20,}/g
]
export const maskSecrets = (s) => SECRET_PATTERNS.reduce((out, re) => out.replace(re, (m) => m.slice(0, 6) + '…[hidden]'), s)

function matches(text, re) {
  const out = []
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')
  let m
  while ((m = g.exec(text))) {
    out.push(m)
    if (m.index === g.lastIndex) g.lastIndex++
  }
  return out
}

const SANITIZER = /DOMPurify|sanitize-html|sanitizeHtml|rehype-sanitize|rehypeSanitize|\bxss\(|isomorphic-dompurify|sanitize\(/
const MARKDOWN = /react-markdown|<ReactMarkdown|<Markdown\b|\bmarked\b|markdown-it|\bremark\(|streamdown|<Streamdown|MemoizedMarkdown|showdown|micromark/
const TOOL_DEF = /\btools\s*:|\btool\(\s*\{|function_declarations|functionDeclarations|input_schema|inputSchema|type\s*:\s*['"]function['"]|\bparameters\s*:\s*z\.object/
const SIDE_EFFECT = /\b(send|email|mail|delete|remove|drop|post|publish|tweet|pay|payment|charge|refund|transfer|purchase|buy|order|book|create|update|insert|write|forward|share|invite|deploy|execute|run_?command|shell)\w*/i
const APPROVAL = /needsApproval|requireApproval|requiresApproval|approval|approve|confirm|humanInTheLoop|human_in_the_loop|addToolResult|addToolApprovalResponse|onToolCall|awaitingConfirmation|pendingAction/i
const TOOL_UI = /toolInvocations|tool-invocation|toolInvocation|type\s*===?\s*['"]tool-|tool_calls|toolCalls|tool_use|ToolCall|toolResult|actionLog|activityLog/
const RETRIEVAL = /similaritySearch|vectorStore|VectorStore|match_documents|embeddings\.create|embedMany|\bembed\(|pinecone|qdrant|chromadb|weaviate|pgvector|\bretriever\b|createRetrievalChain|file_search|web_search|tavily|serpapi|exa-js|perplexity|googleSearch|search_query/
const CITATION_UI = /citation|cite\b|sources?\.map|source\.url|source\.title|annotations|groundingMetadata|groundingChunks|references\.map|footnote/i
const SYSTEM_PROMPT = /role\s*:\s*['"]system['"]|\bsystem\s*:\s*[`'"]|systemInstruction|SYSTEM_PROMPT|systemPrompt|system_prompt/
const ADMITS = /don['’]?t know|do not know|not sure|unsure|uncertain|can['’]?t find|cannot find|could not find|say so|admit|no information|not enough information|i['’]m not certain/i
const LIVE_REGION = /aria-live|role\s*=\s*\{?\s*['"](log|status)['"]/
const CHAT_RENDER = /\bmessages\.map\(|useChat\(|\.content\b.*role|role\s*===?\s*['"]assistant['"]/
const STORAGE_WRITE = /(localStorage|sessionStorage)\.setItem\(\s*[`'"][^`'"]*(message|chat|conversation|history|thread)[^`'"]*[`'"]|idb|indexedDB|localforage|dexie/i
const STORAGE_DELETE = /(localStorage|sessionStorage)\.(removeItem|clear)\(|deleteConversation|clearChat|clearHistory|deleteChat|\.delete\(|deleteDB/i

export const RULES = [
  {
    id: 'raw-html-output',
    title: 'AI output is inserted as raw HTML',
    severity: 'fail',
    refs: [req('INJ-1.6', 'injection/source-trust-labels'), req('INJ-1.7', 'injection/source-trust-labels'), OWASP_LLM05],
    why: 'A model can repeat HTML from a web page or email. Raw HTML can load a remote image that leaks data in its address, or add links and scripts.',
    fix: 'Render AI output as text or as sanitised Markdown. If you must insert HTML, clean it with DOMPurify and remove img, iframe, form and script tags.',
    scope: 'file',
    check({ text, ai }) {
      if (!ai) return []
      const hits = matches(text, /dangerouslySetInnerHTML|\bv-html\b|\{@html\b|\.innerHTML\s*=|insertAdjacentHTML\(|\.outerHTML\s*=/)
      if (!hits.length) return []
      const cleaned = SANITIZER.test(text)
      return hits.map((m) => ({
        index: m.index,
        severity: cleaned ? 'warn' : 'fail',
        message: cleaned
          ? 'AI output goes in as HTML through a sanitiser. Check that the sanitiser also removes img and iframe tags.'
          : 'AI output goes in as raw HTML with no sanitiser in this file.'
      }))
    }
  },
  {
    id: 'markdown-raw-html',
    title: 'Markdown renderer lets raw HTML through',
    severity: 'fail',
    refs: [req('INJ-1.6', 'injection/source-trust-labels'), OWASP_LLM05],
    why: 'Markdown from a model can contain HTML tags. With raw HTML turned on, those tags reach the page.',
    fix: 'Remove rehype-raw, or add rehype-sanitize after it. For markdown-it, keep html: false.',
    scope: 'file',
    check({ text, ai }) {
      if (!ai) return []
      const out = []
      for (const m of matches(text, /rehype-raw|rehypeRaw/)) if (!/rehype-sanitize|rehypeSanitize/.test(text)) out.push({ index: m.index, message: 'rehype-raw is on with no rehype-sanitize.' })
      for (const m of matches(text, /markdownit\([^)]*html\s*:\s*true|html\s*:\s*true[^}]*linkify/)) out.push({ index: m.index, message: 'markdown-it has html: true.' })
      for (const m of matches(text, /\bmarked(\.parse)?\(/)) if (!SANITIZER.test(text)) out.push({ index: m.index, message: 'marked passes raw HTML through, and this file has no sanitiser.' })
      return out
    }
  },
  {
    id: 'markdown-links-images',
    title: 'Images and links in AI answers load or open with no check',
    severity: 'warn',
    refs: [req('INJ-1.6', 'injection/source-trust-labels'), req('INJ-1.7', 'injection/source-trust-labels')],
    why: 'An image in an AI answer loads the moment it shows. Its address can carry private data to an attacker. A link can point somewhere other than its text says.',
    fix: 'Override the img and a renderers. Show images only after a click, and show the full link address before it opens. In react-markdown, pass components={{ img, a }}, or use disallowedElements={["img"]}.',
    scope: 'file',
    check({ text, ai }) {
      if (!ai) return []
      const m = text.match(MARKDOWN)
      if (!m) return []
      const handlesImg = /\bimg\s*[:(]|disallowedElements|allowedElements|urlTransform|transformImageUri|skipHtml|renderer\.image|rules\.image/.test(text)
      const handlesLink = /\ba\s*:\s*[\w({]|renderer\.link|rules\.link_open|urlTransform|transformLinkUri/.test(text)
      if (handlesImg && handlesLink) return []
      const missing = [!handlesImg && 'images', !handlesLink && 'links'].filter(Boolean).join(' and ')
      return [{ index: m.index, message: `This Markdown renderer shows ${missing} from AI answers with no override.` }]
    }
  },
  {
    id: 'api-key-in-code',
    title: 'Model API key is in the code or sent to the browser',
    severity: 'fail',
    refs: [OWASP_LLM02, req('PRV-2.1', 'privacy/egress-notice')],
    why: 'Anyone can read browser code. A leaked key lets other people use your account and read what it can read.',
    fix: 'Move the key to a server environment variable. Call the model from a server route. Never use NEXT_PUBLIC_ or VITE_ names for secrets, and never set dangerouslyAllowBrowser.',
    scope: 'file',
    check({ text, server }) {
      const out = []
      for (const re of SECRET_PATTERNS) for (const m of matches(text, re)) out.push({ index: m.index, message: 'A model API key is written in the source code.' })
      for (const m of matches(text, /dangerouslyAllowBrowser\s*:\s*true/)) out.push({ index: m.index, message: 'dangerouslyAllowBrowser sends the API key to every visitor.' })
      if (!server) for (const m of matches(text, /\b(NEXT_PUBLIC|VITE|REACT_APP|EXPO_PUBLIC|PUBLIC)_[A-Z0-9_]*(OPENAI|ANTHROPIC|CLAUDE|GEMINI|GOOGLE_AI|GROQ|MISTRAL|OPENROUTER|LLM|AI)[A-Z0-9_]*(KEY|TOKEN|SECRET)\b/)) out.push({ index: m.index, message: `${m[0]} is a public variable, so the key ships to the browser.` })
      return out
    }
  },
  {
    id: 'browser-calls-provider',
    title: 'The browser sends messages straight to a model provider',
    severity: 'warn',
    refs: [req('PRV-2.1', 'privacy/egress-notice'), req('PRV-2.3', 'privacy/egress-notice')],
    why: 'The user’s words leave their device and go to a third party. Candor asks you to say where data goes before the user sends it.',
    fix: 'Send requests through your own server. Near the message box, name the provider that will process the message, for example "Processed by OpenAI".',
    scope: 'file',
    check({ text, server }) {
      if (server) return []
      const m = text.match(/fetch\(\s*[`'"]https:\/\/(api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com|api\.groq\.com|api\.mistral\.ai|openrouter\.ai)/)
      if (m) return [{ index: m.index, message: `This browser code calls ${m[1]} directly.` }]
      const sdk = text.match(/dangerouslyAllowBrowser\s*:\s*true/)
      if (!sdk) return []
      const provider = PROVIDERS.find((p) => p.re.test(text))?.name ?? 'the model provider'
      return [{ index: sdk.index, message: `This browser code sends messages straight to ${provider}.` }]
    }
  },
  {
    id: 'tools-without-approval',
    title: 'The assistant can take actions with no confirmation step',
    severity: 'fail',
    refs: [req('INJ-2.1', 'injection/confirm-triggered-actions'), req('INJ-2.2', 'injection/confirm-triggered-actions'), OWASP_LLM06],
    why: 'Text in a web page, email or file can tell the model to call a tool. Without a confirmation, that text acts for the user.',
    fix: 'Ask the user before any tool that sends, changes, deletes or pays. Show the action, the target and every parameter. Put focus on Deny, not Allow.',
    scope: 'project',
    check({ files }) {
      if (files.some((f) => APPROVAL.test(f.text) && TOOL_DEF.test(f.text)) || files.some((f) => /needsApproval|requireApproval|addToolResult|addToolApprovalResponse/.test(f.text))) return []
      const out = []
      for (const f of files) {
        if (!f.ai || !TOOL_DEF.test(f.text)) continue
        const def = f.text.search(TOOL_DEF)
        const window = f.text.slice(def, def + 4000)
        const verb = window.match(SIDE_EFFECT)
        if (verb) out.push({ file: f.path, index: def, message: `Tools are defined here, including one that looks like it changes things ("${verb[0]}"). No approval step was found in the project.` })
      }
      return out
    }
  },
  {
    id: 'no-action-log',
    title: 'Tool calls are not shown to the user',
    severity: 'warn',
    refs: [req('INJ-4.1', 'injection/action-log'), req('INJ-4.2', 'injection/action-log')],
    why: 'If the assistant calls tools out of sight, the user cannot see what it did, or spot an action that external content started.',
    fix: 'Render each tool call in the conversation: the action, the target, the time and the result. Keep denied and failed calls too.',
    scope: 'project',
    check({ files }) {
      const toolFile = files.find((f) => f.ai && TOOL_DEF.test(f.text))
      if (!toolFile) return []
      if (files.some((f) => !f.server && TOOL_UI.test(f.text))) return []
      return [{ file: toolFile.path, index: toolFile.text.search(TOOL_DEF), message: 'The project defines tools, but no browser code renders tool calls.' }]
    }
  },
  {
    id: 'retrieval-without-sources',
    title: 'Answers use retrieved content but show no sources',
    severity: 'warn',
    refs: [req('CIT-1.7', 'citing/inline-citations'), req('INJ-1.9', 'injection/source-trust-labels')],
    why: 'When an answer comes from documents or search results, the user needs to check where each claim came from.',
    fix: 'Return the sources with each answer. Show a numbered marker after each claim and a source list with title, owner and date.',
    scope: 'project',
    check({ files }) {
      const r = files.find((f) => RETRIEVAL.test(f.text))
      if (!r) return []
      if (files.some((f) => !f.server && CITATION_UI.test(f.text))) return []
      return [{ file: r.path, index: r.text.search(RETRIEVAL), message: 'This file retrieves content for answers, but no browser code shows sources or citations.' }]
    }
  },
  {
    id: 'prompt-no-uncertainty',
    title: 'The system prompt never tells the model it may say "I don’t know"',
    severity: 'warn',
    refs: [req('UNC-3.2', 'uncertainty/declining-to-answer'), req('UNC-3.1', 'uncertainty/declining-to-answer')],
    why: 'Models fill gaps with confident guesses unless told otherwise. Candor asks for a plain decline in place of an invented answer.',
    fix: 'Add to the system prompt: "If you do not know, or the sources do not answer the question, say so in your first sentence. Never invent facts, figures, names or links." Then show the decline like any other answer.',
    scope: 'project',
    check({ files }) {
      const p = files.find((f) => SYSTEM_PROMPT.test(f.text))
      if (!p) return []
      if (files.some((f) => SYSTEM_PROMPT.test(f.text) && ADMITS.test(f.text))) return []
      return [{ file: p.path, index: p.text.search(SYSTEM_PROMPT), message: 'A system prompt is here, but no prompt in the project mentions not knowing.' }]
    }
  },
  {
    id: 'stream-not-announced',
    title: 'New AI messages are not announced to screen readers',
    severity: 'warn',
    refs: [WCAG_413, ext('Candor UNC-1 accessibility', `${SPEC}/patterns/uncertainty/confidence-signal#accessibility`)],
    why: 'Screen reader users do not hear an answer arrive unless the message area is a live region.',
    fix: 'Give the message list role="log", or put a polite live region (aria-live="polite") near it. Announce the finished answer once, not every streamed word.',
    scope: 'project',
    check({ files }) {
      const ui = files.find((f) => !f.server && f.ai && CHAT_RENDER.test(f.text))
      if (!ui) return []
      if (files.some((f) => LIVE_REGION.test(f.text))) return []
      return [{ file: ui.path, index: ui.text.search(CHAT_RENDER), message: 'This chat view has no live region anywhere in the project.' }]
    }
  },
  {
    id: 'chat-stored-no-delete',
    title: 'Conversations are saved with no way to delete them',
    severity: 'warn',
    refs: [req('PRV-3.7', 'privacy/consent-and-retention'), req('PRV-3.6', 'privacy/consent-and-retention')],
    why: 'Saved chats can hold personal data. The user needs to see what is kept, for how long, and delete it.',
    fix: 'Add a "Delete conversation" control and a "Clear all history" control. Say how long chats are kept.',
    scope: 'project',
    check({ files }) {
      const w = files.find((f) => STORAGE_WRITE.test(f.text))
      if (!w) return []
      if (files.some((f) => STORAGE_DELETE.test(f.text))) return []
      return [{ file: w.path, index: w.text.search(STORAGE_WRITE), message: 'Chat data is saved here, and nothing in the project deletes it.' }]
    }
  }
]

export const MANUAL_CHECKS = [
  { id: 'UNC-3.1', page: 'uncertainty/declining-to-answer', text: 'Ask something your app cannot answer. The first sentence of the reply says so.' },
  { id: 'UNC-1.3', page: 'uncertainty/confidence-signal', text: 'If you show confidence, it has a text label such as "Low confidence", not only a colour.' },
  { id: 'INJ-1.1', page: 'injection/source-trust-labels', text: 'Content from web pages, emails and files carries a label that names where it came from.' },
  { id: 'INJ-2.8', page: 'injection/confirm-triggered-actions', text: 'A confirmation for an action that cannot be undone says so.' },
  { id: 'PRV-1.2', page: 'privacy/context-indicator', text: 'The user can see a list of everything the AI can read right now.' },
  { id: 'PRV-2.1', page: 'privacy/egress-notice', text: 'Before sending, the user can see who will process the message.' },
  { id: 'CIT-1.6', page: 'citing/inline-citations', text: 'A screen reader reads the source title for each citation marker, not just "1".' },
  { id: 'CIT-4.1', page: 'citing/uncited-claims', text: 'Claims that no source supports carry a visible "No source" mark.' }
].map((c) => ({ ...c, href: `${SPEC}/patterns/${c.page}#${c.id.toLowerCase()}` }))

export const providerNames = (files) => PROVIDERS.filter((p) => files.some((f) => p.re.test(f.text))).map((p) => p.name)
