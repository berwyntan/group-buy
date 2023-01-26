import { useMutation, useQueryClient } from "react-query";
import { clearCartByUserId } from "../api/cart";
import useToastSuccess from "./useToastSuccess";
import useToastError from "./useToastError";
import { useNavigate } from "react-router-dom";
import useAuthDetails from "./useAuthDetails";

const useClearCart = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { accessToken } = useAuthDetails()
    const { mutate } = useMutation(formData => clearCartByUserId(formData, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {          
          useToastSuccess("Checkout complete")  
          queryClient.invalidateQueries('countCart') 
          navigate("/updateorder")                   
        } else if (response.status === 204) {
          useToastError("Error: Cannot clear cart")
        } else {
          useToastError("Error: Cannot checkout")
        }
      },
    })
    return mutate
}

export default useClearCart