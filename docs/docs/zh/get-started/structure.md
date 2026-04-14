---
title: 项目结构
categories:
  - 快速上手
tags:
  - 配置项目
---

本教程将介绍 VitePress 项目结构。

## VitePress 项目结构

VitePress 项目结构如下：

```text
.
├── docs → 文档文件夹
│   ├── .vitepress → 配置文件夹
│   │   ├── dist → 构建输出目录
│   │   ├── theme
│   │   │   ├── index.ts → 主题继承入口
│   │   │   └── style.css → 主题继承样式
│   │   └── config.ts → 配置文件入口
│   ├── public → 静态资源目录
│   ├── ... → 其他内容
│   └── index.md → 项目主页
└── package.json → Nodejs 配置文件
```
