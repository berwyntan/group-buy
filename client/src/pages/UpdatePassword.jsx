import { useForm } from "react-hook-form";
import useGroupBuyStore from "../store/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdatePassword = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const updatePassword = useGroupBuyStore((state) => state.updatePassword)
  const mobile = authDetails.mobile.toString()
      
  const [ error, setError ] = useState("") 
  const [ currentPassword, setCurrentPassword ] = useState("")
  const [ newPassword, setNewPassword ] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (formData) => {
    
    const data = {...formData, mobile: mobile}
    console.log(data)
    const result = await updatePassword(data)
    console.log(result.data)
    if (result.statusText !== "OK") {
      return setError(result.data.message)
    } 
    toast.success('Password updated', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }); 
    
    setCurrentPassword("")
    setNewPassword("")
  }
 
  useEffect(() => {
    setError("")
  }, [currentPassword, newPassword])
  

  return (
    <>
        
    <div className="text-2xl mb-2">Update Password</div>

    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Current password" value={currentPassword} {...register("oldPassword", 
        { required: true, onChange: (e) => setCurrentPassword(e.target.value) },)} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="New password" value={newPassword} {...register("password", 
        { required: true, onChange: (e) => setNewPassword(e.target.value), minLength: 5, pattern: /^[a-z0-9]+$/i })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>    
     

      <div className="my-4">
        {errors.oldPassword?.type === 'required' && <span>Current password is required</span>}
        
        {Boolean(errors.oldPassword) || errors.password?.type === 'required' && <span>New password is required</span>}
        {Boolean(errors.oldPassword) || errors.password?.type === 'minLength' && <span>Password must have an least 5 characters</span>}
        {Boolean(errors.oldPassword) || errors.password?.type === 'pattern' && <span>Password can only have alphanumeric characters</span>}
             
      </div>

      <div className="my-1">{error}</div>
      
      <button className="btn btn-primary btn-wide" type="submit">Update</button>
      </div>
    </form>

        
    </>
  );
  
}

export default UpdatePassword