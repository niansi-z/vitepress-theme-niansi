---
title: 任务列表
categories:
  - Markdown
tags:
  - Markdown
  - 任务列表
---

让你的 VitePress 站点中的 Markdown 文件支持任务列表。

## 设置

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    plugins: {
      tasklist: true
    }
  }
})
```

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

## 案例

#### 输入

```md
- [ ] 计划A
- [x] 计划B
- [X] 计划C
```

#### 输出

- [ ] 计划A
- [x] 计划B
- [X] 计划C
