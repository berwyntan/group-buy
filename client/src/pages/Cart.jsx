import { getCartByUserId } from "../api/cart";
import { useQuery } from "react-query";
import useGroupBuyStore from "../store/store";
import CartCard from "../components/CartCard";

const Cart = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
    const userId = authDetails.id
    
    const { isLoading, isError, data, error } = useQuery(
      ['cart'], () => getCartByUserId(userId))
  
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }

    console.log(data)

  return (
    <>
      {!data && <div>Your cart is empty.</div>}
    </>
  )
}

export default Cart