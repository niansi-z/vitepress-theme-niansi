---
title: 项目命令
categories:
  - 快速上手
tags:
  - 项目命令
---

本教程将介绍 VitePress 项目的管理命令，涵盖本地开发、生产构建及版本更新。

## 常用命令

- `vitepress dev <dir>`: 启动本地开发服务器，用户实时预览文档修改。
- `vitepress build <dir>`: 将 VitePress 站点构建为用于部署的静态文件。

::: info 使用模板脚本
如果正在使用 VitePress Theme Niansi 模板创建项目，可以直接使用以下命令：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

这意味着你可以直接运行以下指令：

::: code-group

```sh [pnpm]
1. `pnpm docs:dev`: 启动开发服务器
2. `pnpm docs:build`: 执行项目构建并输出静态文件
3. `pnpm docs:preview`: 预览构建结果
```

```sh [npm]
1. `npm run docs:dev`: 启动开发服务器
2. `npm run docs:build`: 执行项目构建并输出静态文件
3. `npm run docs:preview`: 预览构建结果
```

```sh [yarn]
1. `yarn docs:dev`: 启动开发服务器
2. `yarn docs:build`: 执行项目构建并输出静态文件
3. `yarn docs:preview`: 预览构建结果
```

```sh [bun]
1. `bun docs:dev`: 启动开发服务器
2. `bun docs:build`: 执行项目构建并输出静态文件
3. `bun docs:preview`: 预览构建结果
```

:::
