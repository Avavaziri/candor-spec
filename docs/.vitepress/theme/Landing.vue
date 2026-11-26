<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import HeroClause from './HeroClause.vue'

const { isDark } = useData()
const root = ref<HTMLElement | null>(null)
const repo = 'https://github.com/Avavaziri/candor-spec'

const areas = [
  {
    id: 'injection',
    rules: ['INJ-1.6', 'INJ-1.7', 'INJ-2.1', 'INJ-4.1'],
    title: 'Hidden instructions that take over.',
    sub: 'We flag tools that run without asking, and AI output inserted as raw HTML. The fix: the user confirms every action.',
    link: '/patterns/injection/confirm-triggered-actions',
    linkText: 'See the rule and a live demo',
    label: 'Example confirmation. The assistant wants to forward 3 emails to an outside address because of text inside an email. Deny is the default choice.'
  },
  {
    id: 'privacy',
    rules: ['PRV-2.1', 'PRV-2.3', 'PRV-3.7'],
    title: 'Data that leaves without a word.',
    sub: 'We flag API keys in browser code, and messages sent straight to a model provider. The fix: show what the AI can read and where data goes.',
    link: '/patterns/privacy/context-indicator',
    linkText: 'See the rule and a live demo',
    label: 'Example context list. It names each item the assistant can read, says which ones it has read, and notes that the assistant opened handbook.pdf.'
  },
  {
    id: 'citing',
    rules: ['CIT-1.7', 'INJ-1.9'],
    title: 'Sources nobody can check.',
    sub: 'We flag answers built from your documents that show no sources. The fix: a citation after every claim.',
    link: '/patterns/citing/inline-citations',
    linkText: 'See the rule and a live demo',
    label: 'Example answer with numbered citations. One citation is open and shows the source title, owner, date and the exact supporting quote.'
  },
  {
    id: 'uncertainty',
    rules: ['UNC-3.1', 'UNC-3.2'],
    title: 'Confidence with nothing behind it.',
    sub: 'We flag prompts that never let the model say “I don’t know”. The fix: a plain decline, or a confidence label with a reason.',
    link: '/patterns/uncertainty/confidence-signal',
    linkText: 'See the rule and a live demo',
    label: 'Example answer with a Low confidence label. The reason says only one source supports it, from 2019, and offers two next steps.'
  }
]

const pages: Record<string, string> = {
  'INJ-1': '/patterns/injection/source-trust-labels',
  'INJ-2': '/patterns/injection/confirm-triggered-actions',
  'INJ-4': '/patterns/injection/action-log',
  'PRV-2': '/patterns/privacy/egress-notice',
  'PRV-3': '/patterns/privacy/consent-and-retention',
  'CIT-1': '/patterns/citing/inline-citations',
  'UNC-3': '/patterns/uncertainty/declining-to-answer'
}
const ruleHref = (id: string) => `${pages[id.split('.')[0]]}#${id.toLowerCase()}`

let observer: IntersectionObserver | undefined

