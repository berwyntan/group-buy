import { useState } from "react";
import { useMutation } from "react-query";
import { addToCart } from "../api/cart";
import { useNavigate } from "react-router-dom";
import useToastDefault from "../hooks/useToastDefault";
import useToastError from "../hooks/useToastError";

const ProductDetail = ({ imgUrl, name, productId, desc, price, listed, userId }) => {
  
  const [ qty, setQty ] = useState("1")
  const updateQty = (e) => {
    // console.log(typeof e.target.innerHTML)
    setQty(e.target.innerHTML)
  }
  const navigate = useNavigate()

  const mutation = useMutation(formData => addToCart(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 201) {
          
          useToastDefault("Item added to cart")
            
        } else {

          useToastError("Error: Item not added to cart")
          
        }
      },
    })

    const handleAddToCart = ( productId, userId, qty) => {
      
      if (!userId) {
        navigate("/login")
        return
      }
      const formData = JSON.stringify({
        ProductId: productId,
        UserId: userId,
        quantity: parseInt(qty)
      })
      
      mutation.mutate(formData)
    }

  return (
    <>
        
        <div className="card md:card-side bg-base-100 shadow-xl">
        <figure><img className="p-8" src={imgUrl} alt={name}/></figure>
        <div className="card-body">
            <div className="flex flex-col items-start">
                <div className="card-title text-left mb-3">{name}</div>
                
            </div>
            
            <div className="card-actions justify-end">
                <div className="text-lg">$</div>
                <div className="text-2xl font-semibold mr-5">{price}</div>
                <label htmlFor="my-modal" className="btn">Quantity:
                <div className="ml-1 font-bold text-lg">{qty}</div>
                </label>

                {listed && <button className="btn btn-primary" 
                  onClick={() => handleAddToCart(productId, userId, qty)}>Add to Cart</button>}
                {listed || <button className="btn btn-disabled">Closed</button>}
            </div>
            
            <div className="text-left mt-4">{desc}</div>
        </div>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold mb-2">Qty:</h3>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='1' && 'btn-active'}`} 
            onClick={updateQty}>1</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='2' && 'btn-active'}`} 
            onClick={updateQty}>2</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='3' && 'btn-active'}`} 
            onClick={updateQty}>3</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='4' && 'btn-active'}`} 
            onClick={updateQty}>4</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='5' && 'btn-active'}`} 
            onClick={updateQty}>5</label>
          </div>
        </div>

        </div>
        
    </>
  )
}

export default ProductDetail