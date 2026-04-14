---
title: Install / Usage
categories:
  - Get Started
tags:
  - Get Started
  - Install
  - Usage
---

## Requirement

- Env: LTS Versions of Node.js (^20+)
- Package Manager: npm >= 8, pnpm >= 7

## Install

Create a new vitepress-theme-niansi project in `<dir>` folder:

::: code-group

```bash [pnpm]
$ pnpm add -D vitepress-theme-niansi vitepress@next
```

```bash [npm]
$ npm add -D vitepress-theme-niansi vitepress@next
```

```bash [yarn]
$ yarn add -D vitepress-theme-niansi vitepress@next
```

```bash [bun]
$ bun add -D vitepress-theme-niansi vitepress@next
```

:::

After installation, run the following commands:

::: code-group

```bash [pnpm]
$ pnpm vitepress-theme-niansi init
```

```bash [npm]
$ npx vitepress-theme-niansi init
```

```bash [yarn]
$ yarn vitepress-theme-niansi init
```

```bash [bun]
$ bun vitepress-theme-niansi init
```

:::

> [!IMPORTANT] Important
> `<dir>` is a parameter here, replace it with real folder names, such as `blog` or other name you like.

## Usage and Configuration

Please import and use the `vitepress-theme-niansi` theme in your configuration file:

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  // Other Configuration Items... 
  themeConfig: {
    // Other Theme Configuration Items...
  }
})
```

You can refer to [this documentation's configuration](https://github.com/niansi-z/vitepress-theme-niansi/blob/main/docs/docs/.vitepress/config.ts) as a configuration reference.
