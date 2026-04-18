---
title: 常见问题
categories:
  - FAQ
---

## 开发模式下多语言切换失效

### 问题描述

在开发模式（`pnpm dev`）下，虚拟页面（Tags、Categories、Archives）的多语言切换功能无法正常工作。具体表现为：

- 切换语言后，页面内容不更新
- 页面显示 404 或内容停留在默认语言

### 问题原因

VitePress 的虚拟页面通过 Vite 插件实现。在开发模式下，Vite Dev Server 的路由处理与 VitePress 自身的路由系统存在交互问题：

1. Vite 插件的 `resolveId()` 和 `load()` hooks 在开发模式下的触发时机与 VitePress 路由系统不同步
2. 多语言路径前缀（如 `/zh/tags/`）在 `resolveId` 匹配时可能无法正确识别
3. `siteConfig.pages` 的修改在开发模式下可能不会立即生效

### 临时解决方案

1. **使用生产模式预览**：运行 `pnpm build` 构建后，使用 `pnpm preview` 预览生产版本，多语言切换功能正常
2. **避免在开发模式下测试多语言**：先在默认语言下完成功能开发，最后用生产模式验证多语言效果

### 相关文件

- `packages/theme/src/node/plugins/virtualTagPlugin.ts`
- `packages/theme/src/node/plugins/virtualCategoriesPlugin.ts`
- `packages/theme/src/node/plugins/virtualArchivesPlugin.ts`

::: tip
此问题仅影响开发模式。生产构建版本不受影响。
:::
