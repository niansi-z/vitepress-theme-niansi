<h1 align="center">VitePress Theme Niansi</h1>  

<p align="center">一个基于 VitePress 的博客主题，提供丰富的功能和美观的界面设计。</p>

<p align="center">
  <a href="https://theme.niansi.com.cn">中文文档</a>
  |
  <a href="https://theme.niansi.com.cn/en/">English Docs</a>
</p>

<p align="center">
<a href="https://blog.niansi.com.cn">
  <img src="https://img.shields.io/badge/Author-%E5%BB%BF%E5%9B%9B-black?style=flat-square" />
</a>
<a href="https://vitepress.dev/">
  <img src="https://img.shields.io/badge/VitePress-Theme-blue?style=flat-square&logo=vite" />
</a>
<a href="https://github.com/niansi-z/vitepress-theme-niansi/blob/main/packages/theme/LICENSE">
  <img src="https://img.shields.io/npm/l/vitepress-theme-niansi?style=flat-square" />
</a>
<a href="https://www.npmjs.com/package/vitepress-theme-niansi">
  <img src="https://img.shields.io/npm/v/vitepress-theme-niansi.svg?style=flat-square&logo=npm" />
</a>
<a href="https://nodejs.org/">
  <img src="https://img.shields.io/badge/Node-%3E%3D20-339933?style=flat-square&logo=node.js&logoColor=white" />
</a>

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

## 本地开发

```bash
# 克隆项目
git clone https://github.com/niansi-z/vitepress-theme-niansi.git

# 安装依赖
pnpm install

# 运行主题开发
pnpm theme:dev
```

## License

[MIT](./packages/theme/LICENSE)
