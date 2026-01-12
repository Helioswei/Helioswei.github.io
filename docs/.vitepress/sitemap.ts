import { writeFileSync } from 'fs'
import { generateSidebar } from './sidebar'

function generateSitemap() {
  const baseUrl = 'https://helioswei.github.io'
  const currentDate = new Date().toISOString()
  
  // 获取所有页面路径
  const pages = []
  
  // 添加主页
  pages.push({
    url: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '1.0'
  })
  
  // 从侧边栏获取所有页面
  const sidebar = generateSidebar()
  
  function extractPagesFromSidebar(sidebarItem, basePath = '') {
    if (Array.isArray(sidebarItem)) {
      sidebarItem.forEach(item => extractPagesFromSidebar(item, basePath))
    } else if (typeof sidebarItem === 'object' && sidebarItem.items) {
      if (sidebarItem.link) {
        pages.push({
          url: baseUrl + sidebarItem.link,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: '0.8'
        })
      }
      extractPagesFromSidebar(sidebarItem.items, basePath)
    } else if (typeof sidebarItem === 'string') {
      pages.push({
        url: baseUrl + '/' + sidebarItem,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.8'
      })
    }
  }
  
  // 遍历所有分类
  Object.keys(sidebar).forEach(category => {
    extractPagesFromSidebar(sidebar[category], category)
  })
  
  // 生成 XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  // 写入文件
  writeFileSync('docs/public/sitemap.xml', xml)
  console.log('Sitemap generated successfully!')
}

// 如果直接运行此脚本
if (require.main === module) {
  generateSitemap()
}

export { generateSitemap }