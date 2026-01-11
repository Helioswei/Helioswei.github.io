<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page } = useData()

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
</style>