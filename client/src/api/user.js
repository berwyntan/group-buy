import axios from "axios";

export const login = async (data) => {
    try {
        
        const response = await axios.post("/api/user/login", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        if (response.statusText === "OK") {
            
            return response.data
        }                
    
    } catch (error) {
        console.log(error)
        return error.response.data.message
    }
}