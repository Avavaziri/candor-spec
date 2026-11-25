import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'
import { bcp14 } from './bcp14'

const repo = 'https://github.com/Avavaziri/candor-spec'

const areas = [
  {
    text: 'Uncertainty',
    dir: 'uncertainty',
    items: [
      ['UNC-1', 'confidence-signal', 'Confidence signal'],
      ['UNC-2', 'hedged-wording', 'Hedged wording'],
      ['UNC-3', 'declining-to-answer', 'Declining to answer'],
      ['UNC-4', 'ask-or-proceed', 'Ask or proceed']
    ]
  },
  {
    text: 'Injection warnings',
    dir: 'injection',
    items: [
      ['INJ-1', 'source-trust-labels', 'Source trust labels'],
      ['INJ-2', 'confirm-triggered-actions', 'Confirm triggered actions'],
      ['INJ-3', 'suspected-injection-notice', 'Suspected injection notice'],
      ['INJ-4', 'action-log', 'Action log']
    ]
  },
  {
    text: 'Privacy boundaries',
    dir: 'privacy',
    items: [
      ['PRV-1', 'context-indicator', 'Context indicator'],
      ['PRV-2', 'egress-notice', 'Egress notice'],
      ['PRV-3', 'consent-and-retention', 'Consent and retention'],
      ['PRV-4', 'redaction-preview', 'Redaction preview']
    ]
  },
  {
    text: 'Verifiable citing',
    dir: 'citing',
    items: [
      ['CIT-1', 'inline-citations', 'Inline citations'],
      ['CIT-2', 'source-preview', 'Source preview'],
      ['CIT-3', 'quote-to-source', 'Quote-to-source link'],
      ['CIT-4', 'uncited-claims', 'Uncited claims']
    ]
  }
]

export default defineConfig({
  lang: 'en-GB',
  title: 'Candor',
  description: 'Candor: open interaction patterns for honest, safe AI interfaces.',
  base: '/candor-spec/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0071e3' }],
    ['noscript', {}, '<style>.landing .reveal{opacity:1!important;transform:none!important}</style>']
  ],
  markdown: {
    config(md) {
      md.use(bcp14)
      md.use(container, 'req', {
        validate: (params: string) => /^req\s+[A-Z]{3}-\d+\.\d+$/.test(params.trim()),
        render(tokens: any[], idx: number) {
          const token = tokens[idx]
          if (token.nesting !== 1) return '</div></div>\n'
          const id = token.info.trim().split(/\s+/)[1]
          const anchor = id.toLowerCase()
          return `<div class="req" id="${anchor}"><a class="req-id" href="#${anchor}">${id}</a><div class="req-body">\n`
        }
      })
    }
  },
  themeConfig: {
    nav: [
      { text: 'Specification', link: '/spec/introduction' },
      { text: 'Patterns', link: '/patterns/' },
      { text: 'Checklist', link: '/checklist' },
      { text: 'Contribute', link: '/contributing' }
    ],
    sidebar: [
      {
        text: 'Specification',
        items: [
          { text: 'Introduction', link: '/spec/introduction' },
          { text: 'Conformance', link: '/spec/conformance' },
          { text: 'Terminology', link: '/spec/terminology' },
          { text: 'Pattern template', link: '/spec/template' }
        ]
      },
      ...areas.map((area) => ({
        text: area.text,
        items: area.items.map(([id, slug, name]) => ({
          text: `${id} ${name}`,
          link: `/patterns/${area.dir}/${slug}`
        }))
      })),
      {
        text: 'Reference',
        items: [
          { text: 'Conformance checklist', link: '/checklist' },
          { text: 'References', link: '/references' },
          { text: 'Changes', link: '/changes' },
          { text: 'Contributing', link: '/contributing' }
        ]
      }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: 'On this page' },
    editLink: { pattern: `${repo}/edit/main/docs/:path`, text: 'Suggest a change to this page' },
    socialLinks: [{ icon: 'github', link: repo }],
    footer: {
      message: 'Text under CC BY 4.0. Demo code under MIT.',
      copyright: 'Candor contributors'
    },
    docFooter: { prev: 'Previous', next: 'Next' }
  }
})
