/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

// NOTE: use of next/image requires the app
// to run on a server or use a remote image optimizing service
// we want to host this site statically on S3, so we don't want
// to use next/image
// import NextImage from 'next/image'

const Image = ({ ...rest }) => <img {...rest} />

export default Image
