---
title: 主题配置
categories:
  - 配置
tags:
  - 主题配置
---

主题配置可以让你能够自定义主题。可以通过将 `themeConfig` 添加到配置文件来进行主题配置：

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  title: 'Niansi',
  clearUrls: true,
  
  // 主题相关配置
  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    // ...
  }
})
```

## 新增

### author <Badge text="新增" type="important" />

- 类型：`string`

作者名称，显示在文章页面顶部。

### sidebarBgImage <Badge text="新增" type="important" />

- 类型：`string`

侧边栏背景图片。

### tagPath <Badge text="新增" type="important" />

- 类型：`string`
- 默认值：`/tags/`

标签页路径。

### categoryPath <Badge text="新增" type="important" />

- 类型：`string`
- 默认值：`/categories/`

分类页路径。

### archivesPath <Badge text="新增" type="important" />

- 类型：`string`
- 默认值：`/archives/`

归档页路径。

### recentlyUpdated <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `Recently Updated`

最近更新文本。

### trendingTags <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `Trending Tags`

热门标签文本。

### hamburgerHome <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `Home`

汉堡菜单中的主页文本。

### postedMeta <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `Posted`

文章发布时间文本。

### authorMeta <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `By`

文章来源文本。

### readMeta <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `Read`

文章阅读量文本。

### categoriesMeta <Badge text="新增" type="important" />

- 类型: `string`
- 默认值: `post`

文章分类文本。

### excerptLength <Badge text="新增" type="important" />

- 类型: `number`
- 默认值: `300`

文章摘要长度。

### commentPlugin <Badge text="新增" type="important" />

- 类型: `CommentPlugin`

评论插件配置。详见 [评论插件配置](./comment-plugin-config.md)。

## 移除

移除 VitePress 默认配置

- `aside`
- `darkModeSwitchLabel`
- `carbonAds`
- `editLink`
- `lastUpdated`
- `sidebarMenuLabel`


