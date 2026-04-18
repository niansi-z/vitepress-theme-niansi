---
title: Mark
categories:
  - Markdown
tags:
  - Markdown
  - Mark
---

Make your Markdown files in your VitePress site support mark.

## Settings

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

## Syntax

Use `== ==` to mark. Please note that there should be a space on both sides.

## Example

:::preview
This is ==marked== text.
:::
