
import useGroupBuyStore from "../store/store"
import { useParams } from "react-router-dom"
import OrderDetail from "../components/OrderDetail"
import { useQuery } from 'react-query'
import { getOrderById } from "../api/order"

const Order = () => {
    const { id } = useParams()
    const setOrderSingle = useGroupBuyStore((state) => state.setOrderSingle)
             
    const { isLoading, isError, data, error, isSuccess } = useQuery(
      ['order', id], () => getOrderById(id), { onSuccess: (data) => setOrderSingle(data)})

    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
         
    // if (isSuccess) {
    //   setOrderSingle(data)
    //   console.log(data)
    //   console.log("hello")
    // }
    
    return (
      <>
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