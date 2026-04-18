---
title: Footnote
categories:
  - Markdown
tags:
  - Markdown
  - Footnote
---

Let the Markdown file in your VitePress site support footnotes.

## Settings

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

## Syntax

- Use `[^Anchor text]` in Markdown to define a footnote

- Use `[^Anchor text]: ...` to describe footnote content

- If there are multiple paragraphs in footnote, the paragraph show be double indented

## Demo

:::preview
Here’s an example of a footnote[^1].

[^1]: This is the footnote content.
:::
