import { useParams, Link } from "react-router-dom"
import OrderDetail from "../components/OrderDetail"
import { useQuery } from 'react-query'
import { getOrderById } from "../api/order"

const Order = () => {
    const { id } = useParams()
    // const setOrderSingle = useGroupBuyStore((state) => state.setOrderSingle)
    // , { onSuccess: (data) => setOrderSingle(data)}
             
    const { isLoading, isError, data, error } = useQuery(
      ['order', id], () => getOrderById(id))

    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
         
    
    return (
      <>
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link to="/account">Account</Link></li>  
              <li><Link to="/orders">Orders</Link></li>        
            </ul>
          </div> 
          <div className="text-2xl mb-2">Order Detail</div>
          <OrderDetail 
              imgUrl={data.Product.imgUrl}
              name={data.Product.name}
              id={data.Product.id}
              price={data.Product.price}
              date={data.createdAt}
              quantity={data.quantity}
              cancel={data.cancel}
              fulfil={data.fulfil}
              paid={data.paid}
              collect={data.collect}
              key={data.id}
              orderId={data.id}
              update={data.updatedAt}
          />
      </>
  )
}

export default Order