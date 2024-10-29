/* eslint-disable prettier/prettier */
require('dotenv').config()
const { promises: fs, createReadStream, constants } = require('fs')
const path = require('path')
const { S3 } = require('aws-sdk')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const _ENV = {
  staging: {
    value: 'staging',
    aliases: ['s', 'stage', 'staging'],
  },
  prod: {
    value: 'prod',
    aliases: ['p', 'prod', 'product', 'production'],
  },
  dev: {
    value: 'dev',
    aliases: ['d', 'dev', 'develop', 'development'],
  },
}

const argv = yargs(hideBin(process.argv))
  .option('env', {
    alias: 'e',
    type: 'string',
    description: 'Environment to upload to',
    default: _ENV.staging.value,
  })
  .parse()

const _CONFIG = {
  // ID: process.env.AWS_KEY_ID,
  // SECRET: process.env.AWS_KEY_SECRET,
  BUCKET_NAME: null,
  DIR_PATH: null,
  ENV: argv.env,
}

const getConfig = async () => {
  if (_CONFIG.DIR_PATH === null) {
    _CONFIG.DIR_PATH = `${await getPkgJsonDir()}/out`
  }
  if (_CONFIG.BUCKET_NAME === null) {
    _CONFIG.BUCKET_NAME = await getBucketName()
  }
  return _CONFIG
}

const getBucketName = async () => {
  let env
  for (const k in _ENV) {
    if (_ENV[k].aliases.includes(argv.env)) {
      env = _ENV[k].value
      break
    }
  }
  if (env === undefined) {
    throw new Error(`could not determine environment with '${argv.env}'`)
  }
  if (env == _ENV.prod.value) {
    return process.env.AWS_S3_BUCKET
  }
  return `${env}-${process.env.AWS_S3_BUCKET}`
}

async function getPkgJsonDir() {
  for (let itemPath of module.paths) {
    try {
      const prospectivePkgJsonDir = path.dirname(itemPath)
      await fs.access(itemPath, constants.F_OK)
      return prospectivePkgJsonDir
    } catch (e) {
      // console.error(e)
    }
  }
}

async function uploadDir(s3Path, bucketName) {
  const { ID, SECRET } = await getConfig()
  const s3 = new S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  })

  // Recursive getFiles from
  // https://stackoverflow.com/a/45130990/831465
  async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true })
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name)
        return dirent.isDirectory() ? getFiles(res) : res
      })
    )
    return Array.prototype.concat(...files)
  }

  const files = await getFiles(s3Path)
  const uploads = files.map((filePath) => {
    console.log(`uploading '${filePath}'`)
    return s3
      .putObject({
        Key: path.relative(s3Path, filePath),
        Bucket: bucketName,
        Body: createReadStream(filePath),
      })
      .promise()
  })
  return Promise.all(uploads)
}

;(async () => {
  try {
    const { DIR_PATH, BUCKET_NAME } = await getConfig()
    console.log(`config: ${JSON.stringify(_CONFIG, null, 2)}`)
    await uploadDir(path.resolve(DIR_PATH), BUCKET_NAME)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }
})()
