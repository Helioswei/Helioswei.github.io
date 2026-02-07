# 赫利俄斯的AI实验室

> 一个分享传统编程与 AIGC 应用的科普博客

![VitePress](https://img.shields.io/badge/VitePress-2.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 项目简介

本项目是一个基于 [VitePress](https://vitepress.dev/zh/) 构建的技术博客，专注于分享传统编程与 AIGC（AI Generated Content）应用的科普内容。博客涵盖 AI 技术、C++ 编程、数据库管理、图形学技术、Linux 系统管理等多个技术领域，旨在为开发者提供实用的技术分享和经验总结。

### 🎯 核心特色

- **内容丰富**: 涵盖 AI、C++、数据库、图形学、Linux、工具等多个技术领域
- **自动生成**: 自动侧边栏、自动索引、自动 SEO 优化
- **交互友好**: 集成评论系统、阅读量统计、标签分类
- **性能优化**: 图片优化、静态站点生成、快速加载
- **SEO 友好**: 完整的元数据支持、站点地图生成

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| VitePress | 2.0.0-alpha.15 | 静态站点生成器 |
| Vue.js | 3.x | 前端框架 |
| TypeScript | 5.x | 类型安全的配置和主题代码 |
| Node.js | 18+ | 运行环境 |
| Giscus | - | 基于 GitHub Discussions 的评论系统 |

## 📁 项目结构

```
Helioswei.github.io/
├── .github/workflows/          # GitHub Actions 工作流
│   └── deploy.yml              # 自动部署到 GitHub Pages
├── docs/                       # VitePress 文档根目录
│   ├── .vitepress/             # VitePress 配置和主题
│   │   ├── config.mts          # VitePress 主配置文件
│   │   ├── sidebar.ts          # 自动生成侧边栏
│   │   ├── sitemap.ts          # 生成站点地图
│   │   ├── posts.data.js       # 动态加载文章数据
│   │   ├── theme/              # 自定义主题
│   │   │   ├── Layout.vue      # 主布局组件
│   │   │   ├── components/     # 自定义组件
│   │   │   └── utils/          # 工具函数
│   │   ├── cache/              # VitePress 缓存
│   │   └── dist/               # 构建输出目录
│   ├── ai/                     # AI 技术相关文章
│   ├── cpp/                    # C++ 编程技术文章
│   ├── database/               # 数据库技术文章
│   ├── graphics/               # 图形与多媒体技术文章
│   ├── linux/                  # Linux 系统管理文章
│   ├── tools/                  # 工具与框架应用文章
│   ├── about/                  # 关于页面和联系信息
│   ├── public/                 # 静态资源
│   │   ├── images/             # 图片资源
│   │   ├── robots.txt          # 爬虫配置
│   │   └── sitemap.xml         # 站点地图
│   └── index.md                # 首页
├── package.json                # 项目依赖和脚本配置
└── README.md                   # 项目说明文档
```

## 🚀 快速开始

### 前置准备

- [Node.js](https://nodejs.org/) 18 及以上版本
- 支持 [Markdown](https://en.wikipedia.org/wiki/Markdown) 语法的编辑器（推荐 [VSCode](https://code.visualstudio.com/)）

### 安装依赖

```bash
npm install
```

### 开发模式

启动本地开发服务器（支持热更新）：

```bash
npm run docs:dev
```

开发服务器运行在 `http://localhost:5173`

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

### 生成站点地图

```bash
npm run sitemap
```

### 完整构建流程（包含 sitemap）

```bash
npm run build:optimized
```

## 📝 文章编写规范

### 目录结构

本博客采用分类目录结构：

- **ai/**: AI 技术探索（机器学习、深度学习、自然语言处理等）
- **cpp/**: C++ 编程技术（编译原理、内存管理、常用库等）
- **database/**: 数据库技术（MySQL、AMQPCPP、S3 等）
- **graphics/**: 图形与多媒体技术（FFmpeg、CUDA、OpenCV、图像处理等）
- **linux/**: Linux 系统管理（CentOS7 常用命令、网络设置、环境配置等）
- **tools/**: 工具与框架应用（Git、Docker、Hexo、Selenium 等）
- **about/**: 关于页面和联系信息

### 文件命名规则

- 使用中文文件名，便于理解和维护
- 需要排序的文章使用数字前缀，格式：`NN-文章标题.md`（例如：`01-介绍.md`、`02-安装.md`）
- 文件名中的空格可用连字符 `-` 代替

### 文章元数据（Frontmatter）

每篇 Markdown 文章可以在文件开头添加 YAML 格式的元数据：

```yaml
---
title: 文章标题
date: 2026-01-11
author: 作者名
tags: 标签1,标签2  # 或使用数组格式: tags: [标签1, 标签2]
description: 文章描述（用于 SEO）
image: /images/封面图片.jpg  # 用于社交媒体分享
comment: true  # 是否启用评论（默认启用，设为 false 禁用）
---
```

**元数据说明：**

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `title` | 文章标题 | 从文件名提取 |
| `date` | 发布日期 | 文件创建时间 |
| `author` | 作者信息 | 无 |
| `tags` | 文章标签 | 无 |
| `description` | 文章描述（SEO） | 无 |
| `image` | 封面图片路径 | 默认头像 |
| `comment` | 是否启用评论系统 | `true` |

## ✨ 功能特性

### 自动化功能

1. **自动侧边栏**
   - 自动扫描每个目录下的 Markdown 文件（排除 `index.md`）
   - 支持数字前缀排序
   - 无需手动维护

2. **自动首页索引**
   - 每个分类目录的 `index.md` 页面自动加载该目录下的所有文章列表

3. **文章元数据显示**
   - 自动显示作者、发布日期
   - 本地阅读量统计（IndexedDB + localStorage）
   - 标签分类展示

4. **SEO 优化**
   - 自动更新页面标题、描述、关键词
   - 支持 Open Graph 和 Twitter Card
   - 自动生成站点地图

5. **评论系统**
   - 集成 Giscus 评论系统
   - 基于 GitHub Discussions
   - 每篇文章底部自动显示

6. **图片优化**
   - 轻量级图片优化功能
   - 提升页面加载性能

### 用户交互

- **搜索功能**: 内置本地搜索，支持全文检索
- **评论系统**: 基于 GitHub Discussions 的评论功能
- **阅读量统计**: 本地持久化存储
- **标签分类**: 文章按标签分类展示
- **社交链接**: 页脚提供 GitHub、邮箱和微信公众号链接

## 🌐 部署

### GitHub Pages 自动部署

项目使用 GitHub Actions 自动部署到 GitHub Pages：

1. **触发条件**: 推送到 `main` 分支或手动触发
2. **构建环境**: Ubuntu latest，Node.js 22
3. **构建步骤**:
   - 检出代码
   - 安装依赖
   - 构建站点
   - 上传构建产物
   - 部署到 GitHub Pages

构建产物位于 `docs/.vitepress/dist/` 目录。

### 手动部署

如需手动部署到其他平台：

```bash
# 1. 构建站点
npm run docs:build

# 2. 将 docs/.vitepress/dist/ 目录的内容部署到你的服务器
```

## 📂 内容分类

### AI 技术探索

分享前沿的人工智能技术，包括机器学习、深度学习、自然语言处理等领域的实践经验和研究成果。

### C++ 编程技术

涵盖 C++ 程序编译原理、内存管理、常用库使用等内容，提供实用的开发技巧和最佳实践。

### 数据库技术

深入探讨各种数据库技术，包括 MySQL、AMQPCPP、S3 等的设计、优化和管理。

### 图形与多媒体技术

介绍 FFmpeg 多媒体处理、CUDA 并行计算、OpenCV 图像处理等技术，涵盖音视频编解码、图像处理算法等。

### Linux 系统管理

涵盖 Linux 系统管理、运维、Shell 脚本编写等内容，提供实用的系统管理和运维技巧。

### 工具与框架应用

介绍各种开发工具、框架和库的使用方法，包括 Git 版本控制、Docker 容器化等，助力高效开发。

## 🔧 开发指南

### 添加新文章

1. 在对应的分类目录下创建新的 Markdown 文件
2. 添加必要的 frontmatter 元数据
3. 如需排序，在文件名前添加数字前缀（如 `01-新文章.md`）
4. 运行 `npm run docs:dev` 预览效果

### 修改侧边栏

侧边栏是自动生成的，遵循以下规则：
- 自动扫描每个目录下的 `.md` 文件（排除 `index.md`）
- 数字前缀的文件按数字顺序排列
- 无数字前缀的文件按字母顺序排列

### 禁用某篇文章的评论

在文章的 frontmatter 中添加：

```yaml
comment: false
```

### 修改网站配置

主要配置在 `docs/.vitepress/config.mts` 文件中修改。

## 📊 技术亮点

- **TypeScript 支持**: 使用 TypeScript 编写配置和主题代码，提供类型安全
- **自动化构建**: GitHub Actions 自动部署，简化发布流程
- **SEO 优化**: 完整的 SEO 元数据支持
- **评论系统**: 集成 Giscus，基于 GitHub Discussions
- **阅读量统计**: 使用 IndexedDB 实现本地持久化存储
- **图片优化**: 实现轻量级图片优化，提升性能
- **响应式设计**: 适配各种设备尺寸
- **自动侧边栏**: 减少手动维护工作

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

MIT License

## 🔗 相关链接

- [VitePress 官方文档](https://vitepress.dev/zh/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Giscus 文档](https://giscus.app/zh-CN)

## 💬 联系方式

- GitHub: [@Helioswei](https://github.com/Helioswei)
- 博客: [https://helioswei.github.io](https://helioswei.github.io)

