import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout: Layout
}