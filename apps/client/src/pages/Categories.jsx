import CategoryCard from "../components/CategoryCard";
import { useQuery } from 'react-query'
import { getAllCategories } from "../api/category";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Categories = () => {

  const { isLoading, isError, data, error } = useQuery(
    ['categories'], getAllCategories)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

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
      <div className="text-sm breadcrumbs mt-1 mb-3">
        <ul>
          <li><Link to="/">Categories</Link></li>           
          
        </ul>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {data && categoryCards}
      </div>      

    </>
  )
}

export default Categories