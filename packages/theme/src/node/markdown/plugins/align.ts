import type {MarkdownItAsync} from "markdown-it-async";
import container from 'markdown-it-container'
import type Token from "markdown-it/lib/token.mjs";

const aligns = ['left', 'center', 'right'] as const

export const align = (md: MarkdownItAsync): void => {
  for (const name of aligns) {
    md.use(container, name, {
      render: (tokens: Token[], idx: number) =>
        tokens[idx].nesting === 1 ? `<div style="text-align: ${name};">\n` : `</div>\n`
    })
  }
}