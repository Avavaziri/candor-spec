<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
const props = defineProps<{ src: string; title: string; height?: number }>()
const { isDark } = useData()
const page = withBase(`/demos/${props.src}`)
const frame = computed(() => `${page}?theme=${isDark.value ? 'dark' : 'light'}`)
</script>

<template>
  <figure class="demo">
    <iframe :src="frame" :title="title" :style="{ height: `${height ?? 480}px` }" loading="lazy"></iframe>
    <figcaption>
      {{ title }}.
      <a :href="page" target="_blank" rel="noopener">Open the demo on its own page</a>
    </figcaption>
  </figure>
</template>
