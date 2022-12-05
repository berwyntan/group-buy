import { Link } from "react-router-dom";

const ProductCard = ({ imgUrl, name, id, desc, price, listed }) => {
  return (
    <>
        <Link to={`/prod/${id}`}>
        <div className="card card-compact max-w-sm bg-base-100 shadow-xl max-h-60">
            <figure><img className="object-cover h-40" src={imgUrl} alt={name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                
                <div className="card-actions justify-end">
                
                </div>
            </div>
        </div>
        </Link>
    </>
  )
}

export default ProductCard