---
title: Comment Plugin Config
categories:
  - Config
tags:
  - Theme Config
  - Comment
---

This theme supports comment functionality. Pass `commentPlugin` from the theme options as a configuration item.

Three comment services are currently supported:

- Waline
- Giscus
- Twikoo

> [!NOTE]
> If you do not need the comment feature, please ignore this option.

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
