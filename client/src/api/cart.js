import axios from "axios";

export const getCartByUserId = async (id) => {
    try {
        
        const response = await axios.get(`/api/cart/user/${id}`)
        console.log(response)
        
        return response
            
                        
    } catch (error) {
        console.log(error)
    }
  }

export const addToCart = async(data) => {
    try {
        const response = await axios.post("/api/cart", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        )
        
        return response
        
    } catch (error) {
        console.log(error)
        return error.response
    }
}