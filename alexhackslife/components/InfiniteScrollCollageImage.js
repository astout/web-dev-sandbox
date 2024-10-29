import Image from '@/components/Image'

const CollageImage = ({ url, key, onClick = () => {} }) => {
  return (
    <div className="collage-image-item" key={key}>
      <Image src={url} alt="" onClick={onClick} />
    </div>
  )
}

export default CollageImage
