---
title: Image
categories:
  - Markdown
tags:
  - Markdown
  - Image
---

Adds image size syntax, lazy loading, and figure wrapping support for images in your VitePress site.

## Config

:::code-group

```ts [.vitepress/config.ts]
import { defineConfig } from 'vitepress-theme-niansi'

export default defineConfig({
  markdown: {
    // Lazy loading (optional)
    image: {
      lazyLoading: true
    },
    plugins: {
      // Enable image plugin
      image: true
      // Or pass options
      // image: { lazyLoading: true, focusable: false, linkImage: false }
    }
  }
})
```

:::

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `lazyLoading` | `boolean` | `false` | Native lazy loading |
| `focusable` | `boolean` | `true` | Makes image focusable (`tabindex="0"`) |
| `linkImage` | `boolean` | `true` | Also convert linked images `[![alt](url)](link)` to figures |

### Lazy Loading Priority

`markdown.image.lazyLoading` takes precedence over `markdown.plugins.image.lazyLoading`.

```ts
// Enable plugin, lazy loading is controlled by markdown.image.lazyLoading
markdown: {
  image: { lazyLoading: true },
  plugins: { image: true }
}
```

## Syntax

### Image Size

Use `alt =width x height` syntax to specify dimensions.

#### Input

```md
![alt text =200x300](/example.png)

![alt text =200x](/example.png "title")

![alt text =x300](/example.png)
```

#### Output

![alt text =200x300](/example.png)

![alt text =200x](/example.png "title")

![alt text =x300](/example.png)

### Figure Wrapping

Standalone images are automatically wrapped in `<figure>` with `<figcaption>`.

#### Input

```md
![alt text =200x300](/example.png)
```

#### Output

```html
<figure>
  <img src="/example.png" alt="alt text" width="200" height="300" tabindex="0" />
  <figcaption>alt text</figcaption>
</figure>
```

### Image with Title

Use `![alt](url "title")` syntax — the title becomes the `<figcaption>` content.

#### Input

```md
![image description =300x200](/example.png "This is a sample image")
```

#### Output

```html
<figure>
  <img src="/example.png" alt="image description" width="300" height="200" tabindex="0" title="This is a sample image" />
  <figcaption>This is a sample image</figcaption>
</figure>
```
