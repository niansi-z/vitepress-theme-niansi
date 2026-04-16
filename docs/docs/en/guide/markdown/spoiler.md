---
title: Spoiler
categories:
  - Markdown
tags:
  - Markdown
  - Spoiler
---

Hide spoiler contents in your VitePress site.

## Setting

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

## Syntax

Use `!! !!` to mark the spoiler content. Note that there should be a space on both sides.

## Example

#### Input

```md
This is !!spoiler!! text.
```

#### Output

This is !!spoiler!! text.
