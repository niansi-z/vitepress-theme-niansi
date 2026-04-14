---
title: Code Tabs
categories:
  - Markdown
tags:
  - Markdown
  - Code Tabs
---

## Usage

Use code block groups in Markdown files:

#### Input

````md
::: code-group

```vue [demo.vue]
<template>
  <div>This is a Vue tab.</div>
</template>
```

```tsx [demo.tsx]
import React from 'react';

export default function App() {
  return <div>This is a React tab.</div>;
}
```

:::
````

#### Output

::: code-group

```vue [demo.vue]
<template>
  <div>This is a Vue tab.</div>
</template>
```

```tsx [demo.tsx]
import React from 'react';

export default function App() {
  return <div>This is a React tab.</div>;
}
```

:::
