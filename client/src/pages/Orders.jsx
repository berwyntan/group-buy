import { useEffect } from "react"
import OrderCard from "../components/OrderCard"
import useGroupBuyStore from "../store/store"

const Orders = () => {

    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const getOrdersByUserId = useGroupBuyStore((state) => state.getOrdersByUserId)
    
    
    useEffect(() => {
        getOrdersByUserId(authDetails.id)
    }, [])

    
    const orders = useGroupBuyStore((state) => state.orders)
    const orderCards = orders.map(order => {
      return (
        <OrderCard
          imgUrl={order.Product.imgUrl}
          name={order.Product.name}
          id={order.id}
          price={order.Product.price}
          date={order.createdAt}
          quantity={order.quantity}
          cancel={order.cancel}
          fulfil={order.fulfil}
          paid={order.paid}
          collect={order.collect}
          key={order.id}
        />
      )
    })

  return (
    <>
      <div className="">
        <div className="text-2xl mb-2">Orders</div>
        {orderCards}
      </div>
    </>
  )
}

export default Orders