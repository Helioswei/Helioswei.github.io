import { defineLoader } from 'vitepress'

export default defineLoader({
  // 加载当前目录下的所有 markdown 文件
  watch: ['**/*.md'],
  async load(watch) {
    // 这里需要根据不同的目录创建不同的数据加载器
    // 由于每个目录需要单独的数据加载，我们先为 ai 目录创建
    const { createContentLoader } = await import('vitepress')
    
    // 为 ai 目录创建内容加载器
    const aiLoader = createContentLoader(['ai/**/*.md', '!ai/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const cppLoader = createContentLoader(['cpp/**/*.md', '!cpp/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const toolsLoader = createContentLoader(['tools/**/*.md', '!tools/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const databaseLoader = createContentLoader(['database/**/*.md', '!database/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const linuxLoader = createContentLoader(['linux/**/*.md', '!linux/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const graphicsLoader = createContentLoader(['graphics/**/*.md', '!graphics/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const aboutLoader = createContentLoader(['about/**/*.md', '!about/index.md'], {
      includeSrc: true,
      render: true,
      excerpt: true,
      transform: (data) => {
        return data.map(item => {
          if (item.relativePath) {
            const stat = require('fs').statSync(require('path').resolve('docs/' + item.relativePath));
            return {
              ...item,
              fileCreatedAt: stat.birthtime,
              fileModifiedAt: stat.mtime
            };
          }
          return item;
        });
      }
    })

    const aiData = await aiLoader.load()
    const cppData = await cppLoader.load()
    const toolsData = await toolsLoader.load()
    const databaseData = await databaseLoader.load()
    const linuxData = await linuxLoader.load()
    const graphicsData = await graphicsLoader.load()
    const aboutData = await aboutLoader.load()

    return {
      ai: (aiData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      })),
      cpp: (cppData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      })),
      tools: (toolsData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      })),
      database: (databaseData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      })),
      linux: (linuxData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      })),
      graphics: (graphicsData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      })),
      about: (aboutData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url),
        date: item.frontmatter.date || item.fileCreatedAt
      }))
    }
  }
})

// 从文件名提取标题的辅助函数
function extractTitleFromFilename(url) {
  const fileName = url.split('/').pop().replace(/\.md$/, '').replace(/-/g, ' ')
  // 移除数字前缀
  return fileName.replace(/^\d+-/, '')
}