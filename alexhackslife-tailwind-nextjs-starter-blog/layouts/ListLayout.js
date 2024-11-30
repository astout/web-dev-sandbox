import Link from '@/components/Link'
import Tag from '@/components/Tag'
import VideoPlayer from '@/components/VideoPlayer'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useQuery } from '@/lib/useQuery'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import kebabCase from '@/lib/utils/kebabCase'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tags = {},
}) {
  const [searchValue, setSearchValue] = useState('')
  const query = useQuery()
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  const [showAllTags, setShowAllTags] = useState(false)
  const tagsPreview = _.take(sortedTags, 8)
  const tagsRemaining = _.slice(sortedTags, 8)

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = [frontMatter.title, frontMatter.summary, ...frontMatter.tags]
      .join(' ')
      .toLowerCase()
    let searchString = searchValue
      .toLowerCase()
      .replace(/[^\w|_|\s|-]/g, ' ')
      .replace(/\s/g, ' ')
    return _.every(
      searchString.split(' ').map((substring) => searchContent.toLowerCase().includes(substring))
    )
  })

  const onShowAllClick = (e) => {
    setShowAllTags(!showAllTags)
  }

  useEffect(() => {
    console.log('query', query)
    let queryString = _.get(query, 's', '')
    setSearchValue(queryString)
  }, [query])

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search posts"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts by title, tag, or summary"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div id="list-tags-title-wrapper" className="flex flex-wrap">
            <h2
              id="list-tags-title"
              className="m-0 text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-2xl md:leading-14 sm:-my-2 md:-my-8"
            >
              Tags
            </h2>
            <button
              onClick={onShowAllClick}
              className="mx-2 underline green text-sm font-semibold text-gray-600 dark:text-gray-300 lg:mx-4"
            >
              {showAllTags ? 'Show Less' : 'Show All'}
            </button>
          </div>
          <div className="flex flex-wrap">
            {tagsPreview.map((t) => {
              return (
                <div key={t} className="mt-2 mb-2 mr-5">
                  <Tag text={t} />
                  <Link
                    href={`/tags/${kebabCase(t)}`}
                    className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  >
                    {` (${tags[t]})`}
                  </Link>
                </div>
              )
            })}
            {showAllTags ? (
              tagsRemaining.map((t) => (
                <div key={t} className="mt-2 mb-2 mr-5">
                  <Tag text={t} />
                  <Link
                    href={`/tags/${kebabCase(t)}`}
                    className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                  >
                    {` (${tags[t]})`}
                  </Link>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <ul className="divide-y divide-gray-500 md:px-14">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                      {summary}
                      {_.isString(frontMatter.previewVideoUrl) ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
                          <div className="pt-10 pb-8 prose dark:prose-dark md:max-w-xl">
                            <VideoPlayer url={frontMatter.previewVideoUrl} />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
