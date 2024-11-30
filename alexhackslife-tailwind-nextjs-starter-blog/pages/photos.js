import InfiniteScrollCollage from '@/components/InfiniteScrollCollage'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const PhotosPage = () => {
  return (
    <div className="photos-page-body">
      <PageTitle>Photos</PageTitle>
      <ScrollTopAndComment />
      <InfiniteScrollCollage />
    </div>
  )
}

export default PhotosPage
