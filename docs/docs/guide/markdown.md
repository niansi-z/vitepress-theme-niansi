---
title: Markdown 扩展
tags:
  - guide
  - markdown
categories:
  - guide
  - markdown
outline: [2, 3]
---

VitePress-Theme-Niansi 对 Markdown 进行了一些样式优化，语法和 VitePress 完全相同，后续会扩展一些 Markdown 语法，敬请期待。

<!-- more -->

## frontmatter

```yaml
---
layout: doc
title: This is a title
author: Niansi
date: 2024-06-01
lastUpdated: 2024-06-01
tags:
  - tag1
  - tag2
categories:
  - category1
  - category2
excerpt: This is an excerpt.
---
```

#### layout

- 类型: `doc | home | page`
- 默认值: `doc`

- `doc`: 适用于文档页面，包含侧边栏和目录。
- `home`: 适用于主页，包含侧边栏和目录。
- `page`: 类似于 `doc`，适用于独立页面。

#### title

- 类型: `string`

页面标题。

#### author

- 类型: `string`

文章作者。默认使用 `frontmatter.author`，如果未设置，则使用 `themeConfig.author`。

#### date

- 类型: `string` | `number` | `Date`

建议 time 以标准格式输入日期，即 yyyy-mm-dd 的形式，如 “2026 年 4 月 1 日” 应当输入为 2026-04-01

::: tip
在基于 Git 的项目中运行时，写作日期将默认使用当前文件的首次提交日期。
:::

#### lastUpdated

- 类型: `string` | `number` | `Date`

建议 time 以标准格式输入日期，即 yyyy-mm-dd 的形式，如 “2026 年 4 月 1 日” 应当输入为 2026-04-01

::: tip
在基于 Git 的项目中运行时，更新日期将默认使用当前文件的最后修改日期。
:::

#### tags & categories

- 类型: `string | string[]`

为文章配置分类与标签，使它们出现在特定的分类与标签页面中。

#### excerpt

- 类型: `string`

默认文章摘要，通常用于在列表页中显示文章简介。

::: tip 添加摘要
在 Markdown 文件中使用 `<!-- more -->` 注释可以标记摘要。该标记之前所有内容会被提取为文章摘要。
:::

::: tip 自动生成
主题默认会自动提取文章摘要。

如需禁用请在主题选项中设置 `excerptLength: 0`
:::

## Table

### 输入

```
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

### 输出

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## TOC

### 输入

```
[[toc]]
```

### 输出

[[toc]]

## 提示容器

### 默认标题

#### 输入

```
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
```

#### 输出

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

### 自定义标题

#### 输入

````md
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::
````

#### 输出

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

## GitHub 语法提示容器

VitePress 同样支持以标注的方式渲染 GitHub 风格的警报。它们和自定义容器的渲染方式相同。

### 输入

```
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```

### 输出

> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。



请查看[VitePress Markdown Extensions](https://vitepress.dev/guide/markdown)：来获取完整的文档内容。
