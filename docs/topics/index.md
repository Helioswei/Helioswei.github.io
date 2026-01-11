# 热门话题

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 合并所有文章
const allPosts = [
  ...posts?.ai || [],
  ...posts?.cpp || [],
  ...posts?.tools || [],
  ...posts?.database || [],
  ...posts?.linux || [],
  ...posts?.graphics || [],
  ...posts?.about || []
].filter(post => !post.url.endsWith('/index')) // 排除索引页面

// 提取热门标签（这里我们使用一些预定义的热门话题）
const popularTopics = [
  { name: 'AI技术', count: 0, link: '/ai/' },
  { name: 'C++编程', count: 0, link: '/cpp/' },
  { name: '数据库', count: 0, link: '/database/' },
  { name: 'Linux系统', count: 0, link: '/linux/' },
  { name: '多媒体处理', count: 0, link: '/graphics/' },
  { name: '开发工具', count: 0, link: '/tools/' }
]

// 计算每个话题的文章数量
allPosts.forEach(post => {
  if (post.url.includes('/ai/')) popularTopics[0].count++
  if (post.url.includes('/cpp/')) popularTopics[1].count++
  if (post.url.includes('/database/')) popularTopics[2].count++
  if (post.url.includes('/linux/')) popularTopics[3].count++
  if (post.url.includes('/graphics/')) popularTopics[4].count++
  if (post.url.includes('/tools/')) popularTopics[5].count++
})

// 按文章数量排序
const sortedTopics = popularTopics.sort((a, b) => b.count - a.count)
</script>

## 热门话题分类

<div class="topic-grid">
  <div v-for="topic in sortedTopics" :key="topic.name" class="topic-card">
    <h3><a :href="topic.link">{{ topic.name }}</a></h3>
    <p>文章数: {{ topic.count }}</p>
  </div>
</div>

<style>
.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.topic-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
}

.topic-card h3 {
  margin-top: 0;
}

.topic-card a {
  color: #2c3e50;
  text-decoration: none;
}

.topic-card a:hover {
  text-decoration: underline;
}
</style>

## 简介

这里展示的是博客中最受欢迎的话题分类，按照文章数量排序。