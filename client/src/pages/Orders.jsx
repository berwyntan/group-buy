import { useEffect } from "react"

import useGroupBuyStore from "../store/store"

const Orders = () => {

    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const getOrdersByUserId = useGroupBuyStore((state) => state.getOrdersByUserId)

    useEffect(() => {
        getOrdersByUserId(authDetails.id)
    }, [])

  return (
    <div>Orders</div>
  )
}

export default Orders