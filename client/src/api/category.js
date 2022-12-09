import axios from "axios";

export const getAllCategories = async () => {
    try {
        
        const response = await axios.get("/api/category")
        
        if (response.status === 200) return response.data
          
                           
    } catch (error) {
        console.log(error)
    } 
}      