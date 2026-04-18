---
title: Task list
categories:
  - Markdown
tags:
  - Markdown
  - Task list
---

Let the Markdown file in your VitePress site support task list.

## Setting

```ts [.vitepress/config.ts] {6}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      tasklist: true
    }
  }
})
```

## Syntax

- Use `- [ ] some text` to render an unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

## Demo

:::preview
- [ ] Plan A
- [x] Plan B
- [X] Plan C
:::
