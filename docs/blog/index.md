# 最新文章

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 合并所有文章并按日期排序
const allPosts = [
  ...posts?.ai || [],
  ...posts?.cpp || [],
  ...posts?.tools || [],
  ...posts?.database || [],
  ...posts?.linux || [],
  ...posts?.graphics || [],
  ...posts?.about || []
].filter(post => !post.url.endsWith('/index')) // 排除索引页面
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按日期倒序排列

// 只显示前10篇文章
const recentPosts = allPosts.slice(0, 10)
</script>

## 最新发布的文章

<ul v-if="recentPosts && recentPosts.length > 0">
  <li v-for="post in recentPosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
    <span> - {{ new Date(post.date).toLocaleDateString('zh-CN') }}</span>
  </li>
</ul>
<div v-else>
  暂无文章
</div>

## 简介

这里展示的是博客最新发布的文章列表，按照发布时间倒序排列。