---
title: Category and tags
categories:
  - Blog
tags:
  - Blog
  - categories
  - tags
---

You can configure category and tags for articles through frontmatter to make them appear in specific categories and tags pages.

## Category Settings

Just add category array to `categories` in page frontmatter,
the article will be automatically rendered in the list of the `/category/<category name>` category page.

For example, add this to a certain page:

```md
---
categories:
  - Vue
  - JavaScript
---

Page content...
```

## Tags

Just set tag option in page frontmatter , and set value to one or more `tags`,
then the article will be automatically rendered in the list of the `/tag/<tag name>` tag page.

For example, after adding this in frontmatter:

```md
---
tags:
  - Vue
  - JavaScript
---

Page content...
```

## View list

Besides directly accessing the corresponding link, the category and tag name will be displayed at the article information at the top of the article.
You can click on it to navigate to the corresponding list to view the articles of the same category or tag.

![Article Information](/blog/info.png)