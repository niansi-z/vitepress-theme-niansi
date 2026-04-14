---
title: Project Content
categories:
  - Get Started
tags:
  - Project Content
---

This document outlines page generation, Markdown processing, and Frontmatter configuration in a VitePress project.

## Generating Pages

VitePress generates standalone pages from Markdown files. The route path corresponds to the file's relative path.

When generating a project via the CLI helper, you will see the following directory structure:

```text
└─ docs
   ├─ .vitepress
   │  ├─ theme
   │  │  ├─ index.ts
   │  │  ├─ style.css
   │  └─ config.ts
   ├─ post
   │  ├─ index.md
   │  ├─ page1.md
   ├─ about.md
   └─ index.md
```

Route path resolution:

| **Relative Path**         | **Route Path**           |
|------------------|--------------------|
| `/index.md`      | `/`                |
| `/post/index.md` | `/post/`           |
| `/post/page1.md` | `/post/page1.html` |

## Markdown Processing

VitePress Theme Niansi processes Markdown files into HTML. You can edit Markdown files to modify content,
and changes will sync in real time while the development server is running.

::: tip Tips
Refer to the [Markdown Tutorial](https://www.markdownlang.com/zh/) for basic syntax.
:::

## Frontmatter Configuration

Frontmatter assigns page-level configurations. It uses YAML format and must be placed at the top of the Markdown file, enclosed by triple dashes `(---)`.

```md
---
title: the title of the page
description: the description of the page
---

<!-- Here is Markdown Content -->

...
```

Frontmatter properties such as `title` and `description` will override the global configuration in [VitePress frontmatter](https://vitepress.dev/zh/guide/frontmatter)
This configuration only takes effect on the current page and has the highest priority.