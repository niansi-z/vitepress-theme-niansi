---
title: Project Config
categories:
  - Get Started
tags:
  - Project Config
---

This tutorial guides you through configuring a VitePress project.

## Directory Structure

VitePress uses the `.vitepress` folder in the document root directory to store all configurations and caches.

The core entry file is `.vitepress/config.ts`.

## Configuration Entry

You need to export the configuration object in `.vitepress/config.ts`.

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  /**
   * Site Config
   */
})

```

## Configuration Scopes

### Site Config

Site configuration is read directly by the VitePress core, such as `lang`, `title`, `description`, and others.

:::info Reference
See [VitePress → Reference → Site Config](https://vitepress.dev/reference/site-config) for the complete list of options.
:::

### Theme Config

Theme configuration refers to the configuration items passed to the theme and processed by VitePress Theme Niansi. For detailed options, see [Config → Theme Config](../config/theme-config.md)
