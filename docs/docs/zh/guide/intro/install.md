---
title: 安装/使用
categories:
  - 快速上手
tags:
  - 快速上手
  - 安装
  - 使用
---

## 要求

- 环境：LTS 版本的 Node.js(^20+)
- 包管理器：npm >= 8、pnpm >= 7

## 安装

在 `<dir>` 文件夹内新建 vitepress-theme-niansi 项目：

::: code-group

```bash [pnpm]
$ pnpm add -D vitepress-theme-niansi vitepress@next
```

```bash [npm]
$ npm add -D vitepress-theme-niansi vitepress@next
```

```bash [yarn]
$ yarn add -D vitepress-theme-niansi vitepress@next
```

```bash [bun]
$ bun add -D vitepress-theme-niansi vitepress@next
```

:::

安装完成后，执行以下命令：

::: code-group

```bash [pnpm]
$ pnpm vitepress-theme-niansi init
```

```bash [npm]
$ npx vitepress-theme-niansi init
```

```bash [yarn]
$ yarn vitepress-theme-niansi init
```

```bash [bun]
$ bun vitepress-theme-niansi init
```

:::

> [!IMPORTANT] 重要
> 这里的 `<dir>` 是一个参数，你需要使用真实的文件夹名称替换它，例如 `blog` 或其他喜欢的名称。

## 使用与配置

请在配置文件中导入并使用 `vitepress-theme-niansi` 主题：

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  // 其他配置项... 
  themeConfig: {
    // 其他主题配置项...
  }
})
```

可以查看 [本文档配置](https://github.com/niansi-z/vitepress-theme-niansi/blob/main/docs/docs/.vitepress/config.ts) 作为一个配置参考。
