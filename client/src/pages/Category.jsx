import useGroupBuyStore from "../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Category = () => {

  const { id } = useParams()
  const getProductsByCategory = useGroupBuyStore((state) => state.getProductsByCategory)

  useEffect(() => {
    getProductsByCategory(id)      
  }, [])

  const products = useGroupBuyStore((state) => state.products)
  const productCards = products.map(prod => {
    return (
      <ProductCard 
        imgUrl={prod.imgUrl}
        name={prod.name}
        id={prod.id}
        desc={prod.desc}
        price={prod.price}
        listed={prod.listed}
        key={prod.id}
      />
    )
  })

  return (
    
    <>
      <div>Category</div>
      <div className="grid gap-2 grid-cols-2">
        {productCards}
      </div>
      

    </>
  )
}

export default Category