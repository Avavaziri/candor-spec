import type MarkdownIt from 'markdown-it'

const KEYWORDS = /\b(MUST NOT|MUST|SHALL NOT|SHALL|SHOULD NOT|SHOULD|NOT RECOMMENDED|RECOMMENDED|REQUIRED|MAY|OPTIONAL)\b/g

// Marks BCP 14 keywords so they render in small caps. Only uppercase forms carry meaning.
export function bcp14(md: MarkdownIt) {
  const text = md.renderer.rules.text!
  md.renderer.rules.text = (tokens, idx, options, env, self) => {
    const html = text(tokens, idx, options, env, self)
    return html.replace(KEYWORDS, '<strong class="bcp14">$1</strong>')
  }
}
