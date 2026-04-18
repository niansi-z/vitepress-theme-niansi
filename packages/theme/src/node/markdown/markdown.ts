import type { MarkdownItAsync } from 'markdown-it-async'

import type { MarkdownPluginOptions } from '../../../types'
import { footnote } from './plugins/footnote'
import { image } from './plugins/image'
import { tasklist } from './plugins/tasklist'
import { sub } from './plugins/sub'
import { sup } from './plugins/sup'
import { mark } from './plugins/mark'
import { spoiler } from './plugins/spoiler'
import { preview } from './plugins/preview'

export async function applyMarkdownPlugins(
  md: MarkdownItAsync,
  plugins: MarkdownPluginOptions = {},
  markdownImage?: { lazyLoading?: boolean }
) {
  if (plugins.footnote) {
    await footnote(md)
  }

  if (plugins.image) {
    image(md, plugins.image === true ? {} : plugins.image, markdownImage)
  }

  if (plugins.tasklist) {
    tasklist(md)
  }

  if (plugins.sub) {
    sub(md)
  }

  if (plugins.sup) {
    sup(md)
  }

  if (plugins.mark) {
    mark(md)
  }

  if (plugins.spoiler) {
    spoiler(md)
  }

  if (plugins.preview) {
    preview(md)
  }
}

export { footnote, image }
