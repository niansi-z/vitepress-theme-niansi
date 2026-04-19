---
title: 自定义对齐
categories:
  - Markdown
tags:
  - Markdown
  - 自定义对齐
---

自定义内容对齐方式。

## 配置

```ts [.vitepress/config.ts] {6}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      align: true
    }
  }
})
```

## 语法

```md
:::left
左对齐的内容
:::

:::center
居中的内容
:::

:::right
右对齐的内容
:::
```

::::preview
:::left
左对齐的内容
:::

:::center
居中的内容
:::

:::right
右对齐的内容
:::
::::
