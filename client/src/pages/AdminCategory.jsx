import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useQuery } from "react-query";
import { countProductsByCategory } from "../api/product";
import AdminProductCard from "../components/AdminProductCard";

const AdminCategory = () => {

  const { id } = useParams()

  const { isLoading, isError, data, error } = useQuery(
    ['productsAdmin', id], () => countProductsByCategory(id))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  
  const category = data?.rows?.[0]?.Category?.name
  const count = data?.count
  console.log(data)

  const productCards = data.rows.map((item) => {
    return(
        <AdminProductCard
            imgUrl={item.imgUrl}
            name={item.name}
            price={item.price}
            date={item.createdAt}
            key={item.id}
            listed={item.listed}
            productId={item.id}
        />
    )
  })

  return (
    
    <>
        <div className="text-sm breadcrumbs">
            <ul>
            <li><Link to="/admin">Admin</Link></li> 
            <li><Link to="/adminlistings">Listings</Link></li> 
            <li><Link to="/adminlistings">Categories</Link></li> 
            <li>{category}</li> 
                    
            </ul>
        </div>
        <div className="text-2xl mb-2">{category}</div>
        <button className="btn btn-wide my-2">Edit Category</button>

        <div className="text-lg mb-2">Listings: {count}</div>

        <div className="grid gap-2 grid-cols-1">
            {productCards}
            {data.length===0 && <div>No products</div>}
        </div>
      

    </>
  )
}

export default AdminCategory