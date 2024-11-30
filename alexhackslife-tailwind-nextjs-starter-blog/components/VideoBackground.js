import { useEffect, useRef } from 'react'
import _ from 'lodash'

const VideoBackground = (params = {}) => {
  const p = _.defaults(
    { ...params },
    {
      onPlay: () => {},
      onPause: () => {},
    }
  )
  const { mp4Url, webmUrl, onRef, onPlay, onPause } = p
  const videoRef = useRef()
  const previousMp4Url = useRef(mp4Url)
  const previousWebmUrl = useRef(webmUrl)

  useEffect(() => {
    if (previousMp4Url.current === mp4Url && previousWebmUrl.current === webmUrl) {
      return
    }

    if (videoRef.current) {
      videoRef.current.load()
    }

    previousMp4Url.current = mp4Url
    previousWebmUrl.current = webmUrl
  }, [mp4Url, webmUrl, onRef])

  return (
    <>
      <div className="fullscreen-bg__container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onPlay={onPlay}
          onPause={onPause}
          className="fullscreen-bg__video"
        >
          {mp4Url ? <source src={mp4Url} type="video/mp4" /> : ''}
          {webmUrl ? <source src={webmUrl} type="video/webm" /> : ''}
        </video>
      </div>
      {/* <div className="text-small">p: {JSON.stringify(p)}</div> */}
    </>
  )
}

export default VideoBackground
