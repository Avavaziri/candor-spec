<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { isDark } = useData()
const root = ref<HTMLElement | null>(null)
const repo = 'https://github.com/Avavaziri/candor-spec'

const areas = [
  {
    id: 'uncertainty',
    title: 'Says when it isn’t sure.',
    sub: 'Confidence signals, honest hedges and a clear “I don’t know”.',
    link: '/patterns/uncertainty/confidence-signal',
    linkText: 'Try the live demo',
    label: 'Example answer with a Low confidence label. The reason says only one source supports it, from 2019, and offers two next steps.'
  },
  {
    id: 'injection',
    title: 'Outside text can’t give orders.',
    sub: 'Untrusted content is labelled. Actions it starts wait for you.',
    link: '/patterns/injection/confirm-triggered-actions',
    linkText: 'Try the live demo',
    label: 'Example confirmation. The assistant wants to forward 3 emails to an outside address because of text inside an email. Deny is the default choice.'
  },
  {
    id: 'privacy',
    title: 'You see what it sees.',
    sub: 'What the AI can read, what leaves your device, and how long it stays.',
    link: '/patterns/privacy/context-indicator',
    linkText: 'Try the live demo',
    label: 'Example context list. It names each item the assistant can read, says which ones it has read, and notes that the assistant opened handbook.pdf.'
  },
  {
    id: 'citing',
    title: 'Every claim, checkable.',
    sub: 'Each claim links to its source. Claims with no source are marked.',
    link: '/patterns/citing/inline-citations',
    linkText: 'Try the live demo',
    label: 'Example answer with numbered citations. One citation is open and shows the source title, owner, date and the exact supporting quote.'
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
                Context: 3 items
              </span>
              <span class="ac-pill quiet reveal" style="--f: 0.395">Stays in your organisation</span>
            </div>
            <p class="ac-q reveal" style="--f: 0.43">Can I claim a taxi home after a late client dinner?</p>
            <p class="ac-notice reveal" style="--f: 0.465">
              Ignored an instruction inside an email from billing@example.net.
            </p>
            <p class="ac-a">
              Yes. You can claim a taxi after 10pm when you travel for <span class="nw">work.<span class="ac-cite reveal" style="--f: 0.5">1</span></span>
              Keep the receipt and submit it within 30 <span class="nw">days.<span class="ac-cite reveal" style="--f: 0.535">2</span></span>
              The limit for one journey is <span class="nw">£40.<span class="ac-nosrc reveal" style="--f: 0.57">No source</span></span>
            </p>
            <div class="ac-foot">
              <span class="ac-conf reveal" style="--f: 0.6">
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
          class="area"
          :aria-labelledby="`${area.id}-title`"
        >
          <div class="wrap">
            <h2 :id="`${area.id}-title`" class="reveal" style="--f: 0">{{ area.title }}</h2>
            <p class="sub reveal" style="--f: 0.12">{{ area.sub }}</p>
            <p class="reveal" style="--f: 0.24"><a class="link solo" :href="withBase(`${area.link}#demo`)">{{ area.linkText }}</a></p>
          </div>
          <figure class="area-card reveal" style="--f: 0.3">
            <div class="ac" role="img" :aria-label="area.label">
              <template v-if="area.id === 'uncertainty'">
                <p class="ac-q reveal" style="--f: 0.34">Does the travel policy pay for a taxi after 10pm?</p>
                <p class="ac-a">The policy may pay for a taxi after 10pm if no train runs. Check this before you book.</p>
                <div class="ac-panel reveal" style="--f: 0.4">
                  <span class="ac-conf low">
                    Low confidence
                  </span>
                  <p>Only one source supports this, and it is from 2019.</p>
                  <div class="ac-actions">
                    <span class="ac-btn reveal" style="--f: 0.44">Check the source</span>
                    <span class="ac-btn reveal" style="--f: 0.475">Ask the travel team</span>
                  </div>
                </div>
              </template>

              <template v-else-if="area.id === 'injection'">
                <div class="ac-top">
                  <span class="ac-pill reveal" style="--f: 0.34">Email from orders@supplier.example.com</span>
                </div>
                <p class="ac-a small">The supplier confirms that order 4471 ships on 3 December.</p>
                <div class="ac-panel reveal" style="--f: 0.4">
                  <p class="ac-title">The assistant wants to forward 3 emails</p>
                  <p class="ac-warn">You did not ask for this. The request came from text inside an email.</p>
                  <dl class="ac-rows">
                    <dt>To</dt><dd>x@example.net, outside your organisation</dd>
                    <dt>Undo</dt><dd>You cannot undo this.</dd>
                  </dl>
                  <div class="ac-actions">
                    <span class="ac-btn primary reveal" style="--f: 0.44">Deny</span>
                    <span class="ac-btn reveal" style="--f: 0.475">Allow once</span>
                  </div>
                </div>
              </template>

              <template v-else-if="area.id === 'privacy'">
                <div class="ac-top">
                  <span class="ac-pill reveal" style="--f: 0.34">
                    Context: 4 items
                  </span>
                </div>
                <ul class="ac-list">
                  <li class="reveal" style="--f: 0.37"><span><b>Instructions from your organisation</b>Required. Text not shown.</span></li>
                  <li class="reveal" style="--f: 0.4"><span><b>Q3-budget.xlsx</b>File you attached. Read.</span><span class="ac-btn">Remove</span></li>
                  <li class="reveal" style="--f: 0.43"><span><b>Team calendar</b>Can access. Not read yet.</span><span class="ac-btn">Remove</span></li>
                  <li class="reveal new" style="--f: 0.46"><span><b>handbook.pdf</b>The assistant opened this just now.</span><span class="ac-btn">Remove</span></li>
                </ul>
              </template>

              <template v-else>
                <p class="ac-a">
                  You can claim a taxi after 10pm when you travel for <span class="nw">work.<span class="ac-cite open">1</span></span>
                  Submit the receipt within 30 <span class="nw">days.<span class="ac-cite">2</span></span>
                </p>
                <div class="ac-panel reveal" style="--f: 0.4">
                  <p class="ac-title">Travel policy 2026</p>
                  <p class="ac-meta">HR team. Updated 12 January 2026.</p>
                  <blockquote class="ac-quote reveal" style="--f: 0.44"><mark>Staff may claim a taxi home after 10pm for work travel.</mark></blockquote>
                  <div class="ac-actions">
                    <span class="ac-btn primary reveal" style="--f: 0.475">Open source</span>
                  </div>
                </div>
              </template>
            </div>
          </figure>
        </section>
      </div>

      <section class="alt" aria-labelledby="standard-title">
        <div class="wrap">
          <h2 id="standard-title" class="reveal" style="--f: 0">Built like a standard.</h2>
          <p class="sub reveal" style="--f: 0.12">Testable rules you can cite in a review.</p>
        </div>
        <div class="bento">
          <article class="card wide reveal" style="--f: 0.2">
            <h3>Patterns in four areas</h3>
            <p>One template. Requirements, accessibility, anti-patterns and a checklist in each.</p>
          </article>
          <article class="card reveal" style="--f: 0.235">
            <h3>Normative language</h3>
            <p>Rules use BCP 14 keywords. Each has a permanent ID, like UNC-1.3.</p>
          </article>
          <article class="card reveal" style="--f: 0.27">
            <h3>Accessible by rule</h3>
            <p>Every pattern maps its behaviour to WCAG 2.2 success criteria.</p>
          </article>
          <article class="card wide reveal" style="--f: 0.305">
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
