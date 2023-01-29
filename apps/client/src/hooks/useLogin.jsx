import useGroupBuyStore from "../store/store";
import { login } from "../api/user";
import { useMutation } from 'react-query'
import { useNavigate } from "react-router-dom";

const useLogin = ({ setError }) => {
    const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
    const navigate = useNavigate();
    const { mutate } = useMutation(formData => login(formData), 
    {
      onError: (response) => {        
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {
          setAuthDetails(response.data);
          navigate("/", {replace: true})
          console.log(response)
        } else {
          setError(response.data.message)
        }
      },
    })
    return mutate
}

export default useLogin