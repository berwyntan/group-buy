import { countCartByUserId } from "../api/cart";
import { useQuery } from "react-query"

const useCountCart = (id, accessToken) => {
    const { isLoading, isError, data, error } = useQuery(
        ['countCart', id], () => countCartByUserId(id, accessToken))
    return { isLoading, isError, data, error }
}

export default useCountCart