import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getOrderByIdAdmin } from "../api/order";
import AdminOrderCard from "../components/AdminOrderCard";
import LoadingSpinner from "../components/LoadingSpinner";

import OrderCrm from "../components/crm/OrderCrm";

const AdminUpdateOrder = () => {
    const { id } = useParams()
    
    
    const { isLoading, isError, data, error } = useQuery(
        ['orderAdmin', id], () => getOrderByIdAdmin(id), {refetchInterval: 1000})
  
    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
    return <span>Error: {error.message}</span>
    }

    
    
    return (
        <>
            <div className="text-sm breadcrumbs">
              <ul>
              <li><Link to="/adminhome">Admin</Link></li> 
              <li><Link to="/adminlistings">Listings</Link></li> 
              <li><Link to="/adminlistings">Categories</Link></li> 
              <li><Link to={`/admin/cat/${data.category.id}`}>{data.category.name}</Link></li> 
                      
              </ul>
            </div>


            <div className="text-2xl mb-2">Update Order</div>
            <div className="">{id}</div>
            <AdminOrderCard
                imgUrl={data.product.Product.imgUrl}
                name={data.product.Product.name}
                id={data.product.ProductId}
                price={data.product.Product.price}
                date={data.product.createdAt}
                quantity={data.product.quantity}
                cancel={data.product.cancel}
                fulfil={data.product.fulfil}
                paid={data.product.paid}
                collect={data.product.collect}
                buyerName={data.user.User.name}
                mobile={data.user.User.mobile}
            />
            
            <OrderCrm 
                id={id} 
                buyerName={data.user.User.name}
                price={data.product.Product.price}
                quantity={data.product.quantity}
                name={data.product.Product.name}
                mobile={data.user.User.mobile}
            />

            
            
        </>
        
    )
}

export default AdminUpdateOrder