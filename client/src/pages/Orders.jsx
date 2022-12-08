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
          id={order.Product.id}
          price={order.Product.price}
          date={order.createdAt}
          quantity={order.quantity}
          cancel={order.cancel}
          fulfil={order.fulfil}
          paid={order.paid}
        />
      )
    })

  return (
    <>
      <div className="">
        {orderCards}
      </div>
    </>
  )
}

export default Orders