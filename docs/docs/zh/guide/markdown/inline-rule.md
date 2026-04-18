---
title: Inline Rule
categories:
  - Markdown
tags:
  - Markdown
  - Inline Rule
---

统一的内联语法工厂工具函数，用于创建基于标点符号的自定义内联标签。

## 使用

```ts [.vitepress/config.ts] {6-10}
import { defineConfig, inlineRule } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(inlineRule, {
        marker: "~",
        tag: "sub",
        token: "sub",
      })
    }
  }
})
```

## 选项

### marker

- 类型：`string`
- 必填：是
- 详情：用作标记的标点符号字符（如 `~`、`=`）。

### tag

- 类型：`string`
- 必填：是
- 详情：渲染元素的 HTML 标签名称（如 `sub`、`mark`）。

### token

- 类型：`string`
- 必填：是
- 详情：用于 markdown-it 令牌标识的令牌类型名称（如 `sub`、`mark`）。

### nested

- 类型：`boolean`
- 默认值：`false`
- 详情：为 `false` 时使用高性能线形扫描，内部不解析内联标签（如 `sub`、`sup`）。为 `true` 时使用跟个符状态机和双标记，支持嵌套粗体、斜体等（如 `mark`、`spoiler`）。

### double

- 类型：`boolean`
- 默认值：`false`（非嵌套），强制 `true`（嵌套）
- 详情：标记是否必须成对出现（如 `!!` 而不是 `!`）。嵌套规则始终使用双标记。

### placement

- 类型：`"before-emphasis" | "after-emphasis"`
- 默认值：`"after-emphasis"`
- 详情：相对于核心 emphasis 规则的规则位置。使用 `"before-emphasis"` 可以覆盖相同标记字符的 emphasis 行为（如使用 `_` 作为自定义标签）。

### attrs

- 类型：`[attr: string, value: string][]`
- 详情：渲染元素的自定义 HTML 属性。

### allowSpace

- 类型：`boolean`
- 默认值：`false`
- 详情：是否允许内容中的未转义空格。仅适用于非嵌套规则。

## 示例

### 简单标签 (sup)

```ts
md.use(inlineRule, {
  marker: "^",
  tag: "sup",
  token: "sup",
});

// ^文本^ → <sup>文本</sup>
```

### 嵌套标签与属性 (spoiler)

```ts
md.use(inlineRule, {
  marker: "!",
  tag: "span",
  token: "spoiler",
  nested: true,
  placement: "before-emphasis",
  attrs: [["class", "spoiler"]],
});

// !!隐藏文本!! → <span class="spoiler">隐藏文本</span>
```

### 自定义语法

```ts
md.use(inlineRule, {
  marker: "?",
  tag: "span",
  token: "help",
  nested: true,
  placement: "before-emphasis",
  attrs: [["class", "help-text"]],
});

// ??帮助文本?? → <span class="help-text">帮助文本</span>
```
