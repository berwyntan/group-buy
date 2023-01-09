import axios from "axios";
import useAccessToken from "../hooks/useAuthDetails";
// import useGroupBuyStore from "../store/store";

// const authDetails = useGroupBuyStore((state) => state.authDetails)
// const accessToken = authDetails.accessToken


export const whatsapp = async (data, accessToken) => {   
    try {        
        const response = await axios.post("/api/sms", data,
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        }
        )
        console.log(response)
        return response
                       
    } catch (error) {
        console.log(error)
        return error.response
    }
}