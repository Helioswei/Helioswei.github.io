<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRouter } from 'vitepress'
import { onMounted, nextTick, watch } from 'vue'
import { computed } from 'vue'
import { LightweightImageOptimizer, imageOptimizationStyles } from './utils/imageOptimizer'

const { Layout } = DefaultTheme
const { page } = useData()
const router = useRouter()

// 计算 SEO 相关的元数据
const seoMeta = computed(() => {
  const title = page.value.title || '赫利俄斯的AI实验室'
  const description = page.value.frontmatter.description || '一个分享传统编程与AIGC应用的科普博客'
  const url = `https://helioswei.github.io${page.value.frontmatter.permalink || page.value.relativePath}`
  const image = page.value.frontmatter.image || '/images/avatar.jpeg'
  
  return {
    title,
    description,
    url,
    image,
    keywords: getTagsArray()?.join(',') || '编程,AI,C++,Linux,技术博客'
  }
})

// 处理标签数据，兼容字符串和数组格式
const getTagsArray = () => {
  const tags = page.value.frontmatter.tags
  
  if (!tags) return []
  
  // 如果是字符串，按逗号分隔
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  }
  
  // 如果是数组，直接返回
  if (Array.isArray(tags)) {
    return tags
  }
  
  return []
}

// 格式化日期的辅助函数
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 本地阅读量统计（localStorage + IndexedDB）
let pageViewCount = 0

// 打开 IndexedDB 数据库
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BlogPageViews', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('pageViews')) {
        db.createObjectStore('pageViews', { keyPath: 'path' })
      }
    }
  })
}

// 从 IndexedDB 获取阅读量
const getViewFromDB = async (path) => {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(['pageViews'], 'readonly')
      const store = transaction.objectStore('pageViews')
      const request = store.get(path)
      
      request.onsuccess = () => {
        const result = request.result
        resolve(result ? result.count : 0)
      }
      
      request.onerror = () => resolve(0)
    })
  } catch (error) {
    console.error('IndexedDB 读取失败，降级到 localStorage:', error)
    return getViewFromLocalStorage(path)
  }
}

// 从 localStorage 获取阅读量
const getViewFromLocalStorage = (path) => {
  const storageKey = `page_view_${path.replace(/[\/\\]/g, '_')}`
  const stored = localStorage.getItem(storageKey)
  return stored ? parseInt(stored) : 0
}

// 保存阅读量到 IndexedDB
const saveViewToDB = async (path, count) => {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(['pageViews'], 'readwrite')
      const store = transaction.objectStore('pageViews')
      const request = store.put({ path, count, lastVisit: new Date().toISOString() })
      
      request.onsuccess = () => resolve()
      request.onerror = () => {
        console.error('IndexedDB 保存失败，降级到 localStorage')
        saveViewToLocalStorage(path, count)
        resolve()
      }
    })
  } catch (error) {
    console.error('IndexedDB 操作失败，降级到 localStorage:', error)
    saveViewToLocalStorage(path, count)
  }
}

// 保存阅读量到 localStorage
const saveViewToLocalStorage = (path, count) => {
  const storageKey = `page_view_${path.replace(/[\/\\]/g, '_')}`
  localStorage.setItem(storageKey, count.toString())
}

// 增加页面阅读量
const incrementPageView = async () => {
  const path = page.value.relativePath || 'index.md'
  
  try {
    // 先从 IndexedDB 获取当前计数
    let currentCount = await getViewFromDB(path)
    currentCount += 1 // 增加访问次数
    
    // 保存到 IndexedDB
    await saveViewToDB(path, currentCount)
    
    // 同时也保存到 localStorage 作为备份
    saveViewToLocalStorage(path, currentCount)
    
    pageViewCount = currentCount
  } catch (error) {
    console.error('阅读量统计失败:', error)
    // 降级到纯 localStorage
    const currentCount = getViewFromLocalStorage(path) + 1
    saveViewToLocalStorage(path, currentCount)
    pageViewCount = currentCount
  }
  
  updatePageViewDisplay()
}

