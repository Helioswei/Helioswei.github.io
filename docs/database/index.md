# 数据库技术

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 过滤出 database 目录的文章，确保安全访问
const databasePosts = posts?.database || []
</script>

欢迎来到数据库技术页面，这里汇集了关于 MySQL、MongoDB 等数据库技术的文章。

## 文章列表

<ul v-if="databasePosts && databasePosts.length > 0">
  <li v-for="post in databasePosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
<div v-else>
  此分类暂无文章
</div>

## 简介

本专题涵盖各种数据库技术，包括 MySQL、PostgreSQL、MongoDB 等，提供数据库设计、优化和管理的最佳实践。