

const SelectQuantity = ({ qty }) => {
  return (
    <>
    <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold mb-2">Qty:</h3>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='1' && 'btn-active'}`} 
            onClick={updateQty}>1</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='2' && 'btn-active'}`} 
            onClick={updateQty}>2</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='3' && 'btn-active'}`} 
            onClick={updateQty}>3</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='4' && 'btn-active'}`} 
            onClick={updateQty}>4</label>
            <label htmlFor="my-modal" 
            className={`btn btn-outline btn-wide text-lg ${qty==='5' && 'btn-active'}`} 
            onClick={updateQty}>5</label>
          </div>
        </div>
    </>
  )
}

export default SelectQuantity