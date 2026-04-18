---
title: 标记
categories:
  - Markdown
tags:
  - Markdown
  - 标记
---

让你的 VitePress 站点中的 Markdown 文件支持标记。

## 配置

```ts [.vitepress/config.ts] {6}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      mark: true
    }
  }
})
```

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

## 案例

:::preview
这是 ==标记== 的文本。
:::
