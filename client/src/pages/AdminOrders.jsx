import { useParams, Link } from "react-router-dom";
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
    const sellPrice = data.product.price

    const quantities = {
      ordered: 0,
      paid: 0,
      collected: 0,
      cancelled: 0,
      refunded: 0
    }

    const TableRow = ({mobile, qty, status, id}) => {
      return(
        <tr>
          <td>{mobile}</td>  
          <td>{qty}</td>  
          <td>
            <Link to={`/admin/updateorder/${id}`}>
            <button className="btn">Update</button>
            </Link>
          </td>
          <td>{status}</td>  
        </tr>
      )
    } 

    const orderRows = data?.result.map((row, i) => {

      // to count order quantities
      quantities.ordered += row.quantity

      // to determine status and quantities
      let status;      
      if (!row.cancel && !row.fulfil && !row.paid && !row.collect) {
          status = ("Payment pending")
          
      } else if (!row.cancel && !row.fulfil && row.paid && !row.collect) {
          status = ("Fulfilling order")
          quantities.paid += row.quantity
      } else if (!row.cancel && row.fulfil && row.paid && !row.collect) {
          status = ("Ready for collection")
          
      } else if (row.cancel && !row.fulfil && !row.paid && !row.collect) {
          status = ("Order cancelled")
          quantities.cancelled += row.quantity
      } else if (row.cancel && !row.fulfil && row.paid && !row.collect) {
          status = ("Refund pending")
          quantities.refunded += row.quantity
      } else if (!row.cancel && row.fulfil && row.paid && row.collect) {
          status = ("Collected")
          quantities.collected += row.quantity
      }

      return(
        
        <TableRow
          mobile={row.User.mobile}
          qty={row.quantity}
          status={status}
          key={row.id}
          id={row.id}
        />
      )
    })
    
    console.log(quantities)

    return (
        <>
          <div className="text-sm breadcrumbs">
              <ul>
              <li><Link to="/admin">Admin</Link></li> 
              <li><Link to="/adminlistings">Listings</Link></li> 
              <li><Link to="/adminlistings">Categories</Link></li> 
              <li><Link to={`/admin/cat/${data.product.categoryId}`}>{data.product.Category.name}</Link></li> 
                      
              </ul>
          </div>

          <div className="text-2xl mb-2">Product Orders</div>
          <ProductCard
            imgUrl={data.product.imgUrl}
            name={data.product.name}
            id={data.product.id}
            price={data.product.price}
            listed={data.product.listed}
          />
          
          <div className="overflow-x-auto">
          <table className="table table-compact w-full my-2">
              <thead>
                <tr>
                  <th>Status</th> 
                  <th>Qty</th>
                  <th>Total Amount</th>                             
                </tr>
              </thead> 
              <tbody>
              <tr>
                <td>Listing</td>  
                <td>{isListed ? <span>Open</span> : <span>Closed</span>}</td>  
                <td></td>                
              </tr>
              <tr>
                <td>Orders</td>  
                <td>{quantities.ordered}</td>  
                <td></td>                
              </tr>
              <tr>
                <td className="font-bold">To Fulfil</td>  
                <td className="font-bold">{quantities.ordered - quantities.cancelled - quantities.refunded}</td>               
                <td className="font-bold">$ {(quantities.ordered - quantities.cancelled - quantities.refunded) * sellPrice}</td>               
              </tr>
              <tr>
                <td>Paid</td>  
                <td>{quantities.paid}</td>                  
                <td>$ {quantities.paid * sellPrice}</td>                  
              </tr>
              <tr>
                <td>Unpaid</td>  
                <td>{quantities.ordered - quantities.paid - quantities.cancelled - quantities.refunded}</td>               
                <td>$ {(quantities.ordered - quantities.paid - quantities.cancelled - quantities.refunded) * sellPrice}</td>               
              </tr>
              <tr>
                <td>Collected</td>  
                <td>{quantities.collected}</td>                
                <td></td>                
              </tr>
              <tr>
                <td className="italic">Cancelled</td>  
                <td className="italic">{quantities.cancelled}</td>                
                <td className="italic">$ {quantities.cancelled * sellPrice}</td>                
              </tr>
              <tr>
                <td className="italic">Refunded</td>  
                <td className="italic">{quantities.refunded}</td>               
                <td className="italic">$ {quantities.refunded * sellPrice}</td>               
              </tr>
              
              </tbody> 
              <tfoot>
                <tr>
                  <th>Status</th> 
                  <th>Qty</th>
                  <th>Total Amount</th>                             
                </tr>
              </tfoot>
            </table>
            </div>

          <button className="btn btn-primary mx-3 my-2">WhatsApp: Inform Paid Orders - Ready for collection </button>
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