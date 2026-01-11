# Git 版本控制

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 过滤出 git 目录的文章，确保安全访问
const gitPosts = posts?.git || []
</script>

欢迎来到 Git 版本控制页面，这里汇集了关于 Git 使用技巧、工作流等相关技术的文章。

## 文章列表

<ul v-if="gitPosts && gitPosts.length > 0">
  <li v-for="post in gitPosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
<div v-else>
  此分类暂无文章
</div>

## 简介

本专题涵盖 Git 版本控制系统，包括基本命令、高级技巧、工作流等内容，帮助开发者更好地管理代码版本。