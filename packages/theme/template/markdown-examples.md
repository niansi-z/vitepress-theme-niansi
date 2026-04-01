---
title: Markdown Examples
---

## Title

# This is a heading 1

## this is a heading 2

### this is a heading 3

#### this is a heading 4

##### this is a heading 5

###### this is a heading 6

## Frontmatter

```yaml
layout: doc
title: My Blog Post
date: 2024-06-01
lastUpdated: 2024-06-15
author: John Doe
tags:
  - markdown
  - example
  - frontmatter
categories:
  - programming
  - documentation
excerpt: This is a brief summary of the blog post content.
```

## Links

[Google](https://www.google.com)

[About](./about.md)

## Lists

- Item 1
- Item 2
    - Subitem 2.1
    - Subitem 2.2
- Item 3

1. First
2. Second
3. Third

## Code Blocks

```javascript
function greet() {
  return `Hello!`;
}
```

```python
def greet():
    return f"Hello!"
```

## Custom Containers

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### Custom Title

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

### GitHub-flavored Alerts

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

## Code Groups

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

## Table

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
