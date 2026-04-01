import minimist from 'minimist'
import { createLogger } from 'vite'
import { init } from './init/init'

if (process.env.DEBUG) {
  Error.stackTraceLimit = Infinity
}

const argv: any = minimist(process.argv.slice(2))

Object.keys(argv).forEach((key) => {
  if (argv[key] === 'true') {
    argv[key] = true
  } else if (argv[key] === 'false') {
    argv[key] = false
  }
})

const command = argv._[0]
const root = argv._[command ? 1 : 0]
if (root) {
  argv.root = root
}

if (command === 'init') {
  createLogger().info('', { clear: true })
  init(argv.root)
}
