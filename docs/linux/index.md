# Linux 系统管理

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 过滤出 linux 目录的文章，确保安全访问
const linuxPosts = posts?.linux || []
</script>

欢迎来到 Linux 系统管理页面，这里汇集了关于 Linux 系统管理、运维等相关技术的文章。

## 文章列表

<ul v-if="linuxPosts && linuxPosts.length > 0">
  <li v-for="post in linuxPosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
<div v-else>
  此分类暂无文章
</div>

## 简介

本专题涵盖 Linux 系统管理、运维、Shell 脚本编写等内容，提供实用的系统管理和运维技巧。