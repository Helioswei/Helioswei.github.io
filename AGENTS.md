# 项目上下文文件

## 项目概述

这是一个基于 **VitePress** 构建的技术博客项目，名为"赫利俄斯的AI实验室"。博客专注于分享传统编程与 AIGC（AI Generated Content）应用的科普内容，涵盖 AI 技术、C++ 编程、数据库管理、图形学技术、Linux 系统管理等多个技术领域。

### 核心技术栈

- **框架**: VitePress 2.0.0-alpha.15
- **语言**: JavaScript/TypeScript
- **运行环境**: Node.js 18+
- **部署**: GitHub Pages
- **评论系统**: Giscus（基于 GitHub Discussions）
- **包管理器**: npm

### 项目结构

```
Helioswei.github.io/
├── .github/workflows/          # GitHub Actions 工作流
│   └── deploy.yml              # 自动部署到 GitHub Pages
├── docs/                       # VitePress 文档根目录
│   ├── .vitepress/             # VitePress 配置和主题
│   │   ├── config.mts          # VitePress 主配置文件
│   │   ├── sidebar.ts          # 自动生成侧边栏的 TypeScript 模块
│   │   ├── sitemap.ts          # 生成站点地图
│   │   ├── posts.data.js       # 动态加载文章数据的加载器
│   │   ├── theme/              # 自定义主题
│   │   │   ├── index.ts        # 主题入口文件
│   │   │   ├── Layout.vue      # 主布局组件
│   │   │   ├── components/     # 自定义组件
│   │   │   │   ├── BackToTop.vue      # 回到顶部按钮
│   │   │   │   └── OptimizedImage.vue # 图片优化组件
│   │   │   └── utils/          # 工具函数
│   │   │       └── imageOptimizer.ts  # 图片优化工具
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

## 构建和运行

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

构建静态站点：

```bash
npm run docs:build
```

### 预览构建结果

预览生产构建：

```bash
npm run docs:preview
```

### 生成站点地图

生成 sitemap.xml（用于 SEO）：

```bash
npm run sitemap
```

### 完整构建流程（包含 sitemap）

```bash
npm run build:optimized
```

## 开发规范

### 文件命名规范

- **目录结构**: 采用分类目录结构，每个技术领域对应一个目录
- **文件命名**: 使用中文文件名，便于理解和维护
- **排序**: 需要排序的文章使用数字前缀，格式：`NN-文章标题.md`（例如：`01-介绍.md`、`02-安装.md`）
- **空格处理**: 文件名中的空格可用连字符 `-` 代替

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

元数据说明：
- `title`: 文章标题（若未指定则从文件名提取）
- `date`: 发布日期（若未指定则使用文件创建时间）
- `author`: 作者信息
- `tags`: 文章标签（支持逗号分隔的字符串或数组格式）
- `description`: 文章描述（用于 SEO）
- `image`: 封面图片路径（用于社交媒体分享）
- `comment`: 是否启用评论系统（默认 true）

### 自动化功能

项目实现了以下自动化功能：

1. **自动侧边栏生成**: `docs/.vitepress/sidebar.ts` 自动扫描每个目录下的 Markdown 文件（排除 index.md），并生成相应的侧边栏导航。支持通过数字前缀控制排序。

2. **自动首页索引**: 每个分类目录的 `index.md` 页面会动态加载该目录下的所有文章列表。

3. **文章元数据显示**: 文章页面会自动显示作者、发布日期、阅读量统计和标签信息。

4. **阅读量统计**: 使用 IndexedDB 和 localStorage 双重存储实现本地阅读量统计。

5. **SEO 优化**: 自动更新页面标题、描述、关键词等 SEO 元数据。

6. **评论系统**: 集成 Giscus 评论系统，基于 GitHub Discussions，每篇文章底部自动显示评论区域。

7. **图片优化**: 实现轻量级图片优化功能，提升页面加载性能。

### 分类目录说明

- **ai/**: AI 技术探索（机器学习、深度学习、自然语言处理等）
- **cpp/**: C++ 编程技术（编译原理、内存管理、常用库等）
- **database/**: 数据库技术（MySQL、AMQPCPP、S3 等）
- **graphics/**: 图形与多媒体技术（FFmpeg、CUDA、OpenCV、图像处理等）
- **linux/**: Linux 系统管理（CentOS7 常用命令、网络设置、环境配置等）
- **tools/**: 工具与框架应用（Git、Docker、Hexo、Selenium 等）
- **about/**: 关于页面和联系信息

## 部署流程

项目使用 GitHub Actions 自动部署到 GitHub Pages：

1. **触发条件**: 推送到 `main` 分支或手动触发
2. **构建环境**: Ubuntu latest，Node.js 22
3. **构建步骤**:
   - 检出代码
   - 安装依赖（使用 npm ci）
   - 构建站点（`npm run docs:build`）
   - 上传构建产物
   - 部署到 GitHub Pages

构建产物位于 `docs/.vitepress/dist/` 目录。

## 主题自定义

项目在 VitePress 默认主题基础上进行了自定义：

- **Layout.vue**: 自定义布局组件，集成 SEO 元数据、阅读量统计、评论系统
- **BackToTop.vue**: 回到顶部按钮组件
- **OptimizedImage.vue**: 图片优化组件
- **imageOptimizer.ts**: 图片优化工具函数

## 关键配置文件

### package.json

定义了项目的依赖和脚本：
- `devDependencies`: 仅包含 VitePress
- `scripts`: 定义了开发、构建、预览和 sitemap 生成命令

### docs/.vitepress/config.mts

VitePress 主配置文件（内容为对象，需要进一步查看具体配置）

### docs/.vitepress/sidebar.ts

自动生成侧边栏的 TypeScript 模块，支持数字前缀排序

### docs/.vitepress/posts.data.js

动态加载文章数据的加载器，为每个分类目录创建数据加载器

### docs/.vitepress/theme/Layout.vue

主布局组件，集成多种功能：
- SEO 元数据更新
- 阅读量统计（IndexedDB + localStorage）
- Giscus 评论系统集成
- 标签显示
- 图片优化

## 注意事项

1. **图片资源**: 所有图片应放在 `docs/public/images/` 目录下，引用时使用 `/images/文件名` 格式
2. **中文文件名**: 项目使用中文文件名，确保文件系统支持
3. **Giscus 配置**: 评论系统使用 GitHub Discussions，需要在仓库中配置相应的设置
4. **SEO**: 每篇文章应提供 description 和 image 以优化社交媒体分享效果
5. **缓存**: 构建后可能需要清除 `docs/.vitepress/cache/` 目录以解决缓存问题

## 常见问题

### 如何添加新文章？

1. 在对应的分类目录下创建新的 Markdown 文件
2. 添加必要的 frontmatter 元数据
3. 如需排序，在文件名前添加数字前缀（如 `01-新文章.md`）
4. 运行 `npm run docs:dev` 预览效果

### 如何修改侧边栏？

侧边栏是自动生成的，遵循以下规则：
- 自动扫描每个目录下的 `.md` 文件（排除 `index.md`）
- 数字前缀的文件按数字顺序排列
- 无数字前缀的文件按字母顺序排列

### 如何禁用某篇文章的评论？

在文章的 frontmatter 中添加：

```yaml
comment: false
```

### 如何修改网站配置？

主要配置在 `docs/.vitepress/config.mts` 文件中修改。

## 技术亮点

1. **TypeScript 支持**: 使用 TypeScript 编写配置和主题代码，提供类型安全
2. **自动化构建**: GitHub Actions 自动部署，简化发布流程
3. **SEO 优化**: 完整的 SEO 元数据支持，包括 Open Graph 和 Twitter Card
4. **评论系统**: 集成 Giscus，基于 GitHub Discussions，无需额外服务
5. **阅读量统计**: 使用 IndexedDB 实现本地持久化存储
6. **图片优化**: 实现轻量级图片优化，提升性能
7. **响应式设计**: 适配各种设备尺寸
8. **自动侧边栏**: 减少手动维护工作，提高开发效率