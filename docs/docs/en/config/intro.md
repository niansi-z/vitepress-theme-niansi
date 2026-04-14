---
title: Config Intro
categories:
  - Config
tags:
  - Intro
---

## Config Concepts

VitePress mainly stores config and required files through the `.vitepress/` folder in the directory.

:::info Info
For the file structure of VitePress, see [VitePress → File Structure](https://vitepress.dev/guide/getting-started#file-structure).
:::

In VitePress, there are three config concepts:

- Site Config：Configuration items passed to `defineConfig`.
- Theme Config：Configuration items passed to `themeConfig`.
- Page Config：provided by Frontmatter at the top of the page based on YAML syntax.

## Theme Usage

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  // siteConfig here
  
  themeConfig: {
    // themeConfig here
  }
})
```
