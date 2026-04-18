---
title: 预览
categories:
  - Markdown
tags:
  - Markdown
  - 预览
---

主题为你提供预览支持。

## 配置

```ts [.vitepress/config.ts] {6}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      preview: true
    }
  }
})
```

## 使用

你可以使用 `preview` 容器来显示一段内容及其源代码。

如果显示的代码于内容的源代码不同，你也可以使用 `<Preview>` 组件及其 `code` 和 `content` 插槽。

## 案例

::::preview
::: preview 可选标题

这里是一些内容。

:::

<Preview>

<template #code>

```js
document.innerHTML = "你好，世界！";
```

</template>
<template #content>

你好，世界！

</template>

</Preview>
::::
