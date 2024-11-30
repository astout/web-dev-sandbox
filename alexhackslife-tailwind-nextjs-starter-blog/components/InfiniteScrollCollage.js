import { useState, useEffect, useCallback } from 'react'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import CollageImage from './InfiniteScrollCollageImage'
import ImagePaths from '@/data/photosData'
import { remotePhotosRoot } from '@/data/siteMetadata'
import { isInViewport } from '@/lib/utils/html'
import useInterval from '@/lib/useInterval'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const Collage = () => {
  const [images, setImages] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [loaded, setIsLoaded] = useState(false)
  const [imagePaths, setImagePaths] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const fetchImages = useCallback(
    (index, length = 5) => {
      let addedImages = imagePaths
        .slice(index, index + length)
        .map((image) => `${remotePhotosRoot}/${image}`)
      setImages([...images, ...addedImages])
      setImageIndex(index + length)
      setIsLoaded(true)
    },
    [images, imagePaths]
  )

  const checkBottomVisibility = () => {
    const collageBottom = document.querySelector('#collage-bottom')
    if (collageBottom && isInViewport(collageBottom)) {
      fetchImages(imageIndex)
    }
    return false
  }

  useInterval(() => {
    checkBottomVisibility()
  }, 500)

  useEffect(() => {
    if (_.isEmpty(imagePaths)) {
      setImagePaths(_.shuffle(ImagePaths))
    }
    fetchImages(imageIndex)
    // IMPORTANT: if we use the hook dependencies, we'll get a react update loop overload!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onImageClick(index) {
    setSelectedIndex(index)
  }

  function onLightBoxClose() {
    setSelectedIndex(-1)
  }

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="text-center mt-7">
          <InfiniteScroll
            dataLength={images.length}
            next={() => fetchImages(imageIndex)}
            hasMore={imageIndex < ImagePaths.length - 1}
            loader={
              <div className="flex w-full content-center">
                <Loader type="Bars" color="#C58240" width="5em" className="m-auto" />
              </div>
            }
          >
            <div className="collage-image-grid">
              {loaded
                ? images.map((image, index) => (
                    <CollageImage url={image} key={index} onClick={() => onImageClick(index)} />
                  ))
                : ''}
            </div>
          </InfiniteScroll>
          {selectedIndex >= 0 && selectedIndex < images.length ? (
            <Lightbox
              mainSrc={images[selectedIndex]}
              nextSrc={images[(selectedIndex + 1) % images.length]}
              prevSrc={images[(selectedIndex + images.length - 1) % images.length]}
              onCloseRequest={onLightBoxClose}
              onMovePrevRequest={() =>
                setSelectedIndex((selectedIndex + images.length - 1) % images.length)
              }
              onMoveNextRequest={() => setSelectedIndex((selectedIndex + 1) % images.length)}
            />
          ) : (
            <></>
          )}
        </div>
        <div id="collage-bottom"></div>
      </div>
    </div>
  )
}

export default Collage
