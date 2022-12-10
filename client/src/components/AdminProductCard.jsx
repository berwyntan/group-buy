import { Link } from "react-router-dom";

const AdminProductCard = (
    { 
        imgUrl, name, productId, price, listed, date, quantity, cancel, fulfil, paid, collect 
    }) => {

        
        const sliceDate = date?.slice(0, 10)
        
  return (
    <>
        <Link to={`/admin/product/${productId}`}>
        <div className="card card-side bg-base-100 shadow-xl my-2 p-1">
        <figure><img className="object-contain p-2 h-40" src={imgUrl} alt={name}/></figure>
        <div className="card-body p-1">
            <h2 className="text-xl font-semibold line-clamp-2">{name}</h2>

            <div className="card-actions justify-end flex-col items-end">

            <div className="flex mr-5">
                <div className="mr-2">Listed on</div>
                <div className="">{sliceDate}</div>                
            </div>

            <div className="flex mr-5">
                {listed ? 
                    <div className="badge badge-primary">open for orders</div> : 
                    <div className="badge">listing closed</div>
                }
            </div>            

            <div className="flex mr-5">
                <div className="text-lg mr-2">Price:</div>
                <div className="text-lg">$</div>
                <div className="text-lg font-semibold">{price}</div>
            </div>
            
            
            </div>
        </div>
        </div>
        </Link>
    </>
  )
}

export default AdminProductCard