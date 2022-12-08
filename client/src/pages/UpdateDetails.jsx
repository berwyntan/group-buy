import { useForm } from "react-hook-form";
import useGroupBuyStore from "../store/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateDetails = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const updateUser = useGroupBuyStore((state) => state.updateUser)
  const oldMobile = authDetails.mobile.toString()
  const oldName = authDetails.name
  const [ name, setName ] = useState(authDetails.name)
  const [ mobile, setMobile ] = useState(authDetails.mobile)
  const [ error, setError ] = useState("") 
  const [ password, setPassword ] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (formData) => {
    
    if (formData.name === oldName && formData.mobile === oldMobile) {
           
      toast.error('Error: no change to details', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });      
        return
    }
    const data = {...formData, oldMobile: oldMobile}
    // const result = await signup(formData);
    // console.log(result)
    console.log(data)
    const result = await updateUser(data)
    console.log(result.data)
    if (result.statusText !== "OK") {
      return setError(result.data.message)
    } 
    toast.success('User details updated', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }); 
    
    setPassword("")
    
  }
 
  useEffect(() => {
    setError("")
  }, [name, mobile, password])
  

  return (
    <>
            
    <div className="text-2xl mb-2">Update Account Details</div>

    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Name" value={name} {...register("name", 
        { required: true, onChange: (e) => setName(e.target.value), maxLength: 30 },)} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Mobile" value={mobile} {...register("mobile", { 
        required: true, pattern: /^[0-9]*$/i, minLength: 8, maxLength: 8,
          onChange: (e) => setMobile(e.target.value) })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      
      <label className="input-group flex flex-col items-center my-3">
      {/* include validation with required or other standard HTML validation rules */}
      <input  placeholder="Confirm Password" value={password} {...register("password", 
        { required: true, onChange: (e) => setPassword(e.target.value) })} 
        className="input input-bordered w-full max-w-xs"/>
      {/* errors will return when field validation fails  */}      
      </label>

      <div className="my-4">
        {errors.name?.type === 'required' && <span>Name is required</span>}

        {Boolean(errors.name) || errors.mobile?.type === 'required' && <span>Mobile number is required</span>}
        {Boolean(errors.name) || errors.mobile?.type === 'minLength' && <span>Mobile number is 8 digits only</span>}
        {Boolean(errors.name) || errors.mobile?.type === 'maxLength' && <span>Mobile number is 8 digits only</span>}
        {Boolean(errors.name) || errors.mobile?.type === 'pattern' && <span>Mobile number only</span>}  

        {Boolean(errors.name) || Boolean(errors.mobile) || errors.password?.type === 'required' && <span>Password is required</span>}
             
      </div>

      <div className="my-1">{error}</div>
      
      <button className="btn btn-primary btn-wide" type="submit">Update</button>
      </div>
    </form>

        
    </>
  );
  
}

export default UpdateDetails
