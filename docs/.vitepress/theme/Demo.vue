<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { fitFrame } from './fitFrame'
const props = defineProps<{ src: string; title: string; height?: number }>()
const { isDark } = useData()
const page = withBase(`/demos/${props.src}`)
const frame = computed(() => `${page}?theme=${isDark.value ? 'dark' : 'light'}`)
</script>

<template>
  <figure class="demo">
    <iframe :src="frame" :title="title" :style="{ height: `${height ?? 480}px` }" loading="lazy" @load="fitFrame"></iframe>
    <figcaption>
      {{ title }}.
      <a :href="page" target="_blank" rel="noopener">Open the demo on its own page</a>
    </figcaption>
  </figure>
</template>
