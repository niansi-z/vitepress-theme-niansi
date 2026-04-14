---
title: 评论插件配置
categories:
  - 配置
tags:
  - 主题配置
  - 评论
---

主题提供评论支持，将主题选项中的 `commentPlugin` 作为选项传递。

目前支持 3 种评论服务：

- Waline
- Giscus
- Twikoo

> [!NOTE]
> 如果不需要评论功能，请忽略此项。

## Waline

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  themeConfig: {
    commentPlugin: {
      provider: 'Waline',
      options: {
        serverURL: 'https://your-waline-server.com'
      }
    }
  }
})
```

## Giscus

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  themeConfig: {
    commentPlugin: {
      provider: 'Giscus',
      options: {
        repo: 'your-github-repo',
        repoId: 'your-github-repo-id',
        category: 'your-github-discussion-category',
        categoryId: 'your-github-discussion-category-id'
      }
    }
  }
})
```

## Twikoo

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  themeConfig: {
    commentPlugin: {
      provider: 'Twikoo',
      options: {
        envId: 'your-twikoo-env-id'
      }
    }
  }
})
```
