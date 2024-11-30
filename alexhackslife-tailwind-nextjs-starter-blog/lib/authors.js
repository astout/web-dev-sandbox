import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

export async function getAllAuthors() {
  const type = 'authors'
  const files = await getFiles(type)

  let authors = {}
  // Iterate through each post, putting all found authors into `authors`
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'data', type, file), 'utf8')
    const { data } = matter(source)
    if (data.name) {
      let authorName = kebabCase(data.name)
      authors[authorName] = data
    }
  })

  return authors
}
