import { Link } from "react-router-dom";

const ProductCard = ({ imgUrl, name, id, desc, price, listed }) => {
  return (
    <>
        <Link to={`/prod/${id}`}>
        <div className="card card-compact max-w-sm bg-base-100 shadow-xl min-h-72">
            <figure><img className="object-contain p-2 h-40" src={imgUrl} alt={name} /></figure>
            <div className="card-body">
                <div className="text-lg font-semibold text-left line-clamp-2">{name}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-xl">$</div>
                    <div className="ml-1 text-2xl font-medium">{price}</div>
                  </div>                  
                  <div className="badge badge-primary">available</div>
                </div>               
                
                <div className="card-actions justify-end">
                
                </div>
            </div>
        </div>
        </Link>
    </>
  )
}

export default ProductCard