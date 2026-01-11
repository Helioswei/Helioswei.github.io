# 图形与多媒体技术

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

// 过滤出 graphics 目录的文章，确保安全访问
const graphicsPosts = posts?.graphics || []
</script>

欢迎来到图形与多媒体技术页面，这里汇集了关于 FFmpeg、CUDA、图像处理等相关技术的文章。

## 文章列表

<ul v-if="graphicsPosts && graphicsPosts.length > 0">
  <li v-for="post in graphicsPosts" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>
<div v-else>
  此分类暂无文章
</div>

## 简介

本专题涵盖图形学、多媒体处理、CUDA 并行计算等内容，提供 FFmpeg、OpenCV、图像处理等方面的实用技术。