// 更新显示
const updatePageViewDisplay = () => {
  const viewElement = document.querySelector('.page-view-count')
  if (viewElement) {
    viewElement.textContent = pageViewCount.toString()
  }
}

// 更新 SEO 元数据
const updateSEOMeta = () => {
  // 更新页面标题
  document.title = seoMeta.value.title
  
  // 更新或创建 meta 标签
  const metaTags = [
    { name: 'description', content: seoMeta.value.description },
    { name: 'keywords', content: seoMeta.value.keywords },
    { property: 'og:title', content: seoMeta.value.title },
    { property: 'og:description', content: seoMeta.value.description },
    { property: 'og:url', content: seoMeta.value.url },
    { property: 'og:image', content: seoMeta.value.image },
    { name: 'twitter:title', content: seoMeta.value.title },
    { name: 'twitter:description', content: seoMeta.value.description },
    { name: 'twitter:image', content: seoMeta.value.image }
  ]
  
  metaTags.forEach(({ name, property, content }) => {
    const attr = name ? `name="${name}"` : `property="${property}"`
    const meta = document.querySelector(`meta[${attr}]`) || document.createElement('meta')
    if (name) meta.name = name
    if (property) meta.property = property
    meta.content = content
    if (!document.querySelector(`meta[${attr}]`)) {
      document.head.appendChild(meta)
    }
  })
  
  // 更新 canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = seoMeta.value.url
}

// 获取当前页面的总阅读量（用于初始显示）
const getPageViewCount = async () => {
  const path = page.value.relativePath || 'index.md'
  try {
    // 优先从 IndexedDB 获取
    const dbCount = await getViewFromDB(path)
    const lsCount = getViewFromLocalStorage(path)
    // 返回较大的值（保证数据准确性）
    return Math.max(dbCount, lsCount)
  } catch (error) {
    console.error('获取阅读量失败:', error)
    return getViewFromLocalStorage(path)
  }
}

// 生成简单安全的标识符的辅助函数
const generateSafeTerm = () => {
  // 使用页面相对路径作为基础，如果没有则使用 'homepage'
  const path = page.value.relativePath || 'index.md';
  // 创建一个简单的哈希值来确保标识符只包含安全字符
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    const char = path.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // 转换为32位整数
  }
  // 确保哈希值为正数并转换为十六进制
  const hexHash = Math.abs(hash).toString(16);
  // 返回安全的标识符
  return `page_${hexHash}`;
};

// 加载 Giscus 评论系统的函数
const loadGiscus = async () => {
  if (page.value.frontmatter.comment !== false) {
    await nextTick()

    // 使用 requestAnimationFrame 确保在浏览器下次绘制前执行
    requestAnimationFrame(() => {
      const container = document.getElementById('giscus-container')
      if (container) {
        // 检查是否已有 Giscus 实例
        const existingIframe = container.querySelector('iframe.giscus-frame')
        if (existingIframe) {
          // 如果已有实例，尝试更新配置而不是重新加载
          // 使用微任务确保在下一个事件循环中执行
          Promise.resolve().then(() => {
            existingIframe.contentWindow.postMessage(
              {
                giscus: {
                  setConfig: {
                    mapping: 'pathname',
                    term: window.location.pathname, // 确保使用当前路径
                    theme: 'preferred_color_scheme'
                  }
                }
              },
              'https://giscus.app'
            );
          });
        } else {
          // 如果没有实例，创建新的
          container.innerHTML = '' // 清除可能存在的旧内容

          const script = document.createElement('script')
          script.src = 'https://giscus.app/client.js'
          script.setAttribute('data-repo', 'Helioswei/Helioswei.github.io')
          script.setAttribute('data-repo-id', 'R_kgDOQ3mZng')
          script.setAttribute('data-category', 'Announcements')
          script.setAttribute('data-category-id', 'DIC_kwDOQ3mZns4C01HF')
          script.setAttribute('data-mapping', 'pathname')
          script.setAttribute('data-strict', '0')
          script.setAttribute('data-reactions-enabled', '1')
          script.setAttribute('data-emit-metadata', '0')
          script.setAttribute('data-input-position', 'bottom')
          script.setAttribute('data-theme', 'preferred_color_scheme')
          script.setAttribute('data-lang', 'zh-CN')
          script.setAttribute('crossorigin', 'anonymous')
          script.async = true
          script.defer = true

          // 添加错误处理
          script.onerror = () => {
            // 静默处理错误，减少控制台噪音
            container.innerHTML = '<p>💬 评论系统暂时不可用，请稍后重试</p>';
          };

          // 确保在添加脚本前容器存在
          if (container && container.parentNode) {
            container.appendChild(script)
          }
        }
      }
    });
  }
}

