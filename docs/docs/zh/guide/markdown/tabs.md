---
title: 代码块分组
categories:
  - Markdown
tags:
  - Markdown
  - 代码块分组
---

## 用法

在 Markdown 文件中使用代码块分组：

::::preview
::: code-group

```vue [demo.vue]
<template>
  <div>这是一个 Vue 选项卡</div>
</template>
```

```tsx [demo.tsx]
import React from 'react';

export default function App() {
  return <div>这是一个 React 选项卡</div>;
}
```

:::
::::
