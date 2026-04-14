---
title: Runtime Setup
categories:
  - Get Started
tags:
  - Runtime
---

This tutorial guides you through setting up a VitePress runtime environment.

## Editor

You need an editor to edit your project. We recommend using VS Code to write and run your VitePress projects.

Take macOS as an example. The steps to install VS Code are as follows:

1. Download [Visual Studio Code](https://code.visualstudio.com/) File.
2. Open the downloaded .dmg file.
3. Drag Visual Studio Code.app into the **Applications** folder.
4. Open VS Code from the **Applications** folder by double‑clicking the icon.

## Node.js

::: info Introduction
[Node.js](https://nodejs.org/en) is a JavaScript runtime built on [Chrome's V8](https://v8.dev/) JavaScript engine.
:::

You need to download and install the latest long-term support (LTS) release.

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

# Verify the Node.js version:
node -v # Should print "v24.14.1".
```

## pnpm

::: tip Tips
We recommend using pnpm as your package manager, because VitePress and VitePress Theme Niansi both use pnpm to manage dependencies.

Some features of pnpm ensure that you have the correct dependencies, and it can also speed up your installation.
:::
