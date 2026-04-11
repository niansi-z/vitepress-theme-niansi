---
title: 评论配置
tags:
  - guide
categories:
  - guide
---

VitePress-Theme-Niansi 内置了评论系统支持，目前支持 [Waline](https://waline.js.org/)、[Giscus](https://giscus.app/) 和 [Twikoo](https://twikoo.js.org/) 三种评论服务。

<!-- more -->

## 配置方式

在 `.vitepress/config.mts` 的 `themeConfig` 中添加 `commentPlugin` 配置项即可启用评论。三种评论服务**三选一**，不配置则不启用评论功能。

## Waline

[Waline](https://waline.js.org/) 是一款简洁、安全的评论系统，支持完整的 Markdown 语法、邮件通知、表情包等功能。

### 安装依赖

::: code-group

```sh [npm]
$ npm add -D @waline/client
```

```sh [pnpm]
$ pnpm add -D @waline/client
```

:::

### 配置

```ts
export default defineConfig({
  themeConfig: {
    commentPlugin: {
      provider: 'Waline',
      options: {
        serverURL: 'https://your-waline-server.com'
      }
    }
  }
})
```

### 配置项

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|:----:|------|
| `serverURL` | `string` | 是 | Waline 后端服务地址 |

除上述必填项外，`options` 支持传入 Waline 的所有 [客户端配置](https://waline.js.org/reference/client/props.html)（如 `lang`、`dark`、`wordLimit`、`reaction` 等）。

::: tip
主题已内置 `dark: '.dark'` 配置，Waline 会自动跟随 VitePress 的亮/暗模式切换。
:::

### 部署后端

你需要先部署一个 Waline 后端服务，详见 [Waline 部署文档](https://waline.js.org/guide/deploy/)。

---

## Giscus

[Giscus](https://giscus.app/) 是一个基于 GitHub Discussions 的评论系统，无需额外部署后端。

### 前提条件

1. GitHub 仓库必须是 **公开** 的
2. 仓库已安装 [giscus app](https://github.com/apps/giscus)
3. 仓库已开启 **Discussions** 功能（Settings → Features → Discussions）

### 获取配置

前往 [giscus.app](https://giscus.app/zh-CN)，输入你的仓库地址，选择 Discussion 分类，页面会自动生成所需的配置值。

### 配置

```ts
export default defineConfig({
  themeConfig: {
    commentPlugin: {
      provider: 'Giscus',
      options: {
        repo: 'owner/repo',
        repoId: 'R_xxx',
        category: 'Announcements',
        categoryId: 'DIC_xxx'
      }
    }
  }
})
```

### 配置项

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|:----:|------|
| `repo` | `string` | 是 | GitHub 仓库，格式 `owner/repo` |
| `repoId` | `string` | 是 | 仓库 ID，从 giscus.app 获取 |
| `category` | `string` | 是 | Discussion 分类名称 |
| `categoryId` | `string` | 是 | 分类 ID，从 giscus.app 获取 |

除上述必填项外，`options` 还支持 `mapping`、`strict`、`reactionsEnabled`、`inputPosition`、`lang`、`loading` 等配置，默认值已针对常见场景优化。

::: tip
Giscus 会自动跟随 VitePress 的亮/暗模式实时切换主题。
:::

---

## Twikoo

[Twikoo](https://twikoo.js.org/) 是一个简洁、安全、免费的静态网站评论系统，支持多种部署方式。

### 安装依赖

::: code-group

```sh [npm]
$ npm add -D twikoo
```

```sh [pnpm]
$ pnpm add -D twikoo
```

:::

### 配置

```ts
export default defineConfig({
  themeConfig: {
    commentPlugin: {
      provider: 'Twikoo',
      options: {
        envId: 'https://your-twikoo.example.com'
      }
    }
  }
})
```

### 配置项

| 配置项 | 类型 | 必填 | 说明 |
|--------|------|:----:|------|
| `envId` | `string` | 是 | Twikoo 后端服务地址或腾讯云环境 ID |

除上述必填项外，`options` 支持传入 Twikoo 的所有初始化配置。

### 部署后端

Twikoo 支持多种部署方式：

| 部署方式 | envId 示例 |
|---------|-----------|
| Vercel | `https://your-twikoo.vercel.app` |
| Cloudflare Workers | `https://your-twikoo.workers.dev` |
| 腾讯云开发 | 云开发环境 ID |
| 自建服务器 | `https://your-domain.com` |

详见 [Twikoo 后端部署文档](https://twikoo.js.org/backend.html)。

---