// 监听路由变化
watch(
  () => page.value.relativePath,
  async () => {
    // 路由变化时更新 Giscus 配置
    await nextTick();
    setTimeout(() => {
      const iframe = document.querySelector('iframe.giscus-frame')
      if (iframe) {
        // 移除旧的 iframe 并重新加载，以确保加载新页面的评论
        iframe.remove();
        // 重新加载 Giscus
        loadGiscus();
      } else {
        // 如果没有 iframe，重新加载
        loadGiscus()
      }
    }, 100); // 短暂延迟以确保 DOM 更新
    
    // 更新页面阅读量
    incrementPageView();
  }
)

onMounted(async () => {
  // 减少 Giscus 控制台警告
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    // 过滤掉 Giscus 的常见警告
    if (message.includes('[giscus] Discussion not found') || 
        message.includes('[giscus]') && message.includes('not found')) {
      return; // 静默处理
    }
    originalConsoleWarn.apply(console, args);
  };

  // 初始加载 Giscus
  await nextTick();
  requestAnimationFrame(() => {
    loadGiscus()
  });

  // 获取并显示当前页面阅读量
  pageViewCount = await getPageViewCount()
  updatePageViewDisplay()
  
  // 增加阅读量计数
  incrementPageView();
  
  // 更新页面 SEO 元数据
  updateSEOMeta();
  
  // 初始化轻量级图片优化
  LightweightImageOptimizer.init();
  
  // 添加图片优化样式
  const style = document.createElement('style')
  style.textContent = imageOptimizationStyles
  document.head.appendChild(style);
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <!-- 在文档内容之前显示元信息 -->
      <div class="page-meta" v-if="page.frontmatter.date || page.frontmatter.author || page.relativePath">
        <div class="meta-item" v-if="page.frontmatter.date">
          <span class="meta-label">发布日期:</span>
          <span class="meta-value">{{ formatDate(page.frontmatter.date) }}</span>
        </div>
        <div class="meta-item" v-if="page.frontmatter.author">
          <span class="meta-label">作者:</span>
          <span class="meta-value">{{ page.frontmatter.author }}</span>
        </div>
        <!-- 阅读量统计 -->
        <div class="meta-item" v-if="page.relativePath">
          <span class="meta-label">阅读量:</span>
          <span class="meta-value page-view-count">加载中...</span>次
        </div>
        <!-- 标签 -->
        <div class="meta-item" v-if="getTagsArray() && getTagsArray().length">
          <span class="meta-label">标签:</span>
          <span class="meta-value">
            <span v-for="tag in getTagsArray()" :key="tag" class="tag">
              {{ tag }}
            </span>
          </span>
        </div>
      </div>
    </template>

    <template #doc-after>
      <!-- 在文档内容之后显示评论 -->
      <div class="comment-container" v-if="page.frontmatter.comment !== false">
        <h2>评论</h2>
        <div id="giscus-container"></div>
      </div>
    </template>
  </Layout>
  
  <!-- 回到顶部按钮 -->
  <BackToTop />
</template>

<style scoped>
.page-meta {
  padding: 20px 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.meta-label {
  font-weight: bold;
  margin-right: 8px;
  color: var(--vp-c-text-1);
}

.comment-container {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider-light);
}

.tag {
  display: inline-block;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 6px;
  margin-bottom: 4px;
  font-weight: normal;
  border: 1px solid var(--vp-c-border);
  transition: background-color 0.2s ease;
}

.tag:hover {
  background-color: var(--vp-c-border);
}
</style>
