const path = require('path')
const fs = require('fs').promises
const [dir] = process.argv.slice(2)

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

;(async () => {
  const files = await getFiles(dir)

  files.forEach(async (file) => {
    const filePath = path.resolve(dir, file)
    const dirPath = path.dirname(filePath)
    const basename = path.basename(filePath)
    const newFilePath = path.join(dirPath, basename.replace(/\s+/g, '-'))

    await fs.rename(`${filePath}`, `${newFilePath}`)
  })
})()
