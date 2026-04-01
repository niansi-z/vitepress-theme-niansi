---
title: 站点演示
outline: deep
tags:
  - demo
categories:
  - demo
---

[百度一下](https://www.baidu.com)

---

[内部链接](./api-examples.md)

::: info
This is an info box.

```javascript {1}
if (e.code === 'F4' || e.code === 'F5') {
  const now = Date.now()
  if (now - lastScanTime < DOUBLE_SCAN_INTERVAL) { // [!code ++]
    console.log('双击了') // [!code --]
    // setTimeout(() => {
    $('#field16275').focus() // [!code error]
    $('#field16275').select() // [!code warning]
    lastScanTime = 0
    // }, 50)
  } else {
    lastScanTime = now
  }
  e.preventDefault()
}
```
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

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。
> 
> When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
> 
> $$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$


> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

```javascript
if (e.code === 'F4' || e.code === 'F5') {
  const now = Date.now()
  if (now - lastScanTime < DOUBLE_SCAN_INTERVAL) { // [!code ++]
    console.log('双击了') // [!code --]
    // setTimeout(() => {
    $('#field16275').focus() // [!code error]
    $('#field16275').select() // [!code warning]
    lastScanTime = 0
    // }, 50)
  } else {
    lastScanTime = now
  }
  e.preventDefault()
}
```

::: code-group

```sh [npm]
$ npm add -D vitepress-theme-niansi@next
```

```sh [pnpm]
$ pnpm add -D vitepress-theme-niansi@next
```

```sh [yarn]
$ yarn add -D vitepress-theme-niansi@next
```

```sh [bun]
$ bun add -D vitepress-theme-niansi@next
```

:::
