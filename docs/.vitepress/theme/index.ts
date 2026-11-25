import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import '@fontsource-variable/inter'
import './style.css'
import StatusBanner from './StatusBanner.vue'
import Demo from './Demo.vue'
import Landing from './Landing.vue'
import Checker from './Checker.vue'
import './landing.css'
import './hero-clause.css'
import './checker.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-before': () => h(StatusBanner) }),
  enhanceApp({ app }) {
    app.component('Demo', Demo)
    app.component('Landing', Landing)
    app.component('Checker', Checker)
  }
}
