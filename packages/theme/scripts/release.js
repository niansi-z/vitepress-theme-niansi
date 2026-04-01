import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import c from 'picocolors'
import prompts from 'prompts'
import { execa } from 'execa'
import semver from 'semver'

const { version: currentVersion } = createRequire(import.meta.url)('../package.json')
const { inc: _inc, valid } = semver

const versionIncrements = ['patch', 'minor', 'major']

const tags = ['latest', 'next']

const dir = fileURLToPath(new URL('.', import.meta.url))

const inc = (i) => _inc(currentVersion, i)

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

const step = (msg) => console.log(c.cyan(msg))

async function main() {
  let targetVersion

  const versions = versionIncrements.map((i) => `${i} (${inc(i)})`).concat(['custom'])

  const { release } = await prompts({
    type: 'select',
    name: 'release',
    message: '选择发布类型',
    choices: versions
  })

  if (release === 3) {
    targetVersion = (
      await prompts({
        type: 'text',
        name: 'version',
        message: '输入自定义版本',
        initial: currentVersion
      })
    ).version
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1]
  }

  if (!valid(targetVersion)) {
    throw new Error(`无效的版本号: ${targetVersion}`)
  }

  const { tag } = await prompts({
    type: 'select',
    name: 'tag',
    message: '选择标签类型',
    choices: tags
  })

  const { yes: tagOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: `即将发布 v${targetVersion} 到 ${tags[tag]} 标签. 确认?`
  })

  if (!tagOk) return

  step('\n正在更新 package 版本...')
  updatePackage(targetVersion)

  step('\n构建中...')
  await run('pnpm', ['build'])

  step('\n生成变更日志...')
  await run('pnpm', ['changelog'])
  await run('pnpm', ['prettier', '--write', 'CHANGELOG.md'])

  const { yes: changelogOk } = await prompts({
    type: 'confirm',
    name: 'yes',
    message: '变更日志已生成. 是否继续发布?'
  })

  if (!changelogOk) return

  step('\n提交变更...')
  await run('git', ['add', 'CHANGELOG.md', 'package.json'])
  await run('git', ['commit', '-m', `release: v${targetVersion}`])
  await run('git', ['tag', `v${targetVersion}`])

  step('\n正在发布到 npm...')
  await run('pnpm', ['publish', '--tag', tags[tag], '--ignore-scripts', '--no-git-checks'])

  step('\n推送到 GitHub...')
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}

function updatePackage(version) {
  const pkgPath = resolve(resolve(dir, '..'), 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

  pkg.version = version

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

main().catch((err) => console.error(err))
