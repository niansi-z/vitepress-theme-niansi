---
title: Project Structure
categories:
  - Get Started
tags:
  - Project Structure
---

This tutorial introduces VitePress project structure.

## VitePress Project Structure

The VitePress project structure is as follows:

```text
.
├── docs → docs folder
│   ├── .vitepress → config folder
│   │   ├── dist → build output directory
│   │   ├── theme
│   │   │   ├── index.ts → Theme entry for inheritance
│   │   │   └── style.css → Theme inheritance styles
│   │   └── config.ts → the entry file of the configuration
│   ├── public → static resource directory
│   ├── ... → Other project documentation
│   └── index.md → Project Homepage
└── package.json → Nodejs configuration file
```
