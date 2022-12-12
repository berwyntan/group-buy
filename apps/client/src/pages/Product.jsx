import ProductDetail from "../components/ProductDetail";
import { useParams } from "react-router-dom";
import useGroupBuyStore from "../store/store";
import { useQuery } from "react-query";
import { getProductById } from "../api/product";
import { Link } from "react-router-dom";

const Product = () => {

  const { id } = useParams()
  
  const authDetails = useGroupBuyStore((state) => state.authDetails)
  
  const { isLoading, isError, data, error } = useQuery(
    ['product', id], () => getProductById(id))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const category = data?.Category?.name

   
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/">Categories</Link></li>  
          <li>{category}</li>          
        </ul>
      </div>    
      <ProductDetail 
        imgUrl={data.imgUrl}
        name={data.name}
        productId={data.id}
        desc={data.desc}
        price={data.price}
        listed={data.listed}
        userId={authDetails.id}
      />

    </>
  )
}

export default Product