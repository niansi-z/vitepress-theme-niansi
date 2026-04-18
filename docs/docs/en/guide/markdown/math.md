---
title: Math
categories:
  - Markdown
tags:
  - Markdown
  - Math
---

Adds $\TeX$ support in your VitePress site.

## Settings

Install related $\TeX$ package [markdown-it-mathjax3](https://www.npmjs.com/package/markdown-it-mathjax3) in your project:

::: code-group

```bash [pnpm]
$ pnpm add -D markdown-it-mathjax3
```

```bash [npm]
$ npm add -D markdown-it-mathjax3
```

```bash [yarn]
$ yarn add -D markdown-it-mathjax3
```

```bash [bun]
$ bun add -D markdown-it-mathjax3
```

:::

Then enabling via:

```ts [.vitepress/config.ts] {5}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    math: true,
  }
})
```

## Demo

:::preview
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
:::