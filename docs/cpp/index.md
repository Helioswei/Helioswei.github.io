# 传统编程技术

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 过滤出 cpp 目录的文章，确保安全访问
const cppPosts = posts?.cpp || []
</script>

欢迎来到传统编程技术页面，这里汇集了关于 C++、系统编程等相关技术的文章。

## 文章列表

<ul v-if="cppPosts && cppPosts.length > 0">
  <li v-for="post in cppPosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
<div v-else>
  此分类暂无文章
</div>

## 简介

本专题涵盖 C++、Python、数据库、Linux 系统管理等传统编程技术，提供实用的开发技巧和最佳实践。