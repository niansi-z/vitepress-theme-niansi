import type { MarkdownItAsync } from 'markdown-it-async'
import type { RuleBlock } from 'markdown-it/lib/parser_block.mjs'
import type Token from 'markdown-it/lib/token.mjs'

export const preview = (md: MarkdownItAsync): void => {
  const MIN_MARKER_NUM = 3
  const name = 'preview'

  const previewRule: RuleBlock = (state, startLine, endLine, silent) => {
    const currentLineStart = state.bMarks[startLine] + state.tShift[startLine]
    const currentLineMax = state.eMarks[startLine]
    const currentLineIndent = state.sCount[startLine]

    if (state.src.charCodeAt(currentLineStart) !== 58 /* : */) return false

    if (currentLineMax - currentLineStart < MIN_MARKER_NUM + name.length) return false

    let pos = currentLineStart + 1

    while (pos <= currentLineMax) {
      if (state.src.charCodeAt(pos) !== 58 /* : */) break
      pos++
    }

    const markerCount = pos - currentLineStart

    if (markerCount < MIN_MARKER_NUM) return false

    pos = state.skipSpaces(pos)

    for (let i = 0; i < name.length; i++) {
      if (state.src.charCodeAt(pos) !== name.charCodeAt(i)) return false
      pos++
    }

    const nameEnd = pos

    const titleEnd = state.skipSpacesBack(currentLineMax, pos)
    const hasTitle = titleEnd > nameEnd
    let titleStart = -1

    if (hasTitle) {
      titleStart = state.skipSpaces(nameEnd)
      if (titleStart === nameEnd) return false
    }

    if (silent) return true

    let nextLine = startLine + 1
    let autoClosed = false

    for (; nextLine < endLine; nextLine++) {
      const nextLineStart = state.bMarks[nextLine] + state.tShift[nextLine]
      const nextLineMax = state.eMarks[nextLine]

      if (nextLineStart < nextLineMax && state.sCount[nextLine] < currentLineIndent) {
        break
      }

      if (state.sCount[nextLine] === currentLineIndent && state.src.charCodeAt(nextLineStart) === 58 /* : */) {
        for (pos = nextLineStart + 1; pos <= nextLineMax; pos++) if (state.src.charCodeAt(pos) !== 58 /* : */) break

        if (pos - nextLineStart >= markerCount) {
          pos = state.skipSpaces(pos)

          if (pos >= nextLineMax) {
            autoClosed = true
            break
          }
        }
      }
    }

    const oldParent = state.parentType
    const oldLineMax = state.lineMax
    const oldBlkIndent = state.blkIndent

    // @ts-expect-error We are creating a new type called "preview"
    state.parentType = 'preview'

    state.lineMax = nextLine
    state.blkIndent = currentLineIndent

    const markup = ':'.repeat(markerCount)
    const title = hasTitle ? state.src.slice(titleStart, titleEnd) : 'Demo'

    // Extract raw content from state.src
    const rawContent = state.src
      .split(/\n\r?/)
      .slice(startLine + 1, nextLine)
      .map((line) => line.slice(currentLineIndent))
      .join('\n')
      .replace(/^\n+/, '')
      .replace(/\n*$/, '\n')

    // Create open token
    const openToken = state.push(`${name}_demo_open`, 'div', 1)
    openToken.markup = markup
    openToken.block = true
    openToken.info = title
    openToken.map = [startLine, nextLine]

    // Create content wrapper tokens
    const contentOpenToken = state.push(`${name}_demo_content_open`, 'div', 1)
    contentOpenToken.block = true

    // Process the content inside the container - this will render Markdown and output HTML
    state.md.block.tokenize(state, startLine + 1, nextLine)

    const contentCloseToken = state.push(`${name}_demo_content_close`, 'div', -1)
    contentCloseToken.block = true

    // Create fence token for code display
    const codeToken = state.push(`${name}_demo_code`, 'fence', 0)
    codeToken.content = rawContent
    codeToken.map = [startLine, state.line]
    codeToken.info = 'md'
    codeToken.markup = '```'

    const closeToken = state.push(`${name}_demo_close`, 'div', -1)
    closeToken.markup = markup
    closeToken.block = true
    closeToken.info = title

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.blkIndent = oldBlkIndent
    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', name, previewRule, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  // Open render
  md.renderer.rules[`${name}_demo_open`] = (tokens: Token[], idx: number): string => {
    const title = tokens[idx].info || 'Demo'
    return `<Preview title="${encodeURIComponent(title)}"><template #content>`
  }

  // Content open render
  md.renderer.rules[`${name}_demo_content_open`] = (): string => {
    return ''
  }

  // Content close render
  md.renderer.rules[`${name}_demo_content_close`] = (): string => {
    return `</template><template #code>`
  }

  // Code render - use self.rules.fence to render the fence token
  md.renderer.rules[`${name}_demo_code`] = (tokens: Token[], idx: number, options, _env, self): string => {
    return self.rules.fence!(tokens, idx, options, _env, self)
  }

  // Close render
  md.renderer.rules[`${name}_demo_close`] = (): string => {
    return `</template></Preview>`
  }
}
