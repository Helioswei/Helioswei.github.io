<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRouter } from 'vitepress'
import { onMounted, nextTick, watch } from 'vue'

const { Layout } = DefaultTheme
const { page } = useData()
const router = useRouter()

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
  }
)

onMounted(async () => {
  // 初始加载 Giscus
  await nextTick();
  requestAnimationFrame(() => {
    loadGiscus()
  });
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <!-- 在文档内容之前显示元信息 -->
      <div class="page-meta" v-if="page.frontmatter.date || page.frontmatter.author">
        <div class="meta-item" v-if="page.frontmatter.date">
          <span class="meta-label">发布日期:</span>
          <span class="meta-value">{{ formatDate(page.frontmatter.date) }}</span>
        </div>
        <div class="meta-item" v-if="page.frontmatter.author">
          <span class="meta-label">作者:</span>
          <span class="meta-value">{{ page.frontmatter.author }}</span>
        </div>
        <!-- 阅读量统计 -->
        <div class="meta-item">
          <span class="meta-label">阅读量:</span>
          <span class="meta-value" id="busuanzi_container_page_pv">
            <span id="busuanzi_value_page_pv">--</span>次
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
</style>