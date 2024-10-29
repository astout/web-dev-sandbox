require('dotenv').config()
const { promises: fs, createReadStream, constants, write } = require('fs')
const path = require('path')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const _ = require('lodash')

const argv = yargs(hideBin(process.argv))
  .option('dir', {
    alias: 'd',
    type: 'string',
    description: 'Directory containing photos files',
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'path to output file',
  })
  .demandOption(['dir', 'output'])
  .help().argv

const _CONFIG = {
  DIR_PATH: null,
  FILE_PATH: null,
  VALID_EXTENSIONS: ['png', 'jpg', 'jpeg', 'gif', 'tiff'],
}

async function getConfig(args) {
  let dir = path.resolve(args.dir)
  let stats = await fs.lstat(dir)
  if (!stats.isDirectory()) {
    throw new Error(`'${dir}' is not a directory`)
  }
  let filePath = path.resolve(args.output)
  let fileDir = path.dirname(filePath)
  stats = await fs.lstat(fileDir)
  if (!stats.isDirectory()) {
    throw new Error(`ensure full path for '${args.output}' exists`)
  }
  return _.assign(_CONFIG, {
    DIR_PATH: dir,
    FILE_PATH: filePath,
  })
}

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    })
  )
  return files.flat()
}

async function getFileList(dir, extensions) {
  let invalidList = []
  let validList = await getFiles(dir)
  validList = validList.map((f) => f.replace(`${dir}/`, ''))
  validList = validList.filter((f) => {
    let ext = path.extname(f.toLowerCase())
    ext = ext.replace(/\./, '')
    if (extensions.includes(ext)) {
      return true
    }
    invalidList.push(f)
    return false
  })
  return { validList, invalidList }
}

async function writeFile(fileList, filePath) {
  const fileString = JSON.stringify(fileList, null, 2)
  return fs.writeFile(filePath, fileString)
}

async function main() {
  const config = await getConfig(argv)
  const { validList, invalidList } = await getFileList(config.DIR_PATH, config.VALID_EXTENSIONS)
  await writeFile(validList, config.FILE_PATH)
  if (invalidList.length) {
    console.log(`⚠️ Invalid files exist in '${config.DIR_PATH}'`)
    invalidList.forEach((f) => {
      console.log(`\t - ${f}`)
    })
    console.log('files must have one of the following extensions:')
    config.VALID_EXTENSIONS.forEach((ext) => {
      console.log(`\t - .${ext}`)
    })
  }
  console.log(`${validList.length} items written to ${config.FILE_PATH}`)
}

;(async () => {
  try {
    await main()
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
})()
