import useGroupBuyStore from "../store/store"

const ErrorPage = () => {
  const errorStatus = useGroupBuyStore((state) => state.errorStatus)
  const errorStatusText = useGroupBuyStore((state) => state.errorStatusText)

  return (
    <>
      <div>Error {errorStatus}</div>
      <div>{errorStatusText}</div>
    </>
  )
}

export default ErrorPage