import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4/opsz.css'
import './style.css'
import StatusBanner from './StatusBanner.vue'
import Demo from './Demo.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-before': () => h(StatusBanner) }),
  enhanceApp({ app }) {
    app.component('Demo', Demo)
  }
}
