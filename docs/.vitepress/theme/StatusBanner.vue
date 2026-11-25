<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
const statusLink = withBase('/spec/introduction#status-of-this-document')
</script>

<template>
  <p v-if="frontmatter.status" class="status-banner">
    <span class="status-name">{{ frontmatter.status }}</span>
    <span>Candor version 0.1, 25 November 2026.</span>
    <a :href="statusLink">What this status means</a>
  </p>
</template>
