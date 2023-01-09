import useGroupBuyStore from "../store/store";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getCartByUserId, clearCartByUserId } from "../api/cart";
import CheckoutCard from "../components/CheckoutCard";
import { createOrder } from "../api/order";
import useToastSuccess from "../hooks/useToastSuccess";
import useToastError from "../hooks/useToastError";
import LoadingSpinner from "../components/LoadingSpinner";
import { whatsapp } from "../api/whatsapp"
import useAccessToken from "../hooks/useAuthDetails";

const Checkout = () => {

    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const userId = authDetails.id
    const mobile = authDetails.mobile
    let total = 0
    const navigate = useNavigate()
    
    const { isLoading, isError, data, error } = useQuery(
      ['cart'], () => getCartByUserId(userId))
  
    if (isLoading) {
      return <LoadingSpinner />
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }

    console.log(data)

    data.map(item => {
      const subtotal = item.quantity * item.Product.price
      total += subtotal
    })

    const checkoutCards = data.map(item => {
      if (item.Product.listed) {
        return (
          <CheckoutCard
            imgUrl={item.Product.imgUrl}
            name={item.Product.name}
            price={item.Product.price}
            qty={item.quantity}
            productId={item.productId}
            key={item.id}
          />
        )
      }
    })

    const mutation = useMutation(formData => createOrder(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 201) {
          
          // useToastSuccess("Order completed")
                      
        } else {
          // useToastError("Error: Cannot checkout")
        }
      },
    })

    const clearCartMutation = useMutation(formData => clearCartByUserId(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {          
          useToastSuccess("Checkout complete")   
          navigate("/updateorder")                   
        } else if (response.status === 204) {
          useToastError("Error: Cannot clear cart")
        } else {
          useToastError("Error: Cannot checkout")
        }
      },
    })

    const checkout = async (data) => {
      const order = await data.map(item => {
        const formData = {
          "fulfil": "false",
          "cancel": "false",
          "ProductId": item.ProductId,
          "UserId": item.UserId,
          "quantity": item.quantity.toString()
        }
        // console.log(formData)
        try {
          mutation.mutate(formData)
          whatsappMutation.mutate({
            message: `Your order of ${item.quantity} nos of ${item.Product.name} is being processed. Please log in to GroupBuy for payment details.`,
            mobile: mobile
          })    
        } catch (error) {
          console.log(error)
        }        
      })
      clearCartMutation.mutate(userId)  

    }

    const whatsappMutation = useMutation(formData => whatsapp(formData), 
    {
        onError: (response) => {
            
            console.log(response)
        },
        onSuccess: (response) => {
            
            console.log(response)
            if (response.status === 201) {
                useToastSuccess("WhatsApp sent")   
            } else useToastError("Error: WhatsApp not sent")
        },
    })


    return (
      <>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to="/cart">Cart</Link></li>  
            <li>Checkout</li>          
          </ul>
        </div>  
        <div className="text-2xl mb-2">Checkout</div>
        <button className="btn btn-wide" onClick={() => checkout(data)}>Confirm Checkout</button>
        <div className="flex justify-center my-3">
            <div className="text-xl mr-2 font-semibold">Total:</div>
            <div className="text-xl mr-2">$</div>
            <div className="text-xl font-semibold">{total}</div>
        </div>
        {checkoutCards}        
      </>
    )
}

export default Checkout