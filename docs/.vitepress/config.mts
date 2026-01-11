import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "赫利俄斯的AI实验室",
  description: "一个分享传统编程与AIGC应用的科普博客",
  lastUpdated: true,
  head: [
    // 不蒜子统计脚本
    ['script', { async: '', src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }]
  ],
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
      { text: 'About', link: '/about/' }
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
      { icon: 'github', link: 'https://github.com/Helioswei' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
        },
        link: 'mailto:1518862058@qq.com'
      }
    ]
  }
})
