---
title: FAQ
categories:
  - FAQ
---

## Multi-language Switching Fails in Dev Mode

### Problem Description

In development mode (`pnpm dev`), the multi-language switching feature for virtual pages (Tags, Categories, Archives) does not work properly. Specifically:

- Switching languages does not update the page content
- The page shows 404 or displays content in the default language

### Root Cause

Virtual pages in VitePress are implemented through Vite plugins. In development mode, there is an interaction issue between Vite Dev Server's routing and VitePress's own routing system:

1. Vite plugin hooks (`resolveId()` and `load()`) may not be triggered at the right time in sync with VitePress's routing system in dev mode
2. Multi-language path prefixes (like `/zh/tags/`) may not be correctly recognized in `resolveId` matching
3. Modifications to `siteConfig.pages` may not take effect immediately in development mode

### Temporary Solutions

1. **Use production mode preview**: Run `pnpm build` to build, then use `pnpm preview` to preview the production version - multi-language switching works correctly
2. **Avoid testing multi-language in dev mode**: Complete your development in the default language first, then verify multi-language effects in production mode

### Related Files

- `packages/theme/src/node/plugins/virtualTagPlugin.ts`
- `packages/theme/src/node/plugins/virtualCategoriesPlugin.ts`
- `packages/theme/src/node/plugins/virtualArchivesPlugin.ts`

::: tip
This issue only affects development mode. Production builds are not affected.
:::
