import useGroupBuyStore from "../store/store";

const useAccessToken = () => {
    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const accessToken = authDetails.accessToken

    return accessToken
}

export default useAccessToken