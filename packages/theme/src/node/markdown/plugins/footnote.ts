import type { MarkdownItAsync } from 'markdown-it-async'

export async function footnote(md: MarkdownItAsync): Promise<void> {
  const markdownItFootnote = (await import('markdown-it-footnote')).default
  md.use(markdownItFootnote)
}
