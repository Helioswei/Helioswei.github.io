# 关于本站

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 过滤出 about 目录的文章，确保安全访问
const aboutPosts = posts?.about || []
</script>

欢迎来到关于本站页面，这里包含关于博客的一些说明和示例。

## 目录

<ul v-if="aboutPosts && aboutPosts.length > 0">
  <li v-for="post in aboutPosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
<div v-else>
  此分类暂无文章
</div>

## 简介

这是博客的关于页面，包含一些示例和其他相关信息。