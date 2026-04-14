---
title: Theme Config
categories:
  - Config
tags:
  - Theme Config
---

Theme configuration allows you to customize the theme. You can configure the theme by adding `themeConfig` to the configuration file:

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  title: 'Niansi',
  clearUrls: true,
  
  // themeConfig here
  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    // ...
  }
})
```

## New

### author <Badge text="New" type="important" />

- Type：`string`

The author name, displayed at the top of the article page.

### sidebarBgImage <Badge text="New" type="important" />

- Type：`string`

The background image of the sidebar.

### tagPath <Badge text="New" type="important" />

- Type：`string`
- Default：`/tags/`

The path to the tags page.

### categoryPath <Badge text="New" type="important" />

- Type：`string`
- Default：`/categories/`

The path to the categories page.

### archivesPath <Badge text="New" type="important" />

- Type：`string`
- Default：`/archives/`

The path to the archives page.

### recentlyUpdated <Badge text="New" type="important" />

- Type: `string`
- Default: `Recently Updated`

The text for "Recently Updated".

### trendingTags <Badge text="New" type="important" />

- Type: `string`
- Default: `Trending Tags`

The text for "Trending Tags".

### hamburgerHome <Badge text="New" type="important" />

- Type: `string`
- Default: `Home`

The "Home" text in the hamburger menu.

### postedMeta <Badge text="New" type="important" />

- Type: `string`
- Default: `Posted`

The text for the article's publish time.

### authorMeta <Badge text="New" type="important" />

- Type: `string`
- Default: `By`

The text for the article's author.

### readMeta <Badge text="New" type="important" />

- Type: `string`
- Default: `Read`

The text for the article's view count.

### categoriesMeta <Badge text="New" type="important" />

- Type: `string`
- Default: `post`

The text for the article's category.

### excerptLength <Badge text="New" type="important" />

- Type: `number`
- Default: `300`

The length of the article excerpt.

### commentPlugin <Badge text="New" type="important" />

- Type: `CommentPlugin`

The comment plugin configuration。See [Comment Plugin Config](./comment-plugin-config.md)。

## Removed

Removed VitePress default configurations

- `aside`
- `darkModeSwitchLabel`
- `carbonAds`
- `editLink`
- `lastUpdated`
- `sidebarMenuLabel`


