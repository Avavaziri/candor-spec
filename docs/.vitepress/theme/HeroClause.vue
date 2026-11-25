<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { withBase } from 'vitepress'

const annos = [
  { id: 'INJ-1.6', name: 'No remote content', href: '/patterns/injection/source-trust-labels#inj-1.6', level: 'Must fix', title: 'AI output is inserted as raw HTML', where: 'src/components/Chat.tsx:20' },
  { id: 'INJ-2.1', name: 'Confirm actions', href: '/patterns/injection/confirm-triggered-actions#inj-2.1', level: 'Must fix', title: 'The assistant can send email with no confirmation', where: 'src/lib/ai.ts:12' },
  { id: 'PRV-2.1', name: 'Egress notice', href: '/patterns/privacy/egress-notice#prv-2.1', level: 'Worth a look', title: 'Messages go straight to OpenAI with no notice', where: 'src/lib/ai.ts:5' },
  { id: 'CIT-1.7', name: 'Source list', href: '/patterns/citing/inline-citations#cit-1.7', level: 'Worth a look', title: 'Answers use your documents but show no sources', where: 'src/lib/search.ts:8' }
]

const root = ref<HTMLElement | null>(null)
const grid = ref<HTMLElement | null>(null)
const active = ref<string | null>(null)
const railTop = reactive<Record<string, number>>({})
const paths = reactive<Record<string, string>>({})
const size = reactive({ w: 0, h: 0 })
const wide = ref(false)
let observer: ResizeObserver | undefined

const el = (id: string) => grid.value?.querySelector<HTMLElement>(`[data-anno="${id}"]`)
const railEl = (id: string) => grid.value?.querySelector<HTMLElement>(`[data-rail="${id}"]`)

function layout() {
  const g = grid.value
  if (!g) return
  wide.value = window.matchMedia('(min-width: 960px)').matches
  if (!wide.value) return
  const box = g.getBoundingClientRect()
  size.w = box.width
  size.h = box.height
  const ol = g.querySelector<HTMLElement>('.hc-rail')!.getBoundingClientRect()
  // Offsets ignore the entrance transform, so lines land where the card will rest.
  const offset = (node: HTMLElement) => {
    let x = 0
    let y = 0
    for (let n: HTMLElement | null = node; n && n !== g; n = n.offsetParent as HTMLElement | null) {
      x += n.offsetLeft
      y += n.offsetTop
    }
    return { x, y }
  }
  const rows = annos
    .map((a) => {
      const node = el(a.id)!
      const o = offset(node)
      return { id: a.id, y: o.y + node.offsetHeight / 2, x: o.x }
    })
    .sort((a, b) => a.y - b.y)
  let last = -Infinity
  for (const row of rows) {
    const rail = railEl(row.id)!
    const top = Math.max(row.y - 9, last + 12)
    railTop[row.id] = top - (ol.top - box.top)
    last = top + rail.offsetHeight
    const id = rail.querySelector<HTMLElement>('.hc-id')!
    const rx = ol.left - box.left + Math.max(id.offsetWidth, rail.querySelector<HTMLElement>('.hc-id-name')!.offsetWidth) + 12
    const ry = top + 9
    const mx = Math.max(rx + 12, ol.right - box.left + 4)
    paths[row.id] = `M ${rx} ${ry} H ${mx} V ${row.y} H ${row.x - 8}`
  }
}

onMounted(async () => {
  await nextTick()
  layout()
  document.fonts?.ready.then(layout)
  setTimeout(layout, 400)
  observer = new ResizeObserver(() => layout())
  if (grid.value) {
    observer.observe(grid.value)
    observer.observe(grid.value.querySelector('.hc-card')!)
  }
  requestAnimationFrame(() => root.value?.classList.add('is-in'))
})
onBeforeUnmount(() => observer?.disconnect())

const on = (id: string) => (active.value = id)
const off = (id: string) => {
  if (active.value === id) active.value = null
}
</script>

<template>
  <header class="hero-clause" ref="root">
    <div class="hc-grid" ref="grid">
      <ol class="hc-rail" aria-hidden="true">
        <li
          v-for="a in annos"
          :key="a.id"
          :data-rail="a.id"
          :class="{ active: active === a.id }"
          :style="wide && railTop[a.id] !== undefined ? { top: `${railTop[a.id]}px` } : undefined"
          @mouseenter="on(a.id)"
          @mouseleave="off(a.id)"
        >
          <span class="hc-id">{{ a.id }}</span>
          <span class="hc-id-name">{{ a.name }}</span>
        </li>
      </ol>

      <svg v-if="wide" class="hc-lines" :viewBox="`0 0 ${size.w} ${size.h}`" :width="size.w" :height="size.h" aria-hidden="true">
        <path
          v-for="a in annos"
          :key="a.id"
          :d="paths[a.id]"
          pathLength="1"
          :class="{ active: active === a.id }"
        />
      </svg>

      <div class="hc-copy">
        <h1 class="hc-enter" style="--i: 0">Check your AI app before your users do.</h1>
        <p class="hc-sub hc-enter" style="--i: 1">Drop in your project. Candor finds AI features that leak data, obey hidden instructions or hide their sources, and tells you how to fix each one.</p>
        <p class="hc-cta hc-enter" style="--i: 2">
          <a class="hc-btn" :href="withBase('/check')">Check your app</a>
          <a class="hc-link" :href="withBase('/check?sample=1')">See a sample report</a>
        </p>
        <p class="hc-fine hc-enter" style="--i: 3">Free. Runs in your browser. Your code is never uploaded.</p>
      </div>

      <figure class="hc-card hc-report hc-enter" style="--i: 3">
        <figcaption class="hc-report-head">
          <span class="hc-report-name">Candor check: example-app</span>
          <span class="hc-report-sum">Example findings</span>
        </figcaption>
        <ol class="hc-findings">
          <li v-for="a in annos" :key="a.id">
            <span class="hc-inline-id" aria-hidden="true">{{ a.id }}</span>
            <a
              class="hc-anno hc-finding"
              :data-anno="a.id"
              :class="{ active: active === a.id }"
              :href="withBase(a.href)"
              @mouseenter="on(a.id)" @mouseleave="off(a.id)" @focus="on(a.id)" @blur="off(a.id)"
            >
              <span class="hc-level" :class="{ must: a.level === 'Must fix' }">{{ a.level }}</span>
              <span class="hc-title">{{ a.title }}</span>
              <span class="hc-where">{{ a.where }}</span>
              <span class="hc-visually-hidden">Rule {{ a.id }}, {{ a.name }}.</span>
            </a>
          </li>
        </ol>
        <p class="hc-report-foot">
          <span class="hc-fake-btn" aria-hidden="true">Copy fix list for your AI tool</span>
          <span class="hc-report-note">Paste it into Lovable, Bolt, Cursor or Claude.</span>
        </p>
      </figure>
    </div>
  </header>
</template>
