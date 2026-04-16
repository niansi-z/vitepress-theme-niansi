---
title: 数学公式
categories:
  - Markdown
tags:
  - Markdown
  - 数学公式
---

让你的 VitePress 站点中的 Markdown 文件支持 $\TeX$ 语法。

## 配置

在项目中安装相关的 $\TeX$ 包 [markdown-it-mathjax3](https://www.npmjs.com/package/markdown-it-mathjax3):

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

之后启用它：

```ts [.vitepress/config.ts] {5}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    math: true,
  }
})
```

## 案例

#### 输入

```md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
```

#### 输出

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
