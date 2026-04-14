---
title: 代码块
categories:
  - Markdown
tags:
  - Markdown
  - 代码块
---

## 高亮

VitePress 使用 [Shiki](https://github.com/shikijs/shiki) 在 Markdown 代码中使用彩色文本实现语法高亮。
Shiki 支持多种编程语言，需要做的就是将有效的语言别名附加到代码块的开头：

#### 输入

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

#### 输出

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

## 行号

可以在代码块添加 `line-numbers` / `no-line-numbers` 标记来覆盖配置项中的设置，还可以在 `:line-numbers` 之后添加 `=`
来自定义起始行号，例如：`:line-numbers=2` 表示代码块中的行号从 `2` 开始。

#### 输入

````
```ts :line-numbers
// 启用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// 禁用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// 行号已启用，并从 2 开始
const line3 = "This is line 3";
const line4 = "This is line 4";
```
````

#### 输出

```ts :line-numbers
// 启用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// 禁用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// 行号已启用，并从 2 开始
const line3 = "This is line 3";
const line4 = "This is line 4";
```

## 行高亮

可以在代码块的信息描述中添加行数标记来高亮指定的行：

- 行数范围：`{5-8}`
- 多个单行：`{4,7,9}`
- 组合：`{4,7-13,16,23,27,40}`

#### 输入

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
      message: `使用 <a href="https://github.com/niansi-z/vitepress-theme-niansi">VitePress Theme Niansi</a> 主题`,
      copyright: '版权所有 © 2024 廿四。'
    }
  }
});
```
````

#### 输出


```ts {1,7-9}
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  title: "你好， VitePress",

  themeConfig: {
    author: '廿四',
    logo: '/niansi-logo.svg',
    sidebarBgImage: '/bg.png',
    footer: {
      message: `使用 <a href="https://github.com/niansi-z/vitepress-theme-niansi">VitePress Theme Niansi</a> 主题`,
      copyright: '版权所有 © 2024 廿四。'
    }
  }
});
```

## 高亮标记

#### 输入

````
```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```
````

#### 输出

```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```

## 代码块标题

在代码块 ` ``` ` 后面添加 `[标题]` 来设置标题。

#### 输入

````
```ts [foo/baz.js]
console.log("hello");
```
````

#### 输出

```ts [foo/baz.js]
console.log("hello");
```

#### 差异标记

在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

#### 输入

````
```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```
````

#### 输出

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

## 聚焦标记

#### 输入

````
```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```
````

#### 输出

```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```

## 错误级别标记

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

#### 输入

````
```ts
console.log("No errors or warnings");
console.warn("Warning"); // [!code warning]
console.error("Error"); // [!code error]
```
````

#### 输出

```ts
console.log("No errors or warnings");
console.warn("Warning"); // [!code warning]
console.error("Error"); // [!code error]
```
