---
title: Inline Rule
categories:
  - Markdown
tags:
  - Markdown
  - Inline Rule
---

A unified inline syntax factory plugin for creating custom punctuation-based inline tags.

## Usage

```ts [.vitepress/config.ts]
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

## Options

### marker

- Type: `string`
- Required: Yes
- Details: The punctuation character used as the marker (e.g., `~`, `=`).

### tag

- Type: `string`
- Required: Yes
- Details: HTML tag name for the rendered element (e.g., `sub`, `mark`).

### token

- Type: `string`
- Required: Yes
- Details: Token type name used for markdown-it token identification (e.g., `sup`, `mark`).

### nested

- Type: `boolean`
- Default: `false`
- Details: When `false`, uses a high-performance linear scan. No inline tags are parsed inside (e.g., `sub`、`sup`).
When `true`, uses the delimiter state machine with double markers. Supports nested bold, italic, etc. (e.g., `mark`、`spoiler`).

### double

- Type: `boolean`
- Default: `false` (non-nested), forced `true` (nested)
- Details: 

### placement

- Type: `"before-emphasis" | "after-emphasis"`
- Default: `"after-emphasis"`
- Details: Ruler position relative to the core emphasis rule. Use `"before-emphasis"` to override emphasis behavior for the same marker character (e.g., using `_` as a custom tag).

### attrs

- Type: `[attr: string, value: string][]`
- Details: Custom HTML attributes for the rendered element.

### allowSpace

- Type: `boolean`
- Default: `false`
- Details: Whether to allow unescaped spaces inside the content. Only applies to non-nested rules.

## Examples

### Simple tag (sup)

```ts
md.use(inlineRule, {
  marker: "^",
  tag: "sup",
  token: "sup",
});

// ^text^ → <sup>text</sup>
```

### Nested tag with attributes (spoiler)

```ts
md.use(inlineRule, {
  marker: "!",
  tag: "span",
  token: "spoiler",
  nested: true,
  placement: "before-emphasis",
  attrs: [["class", "spoiler"]],
});

// !!hidden text!! → <span class="spoiler">hidden text</span>
```

### Custom syntax

```ts
md.use(inlineRule, {
  marker: "?",
  tag: "span",
  token: "help",
  nested: true,
  placement: "before-emphasis",
  attrs: [["class", "help-text"]],
});

// ??help text?? → <span class="help-text">help text</span>
```
