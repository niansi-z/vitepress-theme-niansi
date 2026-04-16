---
title: 上下角标
categories:
  - Markdown
tags:
  - Markdown
  - 上下角标
---

让你的 VitePress 站点中的 Markdown 文件支持上下角标。

## 设置

```ts [.vitepress/config.ts] {7,9}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      // 启用下角标
      sub: true,
      // 启用上角标
      sup: true
    }
  }
})
```

## 语法

- 使用 `^ ^` 进行上角标标注。
- 使用 `~ ~` 进行下角标标注。

## 案例

#### 输入

```md
19^th^

H~2~O
```

#### 输出

19^th^

H~2~O

::: tip 提示
你可以使用 `\` 来转义 `^` 和 `~`:

H\~2~O 19\^th^
:::
