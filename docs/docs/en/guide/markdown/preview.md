---
title: Preview
categories:
  - Markdown
tags:
  - Markdown
  - Preview
---

The theme provides you preview support.

## Settings

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

## Usage

You can use a `preview` container to display a piece of content and it's source code.

If the displayed code differs from the source code of content, you can also use `<Preview>` component with its `code` and `content` slots.

## Demo

::::preview
::: preview Optional title

Some content here.

:::

<Preview>

<template #code>

```js
document.innerHTML = "Hello, world!";
```

</template>
<template #content>

Hello, world!

</template>

</Preview>
::::
