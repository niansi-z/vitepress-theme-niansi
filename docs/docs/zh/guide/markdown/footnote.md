---
title: 脚注
categories:
  - Markdown
tags:
  - Markdown
  - 脚注
---

让你的 VitePress 站点中的 Markdown 文件支持脚注。

## 配置

```ts [.vitepress/config.ts] {6}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      footnote: true
    }
  }
})
```

## 语法

- 在 Markdown 中使用 `[^锚点文字]` 来定义脚注。

- 在之后的任何位置使用 `[^锚点文字]: ...` 来描述脚注内容。

- 如果脚注包含多个段落，其后的段落应当保持双层缩进。



## 案例

:::preview
这是一个脚注的例子[^1]。

[^1]: 这是脚注的内容。
:::
