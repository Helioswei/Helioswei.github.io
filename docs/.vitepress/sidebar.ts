import { readdirSync } from 'fs'
import { join } from 'path'

/**
 * 自动从目录生成侧边栏
 *
 * 文件命名约定：
 * - 为了控制侧边栏中文件的显示顺序，可以在文件名前添加数字前缀
 * - 格式：NN-文件名.md (例如: 01-介绍.md, 02-安装.md, 03-使用方法.md)
 * - 有数字前缀的文件会按数字顺序排列，没有数字前缀的文件会排在有数字前缀的文件之后
 */
export function generateSidebar() {
  const sidebar = {}

  // 获取 docs 目录下的所有子目录
  const docsDir = join(process.cwd(), 'docs')
  const dirs = readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dir => dir !== '.vitepress') // 排除 .vitepress 配置目录

  // 为每个子目录生成侧边栏项
  dirs.forEach(dir => {
    const dirPath = join(docsDir, dir)
    const files = readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md') && dirent.name !== 'index.md') // 排除 index.md
      .map(dirent => `/${dir}/${dirent.name.replace(/\.md$/, '')}`)
      .sort((a, b) => {
        // 提取文件名中的数字前缀用于排序
        const getNumericPrefix = (filePath: string) => {
          const fileName = filePath.split('/').pop() || '';
          const match = fileName.match(/^(\d+)-/);
          return match ? parseInt(match[1], 10) : Infinity; // 没有数字前缀的排在最后
        };

        const numA = getNumericPrefix(a);
        const numB = getNumericPrefix(b);

        // 首先按数字前缀排序
        if (numA !== numB) {
          return numA - numB;
        }

        // 如果数字前缀相同或都没有，则按字母顺序排序
        return a.localeCompare(b);
      });

    if (files.length > 0) {
      sidebar[`/${dir}/`] = files.map(file => ({
        text: getSidebarTextFromFilename(file),
        link: file
      }))
    }
  })

  return sidebar
}

// 从文件名生成侧边栏显示文本
function getSidebarTextFromFilename(filePath: string) {
  const fileName = filePath.split('/').pop()
  if (!fileName) return ''

  // 保留文件全名，仅移除 .md 扩展名
  const fullName = fileName.replace(/\.md$/, '')

  // 移除数字前缀（如 "01-"、"02-" 等）
  const withoutNumericPrefix = fullName.replace(/^\d+-/, '')

  // 替换连字符为空格，但保留其他部分
  return withoutNumericPrefix.replace(/-/g, ' ')
}