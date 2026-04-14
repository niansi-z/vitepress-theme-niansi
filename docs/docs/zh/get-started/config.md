---
title: 配置项目
categories:
  - 快速上手
tags:
  - 配置项目
---

本教程指导你如何配置 VitePress 项目。

## 目录结构

VitePress 使用文档根目录下的 `.vitepress` 文件夹存储所有配置及缓存。

核心入口文件为 `.vitepress/config.ts`。

## 配置文件

需要在 `.vitepress/config.ts` 中导出配置对象。

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  /**
   * 站点配置项
   */
})

```

## 配置作用域

### 站点配置（Site Config）

站点配置由 VitePress 核心直接读取，如 `lang`、`title` 和 `description` 等。

:::info 参考
查看 [VitePress → 参考 → 站点配置](https://vitepress.dev/zh/reference/site-config) 获取完整选项列表
:::

### 主题配置（Theme Config）

主题配置是传递给主题的配置项，由 VitePress Theme Niansi 处理，详细选项参见 [配置 → 主题配置](../config/theme-config.md)
