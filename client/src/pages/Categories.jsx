import CategoryCard from "../components/CategoryCard";
import { useQuery } from 'react-query'
import { getAllCategories } from "../api/category";

const Categories = () => {

  const { isLoading, isError, data, error } = useQuery(
    ['categories'], getAllCategories)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // console.log(data)
  const categoryCards = data.map(cat => {
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