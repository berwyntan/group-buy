import ProductDetail from "../components/ProductDetail";
import { useNavigate, useParams } from "react-router-dom";
import useGroupBuyStore from "../store/store";
import { useEffect } from "react";

const Product = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const getProductById = useGroupBuyStore((state) => state.getProductById)
  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const createOrder = useGroupBuyStore((state) => state.createOrder)
  const setError = useGroupBuyStore((state) => state.setError)
  
  useEffect(() => {
    getProductById(id)
  }, [])

  const prod = useGroupBuyStore((state) => state.productSingle)
  
  const handleOrder = async (id, qty) => {
    // id argument is productId
    if (!authDetails.id) {
      return navigate("/login")      
    }
    
    const data = {
      fulfil: "false",
      cancel: "false",
      ProductId: id,
      UserId: authDetails.id,
      quantity: qty
    }
    // console.log(data)
    const response = await createOrder(data)
    console.log(response)
    if (response.statusText === "Created") {
      navigate("/confirmation")
    } else {
      setError(response)
      navigate("/error")
    }    

  } 

  return (
    <>
      <div>Product</div>      
      <ProductDetail 
        imgUrl={prod.imgUrl}
        name={prod.name}
        id={prod.id}
        desc={prod.desc}
        price={prod.price}
        listed={prod.listed}
        handleOrder={handleOrder}
      />

    </>
  )
}

export default Product