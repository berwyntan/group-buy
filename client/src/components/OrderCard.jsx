import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const OrderCard = (
    { 
        imgUrl, name, id, desc, price, listed, date, quantity, cancel, fulfil, paid 
    }) => {

        const [ status, setStatus ] = useState("")
        const [ badge, setBadge ] = useState("")
        const statusCheck = (cancel, fulfil, paid) => {
            if (!cancel && !fulfil && !paid) {
                setStatus("Payment pending")
                setBadge("badge-primary")
            }
            if (!cancel && !fulfil && paid) {
                setStatus("Fulfiling order")
                setBadge("badge-secondary")
            }
            if (!cancel && fulfil && paid) {
                setStatus("Collected")
                setBadge("badge-success")
            }
            if (cancel && !fulfil && !paid) {
                setStatus("Order cancelled")
                setBadge("badge-warning")
            }
            if (cancel && !fulfil && paid) {
                setStatus("Refund pending")
                setBadge("badge-info")
            }
        }

        useEffect(() => statusCheck(cancel, fulfil, paid), [])
        const sliceDate = date.slice(0, 10)
        
  return (
    <>
        <Link to={`/prod/${id}`}>
        <div className="card card-side bg-base-100 shadow-xl my-2 p-1">
        <figure><img className="object-contain p-2 h-40" src={imgUrl} alt={name}/></figure>
        <div className="card-body p-1">
            <h2 className="text-xl font-semibold line-clamp-2">{name}</h2>
            <div className="card-actions justify-end flex-col items-end">
            <div className="flex mr-5">
                <div className="text-lg mr-2">Quantity:</div>
                <div className="text-lg font-semibold">{quantity}</div>
            </div>
            <div className="flex mr-5">
                <div className="text-lg mr-2">Total:</div>
                <div className="text-lg">$</div>
                <div className="text-xl font-semibold">{quantity * price}</div>
            </div>
            
            <div className="flex mr-5">
                <div className="mr-2">Ordered on</div>
                <div className="">{sliceDate}</div>
            </div>
            
            <div className={`mr-5 text-lg badge ${badge}`}>{status}</div>
            {/* <button className="btn btn-primary">Watch</button> */}
            </div>
        </div>
        </div>
        </Link>
    </>
  )
}

export default OrderCard