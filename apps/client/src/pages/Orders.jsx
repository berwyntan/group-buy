import OrderCard from "../components/OrderCard";
import useGroupBuyStore from "../store/store";
import { getOrdersByUserId } from "../api/order";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Orders = () => {

    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const userId = authDetails.id
    
    const { isLoading, isError, data, error } = useQuery(
      ['orders', userId], () => getOrdersByUserId(userId))
  
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
    
    const orderCards = data.map(order => {
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
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to="/account">Account</Link></li>  
            <li><Link to="/orders">Orders</Link></li>              
          </ul>
        </div> 
        <div className="text-2xl mb-2">Orders</div>
        {orderCards}
        {orderCards.length===0 && <div>You have no orders</div>}
      </div>
    </>
  )
}

export default Orders