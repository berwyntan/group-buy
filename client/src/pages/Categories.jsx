import useGroupBuyStore from "../store/store";
import { useEffect } from "react";
import CategoryCard from "../components/CategoryCard";


const Categories = () => {

  const getAllCategories = useGroupBuyStore((state) => state.getAllCategories)
  const categories = useGroupBuyStore((state) => state.categories)
  // const isLoading = useGroupBuyStore((state) => state.isLoading)
  // const setIsLoading = useGroupBuyStore((state) => state.setIsLoading)

  // setIsLoading(true)
  
  useEffect(() => {

    getAllCategories()      
    
  }, [])

  
  const categoryCards = categories.map(cat => {
    return(
      <CategoryCard 
      key={cat.id}
      name={cat.name}
      imgUrl={cat.imgUrl}
      id={cat.id}
    />
    )
    
  })
  

  return (
    <>
      <div>Categories</div>
      <div className="grid gap-2 grid-cols-2">
        {categoryCards}
      </div>
      

    </>
  )
}

export default Categories