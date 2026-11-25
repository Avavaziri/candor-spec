<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { scan, shouldScan, MAX_FILE_BYTES, MAX_FILES } from '../../../checker/src/scan.js'
import { toMarkdown, toPrompt } from '../../../checker/src/report.js'
import { SKIP_DIRS } from '../../../checker/src/detect.js'
import { SAMPLE_PROJECT } from '../../../checker/src/sample.js'

type Input = { path: string; text: string }
const state = ref<'idle' | 'reading' | 'done' | 'error'>('idle')
const status = ref('')
const error = ref('')
const report = ref<any>(null)
const dragging = ref(false)
const copied = ref(false)
const source = ref('')

const failing = computed(() => report.value?.results.filter((r: any) => r.findings.some((f: any) => f.severity === 'fail')) ?? [])
const warning = computed(() => report.value?.results.filter((r: any) => r.findings.length && !r.findings.some((f: any) => f.severity === 'fail')) ?? [])
const passed = computed(() => report.value?.results.filter((r: any) => !r.findings.length) ?? [])
const headline = computed(() => {
  const r = report.value
  if (!r) return ''
  if (!r.aiApp) return 'No AI features found.'
  const { fail, warn } = r.summary
  if (!fail && !warn) return 'No common problems found.'
  return [fail && `${fail} to fix`, warn && `${warn} worth a look`].filter(Boolean).join('. ') + '.'
})

async function run(files: Input[], label: string) {
  source.value = label
  state.value = 'reading'
  status.value = `Scanning ${files.length} files.`
  await new Promise((r) => setTimeout(r, 0))
  try {
    report.value = scan(files)
    state.value = 'done'
    status.value = `Scan finished. ${headline.value}`
    await nextTick()
    document.getElementById('ck-headline')?.focus()
  } catch (e: any) {
    fail(`The scan stopped: ${e.message}`)
  }
}

function fail(message: string) {
  state.value = 'error'
  error.value = message
  status.value = message
}

async function readFileList(list: FileList | File[]) {
  const files: Input[] = []
  for (const file of Array.from(list)) {
    const path = (file as any).webkitRelativePath || file.name
    if (files.length >= MAX_FILES) break
    if (!shouldScan(path) || file.size > MAX_FILE_BYTES) continue
    files.push({ path, text: await file.text() })
  }
  return files
}

async function onPick(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  state.value = 'reading'
  status.value = 'Reading files.'
  const files = await readFileList(input.files)
  input.value = ''
  if (!files.length) return fail('No code files found. Choose the folder that holds your app’s source code.')
  const first = (input.files[0] as any)?.webkitRelativePath?.split('/')[0]
  run(files, first || '')
}

