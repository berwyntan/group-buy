import useGroupBuyStore from "../store/store"
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget"

const ErrorPage = () => {
  const errorStatus = useGroupBuyStore((state) => state.errorStatus)
  const errorStatusText = useGroupBuyStore((state) => state.errorStatusText)

  return (
    <>
      <div>Error {errorStatus}</div>
      <div>{errorStatusText}</div>
      <CloudinaryUploadWidget />
    </>
  )
}

export default ErrorPage