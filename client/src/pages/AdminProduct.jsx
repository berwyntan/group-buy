import AdminProductDetail from "../components/AdminProductDetail";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getProductById } from "../api/product";

const AdminProduct = () => {

  const { id } = useParams()
  
  const { isLoading, isError, data, error } = useQuery(
    ['product', id], () => getProductById(id))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // console.log(data)
  const category = data.Category.name
  const categoryId = data.CategoryId
  const productId = data.id

  return (
    
    <>
      <div className="text-sm breadcrumbs">
          <ul>
          <li><Link to="/admin">Admin</Link></li> 
          <li><Link to="/adminlistings">Listings</Link></li> 
          <li><Link to="/adminlistings">Categories</Link></li> 
          <li><Link to={`/admin/cat/${categoryId}`}>{category}</Link></li> 
                  
          </ul>
      </div>

      <div className="text-2xl mb-2">Admin: Product</div>      
      
      <div className="flex flex-col">

      <Link to={`/admin/orders/${productId}`}>
      <button className="btn btn-wide mx-auto">View Orders for Product</button>
      </Link>
      
      <AdminProductDetail 
        imgUrl={data.imgUrl}
        name={data.name}
        desc={data.desc}
        price={data.price}
        categoryId={data.CategoryId}
        productId={data.id}
        listed={data.listed}
      />

      </div>

    </>
    
  )
}

export default AdminProduct