function readEntry(entry: any, out: File[]): Promise<void> {
  if (entry.isFile) return new Promise((res) => entry.file((f: File) => {
    Object.defineProperty(f, 'webkitRelativePath', { value: entry.fullPath.replace(/^\//, '') })
    out.push(f)
    res()
  }, () => res()))
  if (!entry.isDirectory || SKIP_DIRS.includes(entry.name)) return Promise.resolve()
  const reader = entry.createReader()
  return new Promise((res) => {
    const batch = () => reader.readEntries(async (entries: any[]) => {
      if (!entries.length) return res()
      for (const e of entries) await readEntry(e, out)
      batch()
    }, () => res())
    batch()
  })
}

async function onDrop(event: DragEvent) {
  dragging.value = false
  const items = Array.from(event.dataTransfer?.items ?? [])
  const entries = items.map((i) => (i as any).webkitGetAsEntry?.()).filter(Boolean)
  state.value = 'reading'
  status.value = 'Reading files.'
  const all: File[] = []
  if (entries.length) for (const e of entries) await readEntry(e, all)
  else all.push(...Array.from(event.dataTransfer?.files ?? []))
  const files = await readFileList(all)
  if (!files.length) return fail('No code files found. Drop the folder that holds your app’s source code.')
  run(files, entries.length === 1 && entries[0].isDirectory ? entries[0].name : '')
}

function trySample() {
  run(SAMPLE_PROJECT, 'the sample app')
}

onMounted(() => {
  if (new URLSearchParams(location.search).has('sample')) trySample()
})

async function copyPrompt() {
  await navigator.clipboard.writeText(toPrompt(report.value))
  copied.value = true
  status.value = 'Fix list copied.'
  setTimeout(() => (copied.value = false), 2500)
}

function download() {
  const blob = new Blob([toMarkdown(report.value)], { type: 'text/markdown' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'candor-check-report.md'
  a.click()
  URL.revokeObjectURL(a.href)
}

function reset() {
  report.value = null
  state.value = 'idle'
  error.value = ''
  status.value = ''
}

const isCandor = (href: string) => href.includes('/candor-spec/')
const localHref = (href: string) => (isCandor(href) ? withBase(href.split('/candor-spec')[1]) : href)
</script>

<template>
  <div class="checker">
    <header class="ck-head">
      <h1>Check your AI site.</h1>
      <p class="ck-sub">Drop in your project folder. The scan runs in this browser tab, and your code is never uploaded.</p>
    </header>

    <p class="visually-hidden" role="status" aria-live="polite">{{ status }}</p>

    <section v-if="state !== 'done'" class="ck-drop" :class="{ dragging }"
      @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="onDrop">
      <p class="ck-drop-title">Drag your project folder here</p>
      <p class="ck-drop-sub">Works with React, Next.js, Vue, Svelte and plain HTML. Folders such as node_modules are skipped.</p>
      <div class="ck-actions">
        <label class="ck-btn primary">
          Choose folder
          <input type="file" webkitdirectory multiple class="visually-hidden" @change="onPick" />
        </label>
        <label class="ck-btn">
          Choose files
          <input type="file" multiple class="visually-hidden" accept=".js,.jsx,.ts,.tsx,.mjs,.cjs,.vue,.svelte,.astro,.html,.htm" @change="onPick" />
        </label>
        <button type="button" class="ck-link" @click="trySample">Try a sample app</button>
      </div>
      <p v-if="state === 'reading'" class="ck-note">{{ status }}</p>
      <p v-if="state === 'error'" class="ck-error">{{ error }}</p>
    </section>

    <section v-else class="ck-results" aria-labelledby="ck-headline">
      <div class="ck-summary">
        <h2 id="ck-headline" tabindex="-1">{{ headline }}</h2>
        <p class="ck-note">
          Scanned {{ report.scannedFiles }} {{ report.scannedFiles === 1 ? 'file' : 'files' }}<template v-if="source"> from {{ source }}</template><template v-if="report.providers.length">. Model providers: {{ report.providers.join(', ') }}</template>.
        </p>
        <div class="ck-actions">
          <button v-if="report.aiApp" type="button" class="ck-btn primary" @click="copyPrompt">{{ copied ? 'Copied' : 'Copy fix list for your AI tool' }}</button>
          <button v-if="report.aiApp" type="button" class="ck-btn" @click="download">Download report</button>
          <button type="button" class="ck-link" @click="reset">Scan another project</button>
        </div>
        <p v-if="report.aiApp" class="ck-note">Paste the fix list into Lovable, Bolt, Cursor, Claude or any coding assistant.</p>
      </div>

      <p v-if="!report.aiApp" class="ck-note">
        The scan found no AI model calls or chat code, so no rules ran. Choose the folder with your app’s source, not the built site.
      </p>

      <template v-for="group in [{ name: 'Fix these', key: 'fail', items: failing }, { name: 'Worth a look', key: 'warn', items: warning }]" :key="group.key">
        <h3 v-if="group.items.length" class="ck-group">{{ group.name }}</h3>
        <article v-for="rule in group.items" :key="rule.id" class="ck-card">
          <p class="ck-tag" :class="group.key">{{ group.key === 'fail' ? 'Must fix' : 'Worth a look' }}</p>
          <h4>{{ rule.title }}</h4>
          <p>{{ rule.why }}</p>
          <ul class="ck-where">
            <li v-for="(f, i) in rule.findings" :key="i">
              <details>
                <summary><code>{{ f.file }}:{{ f.line }}</code> {{ f.message }}</summary>
                <pre tabindex="0" :aria-label="`Code at ${f.file} line ${f.line}`"><code>{{ f.code }}</code></pre>
              </details>
            </li>
          </ul>
          <p><strong>How to fix:</strong> {{ rule.fix }}</p>
          <p class="ck-refs">
            Rules:
            <template v-for="(ref, i) in rule.refs" :key="ref.label">
              <a :href="localHref(ref.href)">{{ ref.label }}</a><template v-if="i < rule.refs.length - 1">, </template>
            </template>
          </p>
        </article>
      </template>

      <template v-if="report.aiApp">
        <h3 class="ck-group">Check by hand</h3>
        <p class="ck-note">Code scans cannot test these. Try each one in your running app.</p>
        <ul class="ck-manual">
          <li v-for="m in report.manual" :key="m.id">
            <label><input type="checkbox" /> {{ m.text }}</label>
            <a :href="localHref(m.href)">{{ m.id }}</a>
          </li>
        </ul>

        <h3 v-if="passed.length" class="ck-group">Passed</h3>
        <ul v-if="passed.length" class="ck-passed">
          <li v-for="r in passed" :key="r.id">{{ r.title }}: not found</li>
        </ul>
      </template>

      <p class="ck-note ck-disclaimer">A clean scan means the common problems were not found. It does not prove that your app conforms to Candor.</p>
    </section>

    <section class="ck-cli" aria-labelledby="ck-cli-title">
      <h2 id="ck-cli-title">Prefer the terminal?</h2>
      <p>The same rules run as a command. Clone the repository, then run:</p>
      <pre tabindex="0" aria-label="Command"><code>node checker/bin/candor-check.js path/to/your-app</code></pre>
      <p class="ck-note">Add <code>--prompt</code> for a fix list, <code>--md</code> for a report, or <code>--json</code> for CI. It exits with code 1 when something must be fixed.</p>
    </section>
  </div>
</template>
