---
title: 剧透
categories:
  - Markdown
tags:
  - Markdown
  - 剧透
---

在你的 VitePress 站点中添加剧透文字。

## 配置

```ts [.vitepress/config.ts] {6}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      spoiler: true
    }
  }
})
```

## 语法

使用 `!! !!` 标记剧透剧透文字。请注意两边需要有空格。

## 案例

#### 输入

```md
这是 !!剧透!! 的文本。
```

#### 输出

这是 !!剧透!! 的文本。
