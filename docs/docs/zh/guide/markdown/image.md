---
title: 图片
categories:
  - Markdown
tags:
  - Markdown
  - 图片
---

让你的 VitePress 站点中的图片支持尺寸标注、懒加载、图片包裹等功能。

## 配置

:::code-group

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    // 懒加载（可选）
    image: {
      lazyLoading: true
    },
    plugins: {
      // 开启图片插件
      image: true
      // 或传入配置项
      // image: { lazyLoading: true, focusable: false, linkImage: false }
    }
  }
})
```

:::

### 配置项

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `lazyLoading` | `boolean` | `false` | 原生懒加载 |
| `focusable` | `boolean` | `true` | 图片可聚焦（添加 `tabindex="0"`） |
| `linkImage` | `boolean` | `true` | 链接图片 `[![alt](url)](link)` 也转换为 figure |

### 懒加载优先级

`markdown.image.lazyLoading` 的优先级高于 `markdown.plugins.image.lazyLoading`。

```ts
// 开启插件，但懒加载由 markdown.image.lazyLoading 决定
markdown: {
  image: { lazyLoading: true },
  plugins: { image: true }
}
```

## 语法

### 图片尺寸

使用 `alt =宽度 x 高度` 语法为图片指定尺寸。

#### 输入

```md
![替代文字 =200x300](/example.png)

![替代文字 =200x](/example.png "标题")

![替代文字 =x300](/example.png)
```

#### 输出

![替代文字 =200x300](/example.png)

![替代文字 =200x](/example.png "标题")

![替代文字 =x300](/example.png)

### Figure 包裹

独立的图片会自动转换为 `<figure>` 元素，`alt` 或 `title` 作为 `<figcaption>` 内容。

#### 输入

```md
![替代文字 =200x300](/example.png)
```

#### 输出

```html
<figure>
  <img src="/example.png" alt="替代文字" width="200" height="300" tabindex="0" />
  <figcaption>替代文字</figcaption>
</figure>
```

### 带标题的图片

使用 `![alt](url "标题")` 语法，标题会作为 `<figcaption>` 内容。

#### 输入

```md
![图片说明 =300x200](/example.png "这是一张示例图片")
```

#### 输出

```html
<figure>
  <img src="/example.png" alt="图片说明" width="300" height="200" tabindex="0" title="这是一张示例图片" />
  <figcaption>这是一张示例图片</figcaption>
</figure>
```
