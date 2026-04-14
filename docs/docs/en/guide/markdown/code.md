---
title: Code Block
categories:
  - Markdown
tags:
  - Markdown
  - Code Block
---

## Highlight

VitePress uses [Shiki](https://github.com/shikijs/shiki) to achieve syntax highlighting with colored text in Markdown code blocks.
Shiki supports many programming languages—all you need to do is append a valid language alias to the beginning of the code block:

#### Input

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

#### Output

```js
export default {
  name: 'MyComponent',
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

## Line Numbers

You can add the `line-numbers` / `no-line-numbers` markers to a code block to override the settings in the configuration.
You may also add `=` after `:line-numbers` to customize the starting line number. For example:
`:line-numbers=2` means the line numbers in the code block start from `2`.

#### Input

````
```ts :line-numbers
// line-numbers is enabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// line-numbers is disabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// line-numbers is enabled and start from 2
const line3 = "This is line 3";
const line4 = "This is line 4";
```
````

#### Output

```ts :line-numbers
// line-numbers is enabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// line-numbers is disabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// line-numbers is enabled and start from 2
const line3 = "This is line 3";
const line4 = "This is line 4";
```

## Highlight Lines

You can add line number markers in the code block’s info string to highlight specific lines:

- 行数范围：`{5-8}`
- 多个单行：`{4,7,9}`
- 组合：`{4,7-13,16,23,27,40}`

#### Input

````
```ts {1,7-9}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  title: "你好， VitePress",

  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    sidebarBgImage: '/bg.png',
    footer: {
      message: `Theme by <a href="https://github.com/niansi-z/vitepress-theme-niansi">VitePress Theme Niansi</a>`,
      copyright: 'Copyright © 2024 廿四。'
    }
  }
});
```
````

#### Output


```ts {1,7-9}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  title: "你好， VitePress",

  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    sidebarBgImage: '/bg.png',
    footer: {
      message: `Theme by <a href="https://github.com/niansi-z/vitepress-theme-niansi">VitePress Theme Niansi</a>`,
      copyright: 'Copyright © 2024 廿四。'
    }
  }
});
```

## Notation Highlight

#### Input

````
```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```
````

#### Output

```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```

## Code Block Title

Add `[Title]` after the code block ` ``` ` to set the title.

#### Input

````
```ts [foo/baz.js]
console.log("hello");
```
````

#### Output

```ts [foo/baz.js]
console.log("hello");
```

#### Notation Diff

Adding the `// [!code --]` or `// [!code ++]` comments on a line will create a diff of that line, while keeping the colors of the codeblock.

#### Input

````
```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```
````

#### Output

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

## Notation Focus

#### Input

````
```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```
````

#### Output

```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```

## Notation Error Level

Adding the `// [!code warning]` or `// [!code error]` comments on a line will color it accordingly.

#### Input

````
```ts
console.log("No errors or warnings");
console.warn("Warning"); // [!code warning]
console.error("Error"); // [!code error]
```
````

#### Output

```ts
console.log("No errors or warnings");
console.warn("Warning"); // [!code warning]
console.error("Error"); // [!code error]
```
