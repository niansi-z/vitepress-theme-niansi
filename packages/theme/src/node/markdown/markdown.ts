import type { MarkdownItAsync } from 'markdown-it-async'

import type { MarkdownPluginOptions } from '../../../types'
import { footnote } from './plugins/footnote'
import { image } from './plugins/image'
import { tasklist } from './plugins/tasklist'

export async function applyMarkdownPlugins(md: MarkdownItAsync, plugins: MarkdownPluginOptions = {}) {
  if (plugins.footnote) {
    await footnote(md)
  }

  if (plugins.image) {
    image(md)
  }

  if (plugins.tasklist) {
    tasklist(md)
  }
}

export { footnote, image }
