import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getOrderByIdAdmin } from "../api/order";
import useStatusCheck from "../hooks/useStatusCheck";
import AdminOrderCard from "../components/AdminOrderCard";
import { updateOrder } from "../api/order";
import useGroupBuyStore from "../store/store";
import { useEffect } from "react";

const AdminUpdateOrder = () => {
    const { id } = useParams()
    const setOrderId = useGroupBuyStore((state) => state.setOrderId)

    const navigate = useNavigate()
    
    const { isLoading, isError, data, error } = useQuery(
        ['orderAdmin', id], () => getOrderByIdAdmin(id))
  
    if (isLoading) {
    return <span>Loading...</span>
    }

    if (isError) {
    return <span>Error: {error.message}</span>
    }

    console.log(data)

    // const mutation = useMutation(formData => updateOrder(formData), 
    // {
    //   onError: (response) => {
        
    //     console.log(response)
    //   },
    //   onSuccess: (response) => {
    //     setOrderId(id)
    //     console.log(response)
    //     if (response.status === 200) {
    //       navigate("/admin/updatingorder", {replace: true})
    //     } 
    //   },
    // })

    // const status = useStatusCheck(data?.user.cancel, data?.user.fulfil, data.user.paid, data.user.collect)    
    // console.log(status)

    const paymentMade = () => {
        const formData = {
            "fulfil": "false",
            "cancel": "false",
            "paid": "true",
            "collect": "false",
            "id": id
        }
        
        mutation.mutate(formData)
    }

    useEffect(() => {setOrderId(id)}, [])
    
    return (
        <>
            <div className="text-sm breadcrumbs">
              <ul>
              <li><Link to="/admin">Admin</Link></li> 
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
            <div className="divider">Payment</div>
            <button className="btn btn-success mx-3 my-2">
                WhatsApp: Payment Reminder                
            </button>
            <button className="btn btn-primary mx-3 my-2" onClick={paymentMade}>Payment made</button>            
            <button className="btn btn-success mx-3 my-2">
                WhatsApp: Payment Received                
            </button>

            <div className="divider">Collection</div>
            <button className="btn btn-success mx-3 my-2">WhatsApp: Ready for collection</button>
            <button className="btn btn-primary mx-3 my-2">Collected</button>

            <div className="divider">Cancellation / Refund</div>
            <button className="btn btn-primary mx-3 my-2">Order cancelled</button>
            <button className="btn btn-primary mx-3 my-2">Refund pending</button>
            <button className="btn btn-success mx-3 my-2">
                WhatsApp: Refund processed                
            </button>
            
        </>
        
    )
}

export default AdminUpdateOrder