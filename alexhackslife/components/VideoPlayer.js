/* eslint-disable jsx-a11y/media-has-caption */
import VideoJS from './VideoJS.js'
import { remoteVideosRoot } from '@/data/siteMetadata'
import _ from 'lodash'

const VideoPlayer = ({ url, poster, className = '', ...rest }) => {
  let _url = _.defaultTo(url, '//vjs.zencdn.net/v/oceans.mp4')
  if (!_url.includes('//')) {
    _url = `${remoteVideosRoot}/${_url}`
  }
  const videoJsOptions = {
    className: `vjs-alexhacks vjs-fluid vjs-big-play-centered ${className}`,
    autoPlay: false,
    playbackrates: [0.5, 1, 1.25, 1.5, 2],
    // width: 720,
    // height: 540,
    controls: true,
    poster: poster ? poster : '/static/images/hero.png',
    sources: [
      {
        src: _url,
        type: 'video/mp4',
      },
    ],
  }
  return (
    <div>
      <VideoJS {...videoJsOptions} {...rest} />
    </div>
  )
}

export default VideoPlayer
