---
title: Theme Config
tags:
  - Theme Config
categories:
  - Theme Config
---

## 主题配置

基于 VitePress 移除了 VitePress 的一些主题配置选项，保留了必要的选项，添加一些新的选项。

### 移除的配置选项 {#removed-config-keys}

```
type RemovedConfigKeys =
  | 'sidebar'
  | 'aside'
  | 'darkModeSwitchLabel'
  | 'carbonAds'
  | 'editLink'
  | 'lastUpdated'
  | 'sidebarMenuLabel'
  | 'langMenuLabel'
```

### 新增的配置选项 {#added-config-keys}

#### sidebarBgImage

- 类型: `string`

侧边栏背景图片，支持本地图片和网络图片。

#### tagPath

- 类型: `string`
- 默认值: `/tags/`

标签页路径，默认为 `/tags/`，可通过修改 `tagPath` 来更改标签页的路径。

#### categoryPath

- 类型: `string`
- 默认值: `/categories/`

分类页路径，默认为 `/categories/`，可通过修改 `categoryPath` 来更改分类页的路径。

#### archivesPath

- 类型: `string`
- 默认值: `/archives/`

归档页路径，默认为 `/archives/`，可通过修改 `archivesPath` 来更改归档页的路径。

#### recentlyUpdated

- 类型: `string`
- 默认值: `Recently Updated`

右侧边栏最近更新标题。

#### trendingTags

- 类型: `string`
- 默认值: `Trending Tags`

右侧边栏热门标签标题。

#### hamburgerHome

- 类型: `string`
- 默认值: `Home`

汉堡菜单主页链接文本。

#### postedMeta

- 类型: `string`
- 默认值: `Posted`

文章发布时间前的文本。

#### authorMeta

- 类型: `string`
- 默认值: `By`

文章作者前的文本。

#### readMeta

- 类型: `string`
- 默认值: `Read`

文章阅读时间后的文本。

#### categoriesMeta

- 类型: `string`
- 默认值: `post`

分类页面 `/categories/` 中每个分类下文章数量后的文本。

#### excerptLength

- 类型: `number`
- 默认值: `300`

参考 [Markdown 扩展 excerpt](./guide/markdown.md#excerpt)

::: tip
其他内容情参考 [VitePress 官方文档](https://vitepress.dev/reference/default-theme-config)。
:::
