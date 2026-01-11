## 一、VitePress是什么
[VitePress ](https://vitepress.dev/zh/)是一个[静态站点生成器](https://en.wikipedia.org/wiki/Static_site_generator) (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## 二、快速开始
### 2.1 前置准备
+ [Node.js](https://nodejs.org/) 18 及以上版本。
+ 通过命令行界面 (CLI) 访问 VitePress 的终端。
+ 支持 [Markdown](https://en.wikipedia.org/wiki/Markdown) 语法的编辑器。
    - 推荐 [VSCode](https://code.visualstudio.com/) 及其[官方 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

VitePress 可以单独使用，也可以安装到现有项目中。在这两种情况下，都可以使用以下方式安装它：

```shell
npm add -D vitepress@next
```

### 2.2 安装向导
VitePress 附带一个命令行设置向导，可以帮助你构建一个基本项目。安装后，通过运行以下命令启动向导：

```shell
npx vitepress init
```

将回答下面一些简单的问题

```shell
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Where should VitePress look for your markdown files?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
◇  Add a prefix for VitePress npm scripts?
│  Yes
│
◇  Prefix for VitePress npm scripts:
│  docs
│
└  Done! Now run pnpm run docs:dev and start writing.
```

### 2.3 文件结构
如果正在构建一个独立的 VitePress 站点，可以在当前目录 (`./`) 中搭建站点。但是，如果在现有项目中与其他源代码一起安装 VitePress，建议将站点搭建在嵌套目录 (例如 `./docs`) 中，以便它与项目的其余部分分开。假设选择在 `./docs` 中搭建 VitePress 项目，生成的文件结构应该是这样的：

```shell
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

`docs` 目录作为 VitePress 站点的项目根目录。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的位置。

### 2.4 启动并运行
`docs:dev` 脚本将启动具有即时热更新的本地开发服务器。使用以下命令运行它：

```shell
npm run docs:dev
```

	开发服务应该会运行在 `http://localhost:5173` 上。在浏览器中访问 URL 以查看新站点的运行情况吧！

## 三、文件命名规范
### 3.1 目录结构
本博客采用分类目录结构，主要包含以下目录：
- ai/: AI技术相关文章
- cpp/: C++编程技术文章
- database/: 数据库技术文章
- graphics/: 图形与多媒体技术文章
- linux/: Linux系统管理文章
- tools/: 工具与框架应用文章
- about/: 关于页面和联系信息

### 3.2 文件命名规则
- 使用中文文件名，便于理解和维护
- 对于需要排序的文章，使用数字前缀，如：`01-文章标题.md`、`02-文章标题.md`
- 文件名中的空格可用连字符 `-` 代替

### 3.3 文件元数据 (Frontmatter)
每篇 Markdown 文章可在文件开头添加 YAML 格式的元数据，示例：
```yaml
---
title: 文章标题
date: 2026-01-11
author: 作者名
---
```

元数据说明：
- `title`: 文章标题，若未指定则从文件名提取
- `date`: 发布日期，若未指定则使用文件创建时间
- `author`: 作者信息

## 四、功能特性
### 4.1 自动侧边栏
系统会自动扫描每个目录下的 Markdown 文件（排除 index.md），并生成相应的侧边栏导航。

### 4.2 自动首页索引
每个分类目录的 index.md 页面会动态加载该目录下的所有文章列表。

### 4.3 文章元数据显示
文章页面会自动显示作者、发布日期和阅读量统计信息。

### 4.4 搜索功能
内置本地搜索功能，支持全文检索。

### 4.5 评论功能
每篇文章底部都集成了 Giscus 评论系统，读者可以在文章下方发表评论和讨论。

### 4.6 社交链接
页脚提供 GitHub、邮箱和微信公众号链接。

