# [1.0.0-alpha.3](https://github.com/niansi-z/vitepress-theme-niansi/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2026-04-16)

### Bug Fixes

- **styles:** improve ns-doc styles ([75d16b0](https://github.com/niansi-z/vitepress-theme-niansi/commit/75d16b0a8b12107e69b502604310d63ed16b5196))

### Features

- **image:** add img-size and figure support ([a047cb9](https://github.com/niansi-z/vitepress-theme-niansi/commit/a047cb9312c76fcf07c4e28d9133f3a11da41df8))
- **markdown:** add inline rule plugins (sub, sup, mark, spoiler) ([baad104](https://github.com/niansi-z/vitepress-theme-niansi/commit/baad10406e38b2c83d272e242751662a3a925bb5))
- **markdown:** add markdown plugin infrastructure ([a3a2e91](https://github.com/niansi-z/vitepress-theme-niansi/commit/a3a2e9154b88391c5be58af8a795d2ce9852e3a5))
- **template:** add examples index page and update example files ([7ed6306](https://github.com/niansi-z/vitepress-theme-niansi/commit/7ed63069bd25b82a50e045ada53b71d69ec2c2d0))
- **types:** add markdown plugins type definitions ([0117081](https://github.com/niansi-z/vitepress-theme-niansi/commit/0117081edf82191839a628c6e3caab3c3c2c6ab7))

# [1.0.0-alpha.2](https://github.com/niansi-z/vitepress-theme-niansi/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2026-04-14)

### Bug Fixes

- **lockfile:** update pnpm-lock.yaml for peer dependencies ([4463a8e](https://github.com/niansi-z/vitepress-theme-niansi/commit/4463a8e553b0a35dd08123704e2f4e87cfbbabd2))

# [1.0.0-alpha.1](https://github.com/niansi-z/vitepress-theme-niansi/compare/v0.0.12...v1.0.0-alpha.1) (2026-04-14)

### Bug Fixes

- **i18n:** support multi-locale virtual pages for tags, categories, and archives ([38f7824](https://github.com/niansi-z/vitepress-theme-niansi/commit/38f782429949a02e9d060a63fe447ebd7db7ef25))
- **i18n:** unify tag and category URL generation with locale support ([45b469a](https://github.com/niansi-z/vitepress-theme-niansi/commit/45b469a1ba7edb32578bdf520460d7d59a060f40))
- **NSTocBar:** move click event to parent container ([07efb49](https://github.com/niansi-z/vitepress-theme-niansi/commit/07efb4909320783ed4b939885b966962361e913b))
- **sidebar:** adjust description display in NSSidebarTitle.vue ([952b4eb](https://github.com/niansi-z/vitepress-theme-niansi/commit/952b4ebf493968829299716ad15c8a7c6ab48c15))
- **sidebar:** correct back button redirect to current locale root ([419323a](https://github.com/niansi-z/vitepress-theme-niansi/commit/419323ac38245296a37900446bf154aa03c80f59))
- **styles:** add border and padding to doc header in NSDoc.vue ([0351cce](https://github.com/niansi-z/vitepress-theme-niansi/commit/0351cce3cbcc9fb7396a24dc4202833222fa1fea))
- **styles:** add bottom border and padding to ns-doc h2 headings ([3cd26e3](https://github.com/niansi-z/vitepress-theme-niansi/commit/3cd26e3aba9c62e71b39a191de4276e308c6c35a))
- **styles:** correct vp-code-block-title-bar in ns-code.css ([1655945](https://github.com/niansi-z/vitepress-theme-niansi/commit/165594561077da70b298d2e5e1649edcc193a4df))
- **styles:** fix code-group horizontal margin on mobile ([68e506d](https://github.com/niansi-z/vitepress-theme-niansi/commit/68e506db44e6c414ad26d63f1c032726689f9f8c))
- **styles:** improve NSArticle card hover effect and add animated underline to title ([872cf7b](https://github.com/niansi-z/vitepress-theme-niansi/commit/872cf7bd91fd67af610accf0c49fec14f2cfe302))
- **theme:** only show doc updated meta when lastUpdated is enabled ([64efec7](https://github.com/niansi-z/vitepress-theme-niansi/commit/64efec7960f8632d7d660f8176f57b0c7fc37bfe))
- **theme:** refine comment components and minor component tweaks ([d9573e6](https://github.com/niansi-z/vitepress-theme-niansi/commit/d9573e6628d4686957fc8d38d95234328d17ba66))
- **theme:** separate posted/updated date display and respect lastUpdated config ([a2571ca](https://github.com/niansi-z/vitepress-theme-niansi/commit/a2571ca7532758e63dd0d7a6b7eb456803126f31))
- **types:** restore author type in niansi-theme.d.ts ([bad1f25](https://github.com/niansi-z/vitepress-theme-niansi/commit/bad1f2541925c3a9db2b0fe3342fdfada9d97ccd))

### Features

- **config:** enhance defineAdditionalConfig types ([57910a5](https://github.com/niansi-z/vitepress-theme-niansi/commit/57910a5f784fe160d50f15ab7ea1aebfc2f5454c))
- **posts:** support multi-language post filtering and url generation ([924be53](https://github.com/niansi-z/vitepress-theme-niansi/commit/924be5391470e71f848d33e097b16808154a01d1))
- **template:** reorganize template structure with examples folder ([e846cef](https://github.com/niansi-z/vitepress-theme-niansi/commit/e846cef051cceca3453c2cb98b617e94a102f7f8))
- **theme:** add comment plugin support for Waline and Giscus ([c12b0c9](https://github.com/niansi-z/vitepress-theme-niansi/commit/c12b0c9a5467a360be0272a0750e2de33fdbeb58))
- **theme:** add language switching function ([dc754de](https://github.com/niansi-z/vitepress-theme-niansi/commit/dc754de1593f77111f6df25533257a4f3e97b1f9))
- **theme:** add Twikoo comment plugin support ([9621850](https://github.com/niansi-z/vitepress-theme-niansi/commit/9621850d90168ddec42ed0eea0909d7dfd6593df))
- **theme:** sidebar supports multi-level config and home-back button ([497a268](https://github.com/niansi-z/vitepress-theme-niansi/commit/497a26812c34c9c7f5e64b75278ebafb600d3e5c))

## [0.0.12](https://github.com/niansi-z/vitepress-theme-niansi/compare/v0.0.11...v0.0.12) (2026-04-08)

### Features

- **docs:** add npm social link ([e63bf0e](https://github.com/niansi-z/vitepress-theme-niansi/commit/e63bf0e7020abe706ea3fb4772ca3eff294a8f7e))
- **theme:** add accordion sidebar navigation ([ddedcbf](https://github.com/niansi-z/vitepress-theme-niansi/commit/ddedcbf6d0516ed263e643454490044c4fc6532b))
- **theme:** integrate markdown-it-footnote and fix md config merge ([e0d15cb](https://github.com/niansi-z/vitepress-theme-niansi/commit/e0d15cba3d356bb0c28086b687cd85f8fdd848e0))

## [0.0.11](https://github.com/niansi-z/vitepress-theme-niansi/compare/v0.0.10...v0.0.11) (2026-04-03)

### Features

- **component:** add Badge Component ([7ee2da4](https://github.com/niansi-z/vitepress-theme-niansi/commit/7ee2da418d467a97b5c6f8bc5ef7409d3e7613ce))
- **config:** strip vp-icons.css injected by VitePress core ([e8605e5](https://github.com/niansi-z/vitepress-theme-niansi/commit/e8605e56ccd09aa6e73eb11089cc1e3c0a51db3e))
- **styles:** update color variables for consistency across components ([1bf1d6f](https://github.com/niansi-z/vitepress-theme-niansi/commit/1bf1d6f58cff52b587b572bb0bf48885d2d040fe))
- **vars:** enhance color variables ([c2da0a3](https://github.com/niansi-z/vitepress-theme-niansi/commit/c2da0a30705ca9d3f0e689383bf59fb6f5c1135f))

## 0.0.10 (2026-04-01)
