---
title: Superscript and Subscript
categories:
  - Markdown
tags:
  - Markdown
  - Superscript
  - Subscript
---

## Setting

```ts [.vitepress/config.ts] {7,9}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      // Enable Subscript
      sub: true,
      // Enable Superscript
      sup: true
    }
  }
})
```

## Syntax

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

## Example

:::preview
19^th^

H~2~O
:::

::: tip Tips
You can use `\` to escape `^` and `~`:

H\~2~O 19\^th^
:::