onMounted(() => {
  const el = root.value
  if (!el) return
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.querySelectorAll('.reveal').forEach((r) => r.classList.add('in'))
        observer?.unobserve(entry.target)
      }),
    { threshold: 0.15 }
  )
  el.querySelectorAll('section, header.hero').forEach((s) => observer!.observe(s))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="landing" ref="root">
    <nav class="top" aria-label="Main">
      <a class="brand" :href="withBase('/')">Candor</a>
      <div class="top-links">
        <a :href="withBase('/spec/introduction')">Spec</a>
        <a :href="withBase('/patterns/')">Patterns</a>
        <a :href="withBase('/check')">Check</a>
        <a :href="withBase('/checklist')">Checklist</a>
        <a :href="repo">GitHub</a>
      </div>
      <div class="top-actions">
        <button
          type="button"
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="isDark = !isDark"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path v-if="isDark" fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5 1 3h-2l1-3Zm0 20-1-3h2l-1 3ZM2 12l3-1v2l-3-1Zm20 0-3 1v-2l3 1Z" />
            <path v-else fill="currentColor" d="M20 15.3A8.5 8.5 0 0 1 8.7 4a8.5 8.5 0 1 0 11.3 11.3Z" />
          </svg>
        </button>
        <a class="pill" :href="withBase('/check')">Check your app</a>
      </div>
    </nav>

    <main>
      <HeroClause />

      <section class="cl how" aria-labelledby="how-title">
        <div class="cl-grid">
          <div class="cl-head">
            <h2 id="how-title" class="reveal" style="--i: 0">How it works.</h2>
            <p class="cl-sub reveal" style="--i: 1">Three steps. No account, no upload.</p>
          </div>
          <ol class="cl-steps">
            <li class="reveal" style="--i: 2"><h3>Drop your project folder</h3><p>React, Next.js, Vue, Svelte or plain HTML. Folders such as node_modules are skipped.</p></li>
            <li class="reveal" style="--i: 3"><h3>Read the findings</h3><p>Each one shows the file, the line, why it matters and the rule it breaks.</p></li>
            <li class="reveal" style="--i: 4"><h3>Paste the fix list into your AI tool</h3><p>Lovable, Bolt, Cursor or Claude can work through it one fix at a time.</p></li>
          </ol>
        </div>
      </section>

      <div id="demos">
        <section
          v-for="area in areas"
          :key="area.id"
          :id="area.id"
          class="cl area"
          :aria-labelledby="`${area.id}-title`"
        >
          <div class="cl-grid">
            <div class="cl-rail reveal" style="--i: 0">
              <p class="cl-rail-label">Rules checked</p>
              <ul>
                <li v-for="r in area.rules" :key="r"><a :href="withBase(ruleHref(r))">{{ r }}</a></li>
              </ul>
            </div>
            <div class="cl-copy">
              <h2 :id="`${area.id}-title`" class="reveal" style="--i: 0">{{ area.title }}</h2>
              <p class="cl-sub reveal" style="--i: 1">{{ area.sub }}</p>
              <p class="reveal" style="--i: 2"><a class="cl-link" :href="withBase(`${area.link}#demo`)">{{ area.linkText }}</a></p>
            </div>
            <figure class="area-card reveal" style="--i: 3">
              <div class="ac" role="img" :aria-label="area.label">
                <template v-if="area.id === 'uncertainty'">
                  <p class="ac-q">Does the travel policy pay for a taxi after 10pm?</p>
                  <p class="ac-a">The policy may pay for a taxi after 10pm if no train runs. Check this before you book.</p>
                  <div class="ac-panel">
                    <span class="ac-conf low">
                      Low confidence
                    </span>
                    <p>Only one source supports this, and it is from 2019.</p>
                    <div class="ac-actions">
                      <span class="ac-btn">Check the source</span>
                      <span class="ac-btn">Ask the travel team</span>
                    </div>
                  </div>
                </template>
  
                <template v-else-if="area.id === 'injection'">
                  <div class="ac-top">
                    <span class="ac-pill">Email from orders@supplier.example.com</span>
                  </div>
                  <p class="ac-a small">The supplier confirms that order 4471 ships on 3 December.</p>
                  <div class="ac-panel">
                    <p class="ac-title">The assistant wants to forward 3 emails</p>
                    <p class="ac-warn">You did not ask for this. The request came from text inside an email.</p>
                    <dl class="ac-rows">
                      <dt>To</dt><dd>x@example.net, outside your organisation</dd>
                      <dt>Undo</dt><dd>You cannot undo this.</dd>
                    </dl>
                    <div class="ac-actions">
                      <span class="ac-btn primary">Deny</span>
                      <span class="ac-btn">Allow once</span>
                    </div>
                  </div>
                </template>
  
                <template v-else-if="area.id === 'privacy'">
                  <div class="ac-top">
                    <span class="ac-pill">
                      Context: 4 items
                    </span>
                  </div>
                  <ul class="ac-list">
                    <li><span><b>Instructions from your organisation</b>Required. Text not shown.</span></li>
                    <li><span><b>Q3-budget.xlsx</b>File you attached. Read.</span><span class="ac-btn">Remove</span></li>
                    <li><span><b>Team calendar</b>Can access. Not read yet.</span><span class="ac-btn">Remove</span></li>
                    <li class="reveal new"><span><b>handbook.pdf</b>The assistant opened this just now.</span><span class="ac-btn">Remove</span></li>
                  </ul>
                </template>
  
                <template v-else>
                  <p class="ac-a">
                    You can claim a taxi after 10pm when you travel for <span class="nw">work.<span class="ac-cite open">1</span></span>
                    Submit the receipt within 30 <span class="nw">days.<span class="ac-cite">2</span></span>
                  </p>
                  <div class="ac-panel">
                    <p class="ac-title">Travel policy 2026</p>
                    <p class="ac-meta">HR team. Updated 12 January 2026.</p>
                    <blockquote class="ac-quote"><mark>Staff may claim a taxi home after 10pm for work travel.</mark></blockquote>
                    <div class="ac-actions">
                      <span class="ac-btn primary">Open source</span>
                    </div>
                  </div>
                </template>
                </div>
            </figure>
          </div>
        </section>
      </div>

      <section class="cl rulebook" aria-labelledby="standard-title">
        <div class="cl-grid">
          <div class="cl-rail reveal" style="--i: 0">
            <p class="cl-rail-label">Version 0.1</p>
            <ul class="cl-facts"><li>16 patterns</li><li>4 areas</li><li>CC BY 4.0</li></ul>
          </div>
          <div class="cl-head">
            <h2 id="standard-title" class="reveal" style="--i: 0">Built on an open rulebook.</h2>
            <p class="cl-sub reveal" style="--i: 1">Every finding links to a public, testable rule. Read it, cite it or improve it.</p>
          </div>
          <div class="cl-cells">
            <article class="reveal" style="--i: 2"><h3>Patterns in four areas</h3><p>One template. Requirements, accessibility, anti-patterns and a checklist in each.</p></article>
            <article class="reveal" style="--i: 3"><h3>Normative language</h3><p>Rules use MUST, SHOULD and MAY. Each has a permanent ID, like UNC-1.3.</p></article>
            <article class="reveal" style="--i: 4"><h3>Accessible by rule</h3><p>Every pattern maps its behaviour to WCAG 2.2 success criteria.</p></article>
            <article class="reveal" style="--i: 5"><h3>Open by default</h3><p>Text under CC BY 4.0, demo code under MIT. Anyone can propose a change on GitHub.</p></article>
          </div>
        </div>
      </section>

      <section class="cl final" aria-labelledby="cta-title">
        <div class="cl-grid">
          <div class="cl-head wide">
            <h2 id="cta-title" class="reveal" style="--i: 0">Check your AI app now.</h2>
            <p class="cl-sub reveal" style="--i: 1">Free. Runs in your browser. Nothing is uploaded.</p>
            <p class="cl-cta reveal" style="--i: 2">
              <a class="hc-btn" :href="withBase('/check')">Check your app</a>
              <a class="hc-link" :href="withBase('/spec/introduction')">Read the rulebook</a>
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="cl-foot">
      <div class="cl-grid">
        <p>Candor 0.1, Editor’s Draft.</p>
        <p>Text under CC BY 4.0. Code under MIT. <a :href="repo">GitHub</a></p>
      </div>
    </footer>
  </div>
</template>
