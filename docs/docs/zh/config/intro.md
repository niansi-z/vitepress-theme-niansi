---
title: 配置介绍
categories:
  - 配置
tags:
  - 配置介绍
---

## 配置概念

VitePress 主要通过目录下的 `.vitepress/` 文件夹存放配置和需要的文件。

:::info 相关信息
关于 VitePress 的文件结构，详见 [VitePress → 文件结构](https://vitepress.dev/zh/guide/getting-started#file-structure)。
:::

在 VitePress 中，有三种配置概念：

- 站点配置：传递给 `defineConfig` 的配置项。
- 主题配置：传递给 `themeConfig` 的配置项。
- 页面配置：由在页面顶部基于 YAML 语法的 frontmatter 提供。

## 使用主题

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  // 站点配置选项
  
  themeConfig: {
    // 主题配置选项
  }
})
```
