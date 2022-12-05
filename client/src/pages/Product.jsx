import ProductDetail from "../components/ProductDetail";
import { useNavigate, useParams } from "react-router-dom";
import useGroupBuyStore from "../store/store";
import { useEffect } from "react";

const Product = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const getProductById = useGroupBuyStore((state) => state.getProductById)
  const authDetails = useGroupBuyStore((state) => state.authDetails)
  console.log(authDetails.id)
  useEffect(() => {
    getProductById(id)
  }, [])

  const prod = useGroupBuyStore((state) => state.productSingle)
  
  const handleOrder = (id) => {
    // id argument is productId
    if (!authDetails.id) {
      return navigate("/login")      
    }
    console.log("order")
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