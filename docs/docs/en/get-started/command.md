---
title: Project Command
categories:
  - Get Started
tags:
  - Project Command
---

This tutorial provides an overview of the essential commands for managing your VitePress project.

## Common Commands

- `vitepress dev <dir>`: Starts a development server for local preview with hot-reloading.
- `vitepress build <dir>`: Build the VitePress site into static files for deployment.

::: info Using Template Scripts
If you are using the VitePress Theme Niansi template to create a project, you can directly use the following command:

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

This means you can run the following commands directly:

::: code-group

```sh [pnpm]
1. `pnpm docs:dev`: Starts the development server.
2. `pnpm docs:build`: Builds the project and generates output.
3. `pnpm docs:preview`: Preview the build result
```

```sh [npm]
1. `npm run docs:dev`: Starts the development server.
2. `npm run docs:build`: Builds the project and generates output.
3. `npm run docs:preview`: Preview the build result
```

```sh [yarn]
1. `yarn docs:dev`: Starts the development server.
2. `yarn docs:build`: Builds the project and generates output.
3. `yarn docs:preview`: Preview the build result
```

```sh [bun]
1. `bun docs:dev`: Starts the development server.
2. `bun docs:build`: Builds the project and generates output.
3. `bun docs:preview`: Preview the build result
```

:::
