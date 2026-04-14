---
title: 项目内容
categories:
  - 快速上手
tags:
  - 项目内容
---

本文档介绍 VitePress 项目中的页面生成、Markdown 处理与 Frontmatter 配置。

## 页面生成

VitePress 基于 Markdown 文件生成独立页面。路由路径由文件的相对路径决定。

当你通过脚手架生成项目时，将看到以下目录结构：

```text
└─ docs
   ├─ .vitepress
   │  ├─ theme
   │  │  ├─ index.ts
   │  │  ├─ style.css
   │  └─ config.ts
   ├─ post
   │  ├─ index.md
   │  ├─ page1.md
   ├─ about.md
   └─ index.md
```

路由路径解析规则：

| **相对路径**         | **路由路径**           |
|------------------|--------------------|
| `/index.md`      | `/`                |
| `/post/index.md` | `/post/`           |
| `/post/page1.md` | `/post/page1.html` |

## Markdown 处理

VitePress Theme Niansi 基于 VitePress 会将 Markdown 文件渲染为 HTML 内容，你可以编辑 Markdown 文件以修改内容，
在开发服务器运行期间，这些更改会实时同步。

::: tip 提示
参考 [Markdown 教程](https://www.markdownlang.com/zh/) 了解基础语法。
:::

## Frontmatter 配置

Frontmatter 用于分配页面级配置，采用 YAML 格式，必须置于 Markdown 文件顶部，并由三横线（`---`）包裹。

```md
---
title: 页面标题
description: 页面描述
---

<!-- 这里是 Markdown 内容 -->

...
```

Frontmatter 属性（如 `title`、`description`）会覆盖 [VitePress frontmatter](https://vitepress.dev/zh/guide/frontmatter)
中的全局配置。此配置仅在当前页面生效，且具有最高优先级。
