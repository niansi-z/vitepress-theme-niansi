import type { MarkdownItAsync } from 'markdown-it-async'
import type Token from 'markdown-it/lib/token.mjs'
import type { RuleCore } from 'markdown-it/lib/parser_core.mjs'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'

interface TaskListStateCore extends StateCore {
  env: {
    tasklistId: number
  }
}

export const setTokenAttr = (token: Token, name: string, value: string): void => {
  const index = token.attrIndex(name)
  const attr: [string, string] = [name, value]

  if (index < 0) token.attrPush(attr)
  else token.attrs![index] = attr
}

export const getParentTokenIndex = (tokens: Token[], index: number): number => {
  const targetLevel = tokens[index].level - 1

  for (let i = index - 1; i >= 0; i--) if (tokens[i].level === targetLevel) return i

  return -1
}

export const isInlineToken = (token: Token): boolean => token.type === 'inline'

export const isParagraphToken = (token: Token): boolean => token.type === 'paragraph_open'

export const isListItemToken = (token: Token): boolean => token.type === 'list_item_open'

const startsWithTodoMarkdown = (token: Token): 'checked' | boolean => {
  const content = token.content

  // minimal length is 4: '[ ]'
  if (content.length < 4) return false

  if (content.charCodeAt(0) !== 91 /* [ */) return false

  if (content.charCodeAt(2) !== 93 /* ] */) return false

  const spacer = content.charCodeAt(3)

  if (spacer !== 32 /* space */ && spacer !== 160 /* \u00A0 */) return false

  const contentChar = content.charCodeAt(1)

  if (contentChar === 120 /* x */ || contentChar === 88 /* X */) return 'checked'

  return contentChar === 32 /* space */ || contentChar === 160 /* \u00A0 */
}

export function tasklist(md: MarkdownItAsync): void {
  const taskListRule: RuleCore = (state: TaskListStateCore) => {
    const tokens = state.tokens

    state.env.tasklistId ||= 0

    for (let index = 2; index < tokens.length; index++) {
      const token = tokens[index]

      // check if the token is an inline token inside a list item and starts with todo markdown
      if (!isInlineToken(token) || !isParagraphToken(tokens[index - 1]) || !isListItemToken(tokens[index - 2])) continue

      const todoState = startsWithTodoMarkdown(token)

      if (todoState === false) continue

      token.children ??= []

      // remove the checkbox syntax letter
      token.children[0].content = token.children[0].content.slice(3)

      const id = `task-item-${state.env.tasklistId++}`

      // add label
      const labelToken = new state.Token('label_open', 'label', 1)

      labelToken.attrs = [
        ['class', 'task-list-item-label'],
        ['for', id]
      ]

      token.children.unshift(labelToken)
      token.children.push(new state.Token('label_close', 'label', -1))

      const checkboxToken = new state.Token('checkbox_input', 'input', 0)

      checkboxToken.attrs = [
        ['type', 'checkbox'],
        ['class', 'task-list-item-checkbox'],
        ['id', id]
      ]

      // if token.content starts with '[x] ' or '[X] '
      if (todoState === 'checked') checkboxToken.attrs.push(['checked', 'checked'])

      checkboxToken.attrs.push(['disabled', 'disabled'])

      // checkbox
      token.children.unshift(checkboxToken)

      setTokenAttr(tokens[index - 2], 'class', 'task-list-item')
      setTokenAttr(tokens[getParentTokenIndex(tokens, index - 2)], 'class', 'task-list-container')
    }

    return true
  }

  md.core.ruler.after('inline', 'task_list', taskListRule)
}
