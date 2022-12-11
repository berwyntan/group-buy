import { getCartByUserId } from "../api/cart";
import { useQuery } from "react-query";
import useGroupBuyStore from "../store/store";
import CartCard from "../components/CartCard";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {

    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const userId = authDetails.id
        
    const { isLoading, isError, data, error } = useQuery(
      ['cart'], () => getCartByUserId(userId), { refetchInterval: 1000})
  
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }

    // console.log(data)
    const cartCards = data.map(item => {
      
      return (
        <CartCard
          imgUrl={item.Product.imgUrl}
          name={item.Product.name}
          productId={item.ProductId}
          price={item.Product.price}
          listed={item.Product.listed}
          quantity={item.quantity}
          cartId={item.id}
          key={item.id} 
          userId={userId}         
        />
      )
    })

  return (
    <>
      <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to="/cart">Cart</Link></li>  
                      
          </ul>
        </div>  
      <div className="text-2xl mb-2">Cart</div>
      {!data && <div>Your cart is empty.</div>}
      {data.length===0 && <div>Your cart is empty.</div>}
      {
        data.length===0 ||
        <div>
        <Link to="/checkout">
          <button className="btn btn-wide my-2">Checkout</button>
        </Link>
      </div>
      }
      {cartCards}
    </>
  )
}

export default Cart