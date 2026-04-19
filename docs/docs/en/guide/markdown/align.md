---
title: Custom alignment
categories:
  - Markdown
tags:
  - Markdown
  - Align
---

## Settings

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

## Syntax

```md
::: left
Contents to align left
:::

::: center
Contents to align center
:::

::: right
Contents to align right
:::
```

::::preview
::: left
Contents to align left
:::

::: center
Contents to align center
:::

::: right
Contents to align right
:::
::::
