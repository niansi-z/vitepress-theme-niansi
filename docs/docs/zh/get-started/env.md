---
title: 运行环境设置
categories:
  - 快速上手
tags:
  - 运行环境
---

本教程将指导你如何搭建 VitePress 的运行环境。

## 编辑器

你需要一个代码编辑器来编辑你的项目，推荐使用 VS Code 来编写和运行你的 VitePress 项目。

以 MacOS 为例，以下是安装 VS Code 的步骤：

1. 下载 [Visual Studio Code](https://code.visualstudio.com/)。
2. 打开下载的文件.dmg。
3. 拖拽到**应用程序**文件夹Visual Studio Code.app。
4. 通过双击图标，从**应用程序**文件夹中打开VS Code。
5. 推荐安装简体中文扩展以保证界面语言为简体中文。

## Node.js

::: info 介绍
[Node.js](https://nodejs.org/zh-cn/) 是一个基于 [Chrome V8](https://v8.dev/) 引擎 的 JavaScript 运行时环境。
:::

需要下载并安装最新的长期支持版（LTS）。

```bash
# 下载并安装 nvm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# 代替重启 shell
\. "$HOME/.nvm/nvm.sh"

# 下载并安装 Node.js：
nvm install 24

# 验证 Node.js 版本：
node -v # Should print "v24.14.1".
```

## pnpm

::: tip 提示
推荐使用 pnpm 作为项目管理器，因为 VitePress 和 VitePress Theme Niansi 都是通过 pnpm 来管理依赖的。

pnpm 的一些功能可以保证你拥有正确的依赖，并且它能加速安装。
:::
