import Link from './Link'
import Logo from './Logo'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-24 pt-8">
        <div className="flex mb-3 space-x-4">
          <Logo width={40} />
        </div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.title}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href={siteMetadata.companyUrl}>{siteMetadata.company}</Link>
        </div>
        <div className="mb-8 text-sm text-center text-gray-500 dark:text-gray-400 items-center">
          <Link href="/">
            Made with{' '}
            <span role="img" className="inline-icon" aria-label="heart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {' & '}
            <span role="img" aria-label="coffee mug">
              ☕️
            </span>
          </Link>
          <div className="flex mb-3 space-x-4 mt-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" />
            <SocialIcon kind="github" href={siteMetadata.github} size="5" />
            <SocialIcon kind="facebook" href={siteMetadata.facebook} size="5" />
            {/* <SocialIcon kind="youtube" href={siteMetadata.youtube} size="5" /> */}
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
          </div>
        </div>
      </div>
    </footer>
  )
}
