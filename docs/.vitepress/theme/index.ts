import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import BackToTop from './components/BackToTop.vue'
import OptimizedImage from './components/OptimizedImage.vue'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('BackToTop', BackToTop)
    app.component('OptimizedImage', OptimizedImage)
  }
}