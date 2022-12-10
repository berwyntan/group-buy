import { useParams } from "react-router-dom";
import { getOrdersByProductId } from "../api/order";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard"

const AdminOrders = () => {
    const { id } = useParams()
    
    const { isLoading, isError, data, error } = useQuery(
        ['ordersAdmin', id], () => getOrdersByProductId(id))
    
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }

    console.log(data)
    const isListed = data.product.listed

    const orderRows = data.result.map((row, i) => {
      let status;
      
      if (!row.cancel && !row.fulfil && !row.paid && !row.collect) {
          status = ("Payment pending")
          
      } else if (!row.cancel && !row.fulfil && row.paid && !row.collect) {
          status = ("Fulfilling order")
          
      } else if (!row.cancel && row.fulfil && row.paid && !row.collect) {
          status = ("Ready for collection")
          
      } else if (row.cancel && !row.fulfil && !row.paid && !row.collect) {
          status = ("Order cancelled")
          
      } else if (row.cancel && !row.fulfil && row.paid && !row.collect) {
          status = ("Refund pending")
          
      } else if (!row.cancel && row.fulfil && row.paid && row.collect) {
          status = ("Collected")
          
      }
      

      return(
        <tr>
          <td>{row.User.mobile}</td>  
          <td>{row.quantity}</td>  
          <td>
            <button className="btn">Update</button>
          </td>
          <td>{status}</td>  
        </tr>
      )
    })
    

    return (
        <>
          <div className="text-2xl mb-2">Admin Order by Product</div>
          <ProductCard
            imgUrl={data.product.imgUrl}
            name={data.product.name}
            id={data.product.id}
            price={data.product.price}
            listed={data.product.listed}
          />
          <div className="text-xl mb-2 my-2">Orders</div>

          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Mobile</th> 
                  <th>Qty</th>
                  <th></th>                    
                  <th>Status</th>            
                </tr>
              </thead> 
              <tbody>
                {orderRows}
              </tbody> 
              <tfoot>
                <tr>
                  <th>Mobile</th> 
                  <th>Qty</th>
                  <th></th>                    
                  <th>Status</th>        
                </tr>
              </tfoot>
            </table>
          </div>
        </>
    )
}

export default AdminOrders

{/* <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn btn-sm m-1">Update</label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border">
                <li className="text-lg"><a>Payment pending</a></li>
                <li className="text-lg"><a>Cancelled</a></li>
                <li className="text-lg"><a>Paid, fulfilling order</a></li>
                <li className="text-lg"><a>Refund pending</a></li>
                <li className="text-lg"><a>Ready for collection</a></li>
                <li className="text-lg"><a>Collected</a></li>
              </ul>
            </div> */}