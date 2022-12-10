import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useToastSuccess from "../hooks/useToastSuccess";
import useToastError from "../hooks/useToastError";
import { useForm } from "react-hook-form";
import { updateProductById, updateProductListingById } from "../api/product";
import useGroupBuyStore from "../store/store";
import { useEffect } from "react";

const AdminProductDetail = ({ imgUrl, name, productId, desc, price, listed, categoryId }) => {
  
  const [ productName, setProductName ] = useState(name)
  const [ productImgUrl, setProductImgUrl ] = useState(imgUrl)
  const [ productDesc, setProductDesc ] = useState(desc)
  const [ productPrice, setProductPrice ] = useState(price)

  const setProductId = useGroupBuyStore((state) => state.setProductId)

  const navigate = useNavigate()

  const mutation = useMutation(formData => updateProductById(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response?.status === 200) {
          
          useToastSuccess("Product updated")
            
        } else {

          useToastError("Error: Product not updated")          
        }
      },
    })

  const listingMutation = useMutation(id => updateProductListingById(id), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        console.log(response)
        if (response?.status === 200) {
          
          useToastSuccess("Listing updated")
          navigate("/admin/updateproduct")
            
        } else {

          useToastError("Error: Product not updated")          
        }
      },
    })

    const changeListing = () => {
      
      listingMutation.mutate(productId)
    }

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (formData) => {
    
      // console.log(formData)
      const newFormData = {
        ...formData,
        listed: listed,
        id: productId
      }
      // console.log(newFormData)
      mutation.mutate(newFormData)
    }

    useEffect(() => {setProductId(productId)}, [])

  return (
    <>
        {listed && <button className="btn btn-wide mx-auto my-3" 
          onClick={changeListing}>Close Product Listing</button>}
        {!listed && <button className="btn btn-wide mx-auto my-3"
          onClick={changeListing}>Open Product Listing</button>}
        {mutation.isLoading && <div>Updating...</div>} 

        <div className="card md:card-side bg-base-100 shadow-xl">        
        <div className="mt-2 text-lg">Update Product Details</div>

        <div className="card-body">
            
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div className="flex flex-col items-center">

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Product name</div>
          <textarea placeholder="Product name" value={productName} {...register("name", { 
            required: true, onChange: (e) => setProductName(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Image URL</div>
          <textarea placeholder="Image URL" value={productImgUrl} {...register("imgUrl", { 
            required: true, onChange: (e) => setProductImgUrl(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          <figure><img className="p-8" src={imgUrl} alt={name}/></figure>

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Description</div>
          <textarea placeholder="Product description" value={productDesc} {...register("desc", { 
            required: true, onChange: (e) => setProductDesc(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Price</div>
          <input type="number" placeholder="Price" value={productPrice} {...register("price", { 
            required: true, valueAsNumber: true, onChange: (e) => setProductPrice(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>
          
          <div className="my-4">
            {errors.name?.type === 'required' && <span>Product name is required</span>}

            {Boolean(errors.name) || errors.imgUrl?.type === 'required' && <span>Image URL is required</span>}
            
            {Boolean(errors.name) || Boolean(errors.imgUrl) || errors.desc?.type === 'required' && <span>Description is required</span>}
             
            {Boolean(errors.name) || Boolean(errors.imgUrl) || Boolean(errors.desc) || errors.price?.type === 'required' && <span>Price is required</span>}        
            {Boolean(errors.name) || Boolean(errors.imgUrl) || Boolean(errors.desc) || errors.price?.type === 'valueAsNumber' && <span>Price must be a number</span>}        
          </div>

          {/* <div className="my-1">{error}</div> */}
          {mutation.isLoading && <div>Updating...</div>} 
          <button className="btn btn-primary btn-wide" type="submit">Update</button>
          </div>
        </form>
        
        </div>
        </div>
        
    </>
  )
}

export default AdminProductDetail