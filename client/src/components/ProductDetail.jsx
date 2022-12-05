

const ProductDetail = ({ imgUrl, name, id, desc, price, listed, handleOrder }) => {
  return (
    <>
        
        <div className="card md:card-side bg-base-100 shadow-xl">
        <figure><img className="p-2" src={imgUrl} alt={name}/></figure>
        <div className="card-body">
            <div className="flex flex-col items-start">
                <div className="card-title text-left mb-3">{name}</div>
                
            </div>
            
            <div className="card-actions justify-end">
                <div className="text-lg">$</div>
                <div className="text-2xl font-semibold mr-5">{price}</div>
                {listed && <button className="btn btn-primary" onClick={() => handleOrder(id)}>Order</button>}
                {listed || <button className="btn btn-disabled">Closed</button>}
            </div>
            <div className="text-left mt-4">{desc}</div>
        </div>
        </div>
        
    </>
  )
}

export default ProductDetail