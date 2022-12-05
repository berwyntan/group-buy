import useGroupBuyStore from "../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {

  const { id } = useParams()
  const getProductsByCategory = useGroupBuyStore((state) => state.getProductsByCategory)

  useEffect(() => {
    getProductsByCategory(id)      
  }, [])

  return (
    
    <>
      <div>Category</div>
      <div>Product Cards</div>
      

    </>
  )
}

export default Category