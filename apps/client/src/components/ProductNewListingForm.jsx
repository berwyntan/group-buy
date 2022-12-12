import { useMutation } from "react-query";
import { addNewProduct } from "../api/product";
import { useForm } from "react-hook-form";
import useToastSuccess from "../hooks/useToastSuccess";
import useToastError from "../hooks/useToastError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductNewListingForm = ({ id }) => {

    const [ productName, setProductName ] = useState("")
    const [ productImgUrl, setProductImgUrl ] = useState("")
    const [ productDesc, setProductDesc ] = useState("")
    const [ productPrice, setProductPrice ] = useState(1)

    const navigate = useNavigate()

    const mutation = useMutation(formData => addNewProduct(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response?.status === 201) {
          
            useToastSuccess("New product listed")
            navigate(`/admin/cat/${id}`)
            
        } else {

          useToastError("Error: Product not added")          
        }
      },
    })

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (formData) => {
  
    console.log(formData)
    const newFormData = {
      ...formData,
      price: formData.price.toString(),
      listed: "true",
      CategoryId: id
    }
    console.log(newFormData)
    mutation.mutate(newFormData)
  }

    return (
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

        <figure><img className="p-8" src={productImgUrl} alt={productName}/></figure>

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
        {/* {mutation.isLoading && <div>Updating...</div>}  */}
        <button className="btn btn-primary btn-wide" type="submit">List Product</button>
        </div>
      </form>
    )
}

export default ProductNewListingForm