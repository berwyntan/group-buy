import axios from "axios";

export const whatsapp = async (data) => {
    try {
        
        const response = await axios.post("/api/sms", data,
        {
            headers: { 'Content-Type': 'application/json' },
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