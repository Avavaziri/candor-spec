<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { fitFrame } from './fitFrame'

const { isDark } = useData()
const root = ref<HTMLElement | null>(null)
const repo = 'https://github.com/Avavaziri/candor-spec'
const theme = computed(() => (isDark.value ? 'dark' : 'light'))
const demo = (file: string) => withBase(`/demos/${file}?theme=${theme.value}`)

const areas = [
  {
    id: 'uncertainty',
    title: 'Says when it isn’t sure.',
    sub: 'Confidence signals, honest hedges and a clear “I don’t know”.',
    link: '/patterns/uncertainty/confidence-signal',
    linkText: 'See the confidence signal',
    demo: 'confidence-signal.html',
    demoTitle: 'Live demo of UNC-1 Confidence signal'
  },
  {
    id: 'injection',
    title: 'Outside text can’t give orders.',
    sub: 'Untrusted content is labelled. Actions it starts wait for you.',
    link: '/patterns/injection/confirm-triggered-actions',
    linkText: 'See triggered-action confirmation',
    demo: 'confirm-triggered-actions.html',
    demoTitle: 'Live demo of INJ-2 Confirm triggered actions'
  },
  {
    id: 'privacy',
    title: 'You see what it sees.',
    sub: 'What the AI can read, what leaves your device, and how long it stays.',
    link: '/patterns/privacy/context-indicator',
    linkText: 'See the context indicator',
    demo: 'context-indicator.html',
    demoTitle: 'Live demo of PRV-1 Context indicator'
  },
  {
    id: 'citing',
    title: 'Every claim, checkable.',
    sub: 'Each claim links to its source. Claims with no source are marked.',
    link: '/patterns/citing/inline-citations',
    linkText: 'See inline citations',
    demo: 'inline-citations.html',
    demoTitle: 'Live demo of CIT-1 Inline citations'
  }
]

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
        <a :href="withBase('/checklist')">Checklist</a>
        <a href="#demos">Demos</a>
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
        <a class="pill" :href="withBase('/spec/introduction')">Read the spec</a>
      </div>
    </nav>

    <main>
      <header class="hero">
        <div class="wrap">
          <h1 class="reveal" style="--f: 0">Honest AI, by design.</h1>
          <p class="sub reveal" style="--f: 0.12">Open patterns that show what an AI knows, sees and cites.</p>
          <p class="cta reveal" style="--f: 0.24">
            <a class="btn" :href="withBase('/spec/introduction')">Read the spec</a>
            <a class="link" :href="withBase('/patterns/')">Browse patterns</a>
          </p>
        </div>
        <figure class="answer-card reveal" style="--f: 0.3">
          <div
            class="ac"
            role="img"
            aria-label="Example AI answer that follows Candor. It shows a context indicator, a notice that an instruction hidden in an email was ignored, two cited claims, one claim marked No source, and a Medium confidence label."
          >
            <div class="ac-top">
              <span class="ac-pill reveal" style="--f: 0.36">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3C4 3 1.5 8 1.5 8S4 13 8 13s6.5-5 6.5-5S12 3 8 3Zm0 7.5A2.5 2.5 0 1 1 8 5.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor"/></svg>
                Context: 3 items
              </span>
              <span class="ac-pill quiet reveal" style="--f: 0.395">Stays in your organisation</span>
            </div>
            <p class="ac-q reveal" style="--f: 0.43">Can I claim a taxi home after a late client dinner?</p>
            <p class="ac-notice reveal" style="--f: 0.465">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1 2 3.5v4C2 11 4.6 14 8 15c3.4-1 6-4 6-7.5v-4L8 1Z" fill="currentColor"/></svg>
              Ignored an instruction inside an email from billing@example.net.
            </p>
            <p class="ac-a">
              Yes. You can claim a taxi after 10pm when you travel for <span class="nw">work.<span class="ac-cite reveal" style="--f: 0.5">1</span></span>
              Keep the receipt and submit it within 30 <span class="nw">days.<span class="ac-cite reveal" style="--f: 0.535">2</span></span>
              The limit for one journey is <span class="nw">£40.<span class="ac-nosrc reveal" style="--f: 0.57">No source</span></span>
            </p>
            <div class="ac-foot">
              <span class="ac-conf reveal" style="--f: 0.6">
                <span class="bars" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i></span>
                Medium confidence
              </span>
              <span class="ac-src reveal" style="--f: 0.62"><b>1</b> Travel policy 2026, HR team</span>
              <span class="ac-src reveal" style="--f: 0.64"><b>2</b> Expenses guide, Finance</span>
            </div>
          </div>
          <figcaption class="ac-captions">
            <span>Says how sure it is.</span>
            <span>Ignores orders hidden in content.</span>
            <span>Shows what it can see.</span>
            <span>Links every claim to a source.</span>
          </figcaption>
        </figure>
      </header>

      <div id="demos">
        <section
          v-for="(area, i) in areas"
          :key="area.id"
          :id="area.id"
          :class="{ alt: i % 2 === 0 }"
          :aria-labelledby="`${area.id}-title`"
        >
          <div class="wrap">
            <h2 :id="`${area.id}-title`" class="reveal" style="--f: 0">{{ area.title }}</h2>
            <p class="sub reveal" style="--f: 0.12">{{ area.sub }}</p>
            <p class="reveal" style="--f: 0.24"><a class="link solo" :href="withBase(area.link)">{{ area.linkText }}</a></p>
          </div>
          <div class="visual reveal" style="--f: 0.3">
            <iframe :src="demo(area.demo)" :title="area.demoTitle" loading="lazy" @load="fitFrame"></iframe>
          </div>
        </section>
      </div>

      <section class="alt" aria-labelledby="standard-title">
        <div class="wrap">
          <h2 id="standard-title" class="reveal" style="--f: 0">Built like a standard.</h2>
          <p class="sub reveal" style="--f: 0.12">Testable rules you can cite in a review.</p>
        </div>
        <div class="bento">
          <article class="card wide reveal" style="--f: 0.2">
            <p class="stat">16</p>
            <h3>Patterns in four areas</h3>
            <p>One template. Requirements, accessibility, anti-patterns and a checklist in each.</p>
          </article>
          <article class="card reveal" style="--f: 0.235">
            <p class="stat">MUST</p>
            <h3>Normative language</h3>
            <p>Rules use BCP 14 keywords. Each has a permanent ID, like UNC-1.3.</p>
          </article>
          <article class="card reveal" style="--f: 0.27">
            <p class="stat">2.2 AA</p>
            <h3>Accessible by rule</h3>
            <p>Every pattern maps its behaviour to WCAG 2.2 success criteria.</p>
          </article>
          <article class="card wide reveal" style="--f: 0.305">
            <p class="stat">CC BY 4.0</p>
            <h3>Open by default</h3>
            <p>Text under CC BY 4.0, demo code under MIT. Anyone can propose a change on GitHub.</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="cta-title">
        <div class="wrap">
          <h2 id="cta-title" class="reveal" style="--f: 0">Check your AI interface.</h2>
          <p class="sub reveal" style="--f: 0.12">Every MUST is a yes-or-no check.</p>
          <p class="cta reveal" style="--f: 0.24">
            <a class="btn" :href="withBase('/checklist')">Open the checklist</a>
            <a class="link" :href="repo">Contribute on GitHub</a>
          </p>
        </div>
      </section>
    </main>

    <footer class="foot">
      <p>Candor 0.1, Editor’s Draft. Text under CC BY 4.0. Code under MIT.</p>
    </footer>
  </div>
</template>
