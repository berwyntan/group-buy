import { useState } from "react";
import { useMutation } from "react-query";
import useToastSuccess from "../hooks/useToastSuccess";
import useToastError from "../hooks/useToastError";
import { useForm } from "react-hook-form";
import { updateProductById, updateProductListingById } from "../api/product";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const AdminProductDetail = ({ imgUrl, imgUrl1, imgUrl2, imgUrl3, imgUrl4, name, productId, desc, price, listed, categoryId }) => {
  
  const [ productName, setProductName ] = useState(name)
  // const [ localImgUrl, setLocalImgUrl ] = useState(imgUrl)
  // const [ localImgUrl1, setLocalImgUrl1 ] = useState(imgUrl1)
  // const [ localImgUrl2, setLocalImgUrl2 ] = useState(imgUrl2)
  // const [ localImgUrl3, setLocalImgUrl3 ] = useState(imgUrl3)
  // const [ localImgUrl4, setLocalImgUrl4 ] = useState(imgUrl4)
  const [ productDesc, setProductDesc ] = useState(desc)
  const [ productPrice, setProductPrice ] = useState(price)
  // console.log(imgUrl.split("/").slice(-1)[0].replace('.jpg', '').replace('.png', ''))
  
  
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
          // navigate("/admin/updateproduct")
            
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
        id: productId,
        imgUrl: document.getElementById("uploadedimage0")?.getAttribute("src"),
        imgUrl1: document.getElementById("uploadedimage1")?.getAttribute("src"),
        imgUrl2: document.getElementById("uploadedimage2")?.getAttribute("src"),
        imgUrl3: document.getElementById("uploadedimage3")?.getAttribute("src"),
        imgUrl4: document.getElementById("uploadedimage4")?.getAttribute("src")
      }
      // console.log(newFormData)
      mutation.mutate(newFormData)
    }  

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

          {/* <label className="input-group flex flex-col items-center my-3">
          <div className="my-1">Image URL</div>
          <textarea placeholder="Image URL" value={productImgUrl} {...register("imgUrl", { 
            required: true, onChange: (e) => setProductImgUrl(e.target.value) })} 
            className="input input-bordered w-full max-w-xs"/>
          </label>

          <figure><img className="p-8" src={imgUrl} alt={name}/></figure> */}
          <CloudinaryUploadWidget />
          <div className={`relative my-2 ${imgUrl || "hidden"}`} id="container0">
          <figure><img className="p-2" id="uploadedimage0" src={imgUrl || null} alt={productName} data-publicid=""/></figure>
          </div>

          <div className={`relative my-2 ${imgUrl1 || "hidden"}`} id="container1">
          <figure><img className="p-2" id="uploadedimage1" src={imgUrl1 || null} alt={productName} data-publicid=""/></figure>
          <div className="btn btn-sm btn-outline absolute top-6 right-6" 
            onClick={() => {
              document.getElementById("uploadedimage1").setAttribute("src", null);
              document.getElementById("container1").classList.add("hidden");
            }}>Delete</div>
          </div>
          <div className={`relative my-2 ${imgUrl2 || "hidden"}`} id="container2">
          <figure><img className="p-2" id="uploadedimage2" src={imgUrl2 || null} alt={productName} data-publicid=""/></figure>
          <div className="btn btn-sm btn-outline absolute top-6 right-6" 
            onClick={() => {
              document.getElementById("uploadedimage2").setAttribute("src", null);
              document.getElementById("container2").classList.add("hidden");
            }}>Delete</div>
          </div>
          <div className={`relative my-2 ${imgUrl3 || "hidden"}`} id="container3">
          <figure><img className="p-2" id="uploadedimage3" src={imgUrl3 || null} alt={productName} data-publicid=""/></figure>
          <div className="btn btn-sm btn-outline absolute top-6 right-6" 
            onClick={() => {
              document.getElementById("uploadedimage3").setAttribute("src", null);
              document.getElementById("container3").classList.add("hidden");
            }}>Delete</div>
          </div>
          <div className={`relative my-2 ${imgUrl4 || "hidden"}`} id="container4">
          <figure><img className="p-2" id="uploadedimage4" src={imgUrl4 || null} alt={productName} data-publicid=""/></figure>
          <div className="btn btn-sm btn-outline absolute top-6 right-6" 
            onClick={() => {
              document.getElementById("uploadedimage4").setAttribute("src", null);
              document.getElementById("container4").classList.add("hidden");
            }}>Delete</div>
          </div>
          
          {/* <div className={`relative my-2 ${imgUrl4 || "hidden"}`}>
          <figure><img className="p-2" id="uploadedimage0" src={imgUrl4 || null} alt={productName} data-publicid=""/></figure>
          <button className="btn btn-sm btn-outline absolute top-6 right-6" 
            onClick={() => document.getElementById("uploadedimage4").setAttribute("src", null)}>Delete</button>
          </div> */}
          
          {/* <figure><img className={`p-8 ${imgUrl4 || "hidden"}`} id="uploadedimage4" src={imgUrl4 || null} alt={productName} data-publicid=""/></figure> */}

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

            {/* {Boolean(errors.name) || errors.imgUrl?.type === 'required' && <span>Image URL is required</span>} */}
            
            {Boolean(errors.name) || errors.desc?.type === 'required' && <span>Description is required</span>}
             
            {Boolean(errors.name) || Boolean(errors.desc) || errors.price?.type === 'required' && <span>Price is required</span>}        
            {Boolean(errors.name) || Boolean(errors.desc) || errors.price?.type === 'valueAsNumber' && <span>Price must be a number</span>}        
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