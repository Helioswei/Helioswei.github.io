import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "赫利俄斯的AI实验室",
  description: "一个分享传统编程与AIGC应用的科普博客",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/avatar.jpeg',
    siteTitle: '赫利俄斯的AI实验室',
    i18nRouting: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AIGC', link: '/ai/' },
      { text: 'Graphics', link: '/graphics/' },
      { text: 'Cpp', link: '/cpp/' },
      { text: 'Linux', link: '/linux/' },
      { text: 'Database', link: '/database/' },
      { text: 'Tools', link: '/tools/' },
      { text: 'About', link: '/other/index' }
    ],

    sidebar: generateSidebar(),

    // 启用本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            placeholder: '搜索文档...',
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Helioswei' }
    ]
  }
})
