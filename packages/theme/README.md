<h1 align="center">VitePress Theme Niansi</h1>  

<p align="center">一个基于 VitePress 的博客主题，提供丰富的功能和美观的界面设计。</p>

<p align="center">
  <a href="https://theme.niansi.com.cn">中文文档</a>
  |
  <a href="https://theme.niansi.com.cn/en/">English Docs</a>
</p>

## 特性

- **博客支持** - 分类、标签、归档、摘要生成
- **多语言** - 开箱即用的国际化支持
- **代码增强** - 行号、行高亮、diff、错误提示
- **提示容器** - info、tip、warning、danger、details
- **页面元数据** - 作者、日期、阅读时间
- **评论功能** - 支持多种评论插件
- **最小化配置** - 零配置开箱即用

## 安装

```bash
pnpm add -D vitepress-theme-niansi vitepress@next
```

## 快速开始

```bash
pnpm vitepress-theme-niansi init
```

## 配置示例

```ts
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  title: 'My Blog',
  clearUrls: true,

  themeConfig: {
    author: 'Your Name',
    logo: '/logo.svg',
    tagPath: '/tags/',
    categoryPath: '/categories/',
    archivesPath: '/archives/',
  }
})
```

## License

[MIT](./LICENSE)
