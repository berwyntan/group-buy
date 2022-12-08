import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useGroupBuyStore from "../store/store";
import { useState } from "react";
import { login } from "../api/user";
import { useMutation } from 'react-query'

const Login = () => {

  const [error, setError] = useState("")
  const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
  const navigate = useNavigate();

  const mutation = useMutation(formData => login(formData), 
    {
      onError: (response) => {
        
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {
          setAuthDetails(response.data);
          navigate(-1)
        } else {
          setError(response.data.message)
        }
      },
    })
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const login = useGroupBuyStore((state) => state.login)
  const onSubmit = (formData) => {
      
    mutation.mutate(formData) 
    
  }
 
  return (

    <>
    <div className="text-2xl mb-2">Log In</div>
    
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Mobile" {...register("mobile", { 
        required: true, pattern: /^[0-9]*$/i, minLength: 8, maxLength: 8, onChange: () => setError("") 
      })} 
        className="input input-bordered border border-black w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* include validation with required or other standard HTML validation rules */}
      <input placeholder="Password" {...register("password", { 
        required: true, minLength: 5, pattern: /^[a-z0-9]+$/i, onChange: () => setError("")
      })} 
        className="input input-bordered border border-black w-full max-w-xs"/>
      {/* errors will return when field validation fails  */}      
      </label>

      
      <div className="my-4">
        
        {errors.mobile?.type === 'required' && <span>Mobile number is required</span>}
        {errors.mobile?.type === 'minLength' && <span>Mobile number is 8 digits only</span>}
        {errors.mobile?.type === 'maxLength' && <span>Mobile number is 8 digits only</span>}
        {errors.mobile?.type === 'pattern' && <span>Mobile number only</span>}  

        {Boolean(errors.mobile) || errors.password?.type === 'required' && <span>Password is required</span>}
        {Boolean(errors.mobile) || errors.password?.type === 'minLength' && <span>Password requires minimum of 5 characters</span>}
        {Boolean(errors.mobile) || errors.password?.type === 'pattern' && <span>Password can only have alphanumeric characters</span>}  
        

      </div>
      <div className="my-1">{error}</div>
      {mutation.isLoading && <div>Logging In...</div>} 
      {mutation.isError && <div>{mutation.error}</div>} 

      <button className="btn btn-primary btn-wide" type="submit">Log In</button>
      </div>
    </form>   

     

    <div className="mt-6 text-lg link">
      <Link to="/signup">
        Don't have an account? Sign up.
      </Link>     
    </div>
    
    </>
  );
}

export default Login