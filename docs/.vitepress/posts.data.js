import { defineLoader } from 'vitepress'

export default defineLoader({
  // 加载当前目录下的所有 markdown 文件
  watch: ['**/*.md'],
  async load(watch) {
    // 这里需要根据不同的目录创建不同的数据加载器
    // 由于每个目录需要单独的数据加载，我们先为 ai 目录创建
    const { createContentLoader } = await import('vitepress')
    
    // 为 ai 目录创建内容加载器
    const aiLoader = createContentLoader('ai/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })

    const cppLoader = createContentLoader('cpp/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })

    const toolsLoader = createContentLoader('tools/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })

    const databaseLoader = createContentLoader('database/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })

    const linuxLoader = createContentLoader('linux/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })

    const graphicsLoader = createContentLoader('graphics/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })

    const gitLoader = createContentLoader('git/**/*.md', {
      includeSrc: true,
      render: true,
      excerpt: true
    })
    
    const aiData = await aiLoader.load()
    const cppData = await cppLoader.load()
    const toolsData = await toolsLoader.load()
    const databaseData = await databaseLoader.load()
    const linuxData = await linuxLoader.load()
    const graphicsData = await graphicsLoader.load()
    const gitData = await gitLoader.load()
    
    return {
      ai: (aiData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
      })),
      cpp: (cppData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
      })),
      tools: (toolsData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
      })),
      database: (databaseData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
      })),
      linux: (linuxData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
      })),
      graphics: (graphicsData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
      })),
      git: (gitData || []).map(item => ({
        ...item,
        url: item.url,
        title: item.frontmatter.title || extractTitleFromFilename(item.url)
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