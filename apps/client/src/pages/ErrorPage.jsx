import useGroupBuyStore from "../store/store"
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget"
import {AdvancedImage} from '@cloudinary/react';
import cld from "../api/cld";

const ErrorPage = () => {
  const errorStatus = useGroupBuyStore((state) => state.errorStatus)
  const errorStatusText = useGroupBuyStore((state) => state.errorStatusText)

  const image = cld.image('2015-10-12_09.49.40_druom5')

  return (
    <>
      <div>Error {errorStatus}</div>
      <div>{errorStatusText}</div>
      <CloudinaryUploadWidget />
      <AdvancedImage cldImg={image} />
    </>
  )
}

export default ErrorPage