import axios from "axios";

export const getCartByUserId = async (id) => {
    try {
        
        const response = await axios.get(`/api/cart/user/${id}`)
        // console.log(response)
        
        return response.data
            
                        
    } catch (error) {
        console.log(error)
    }
  }

export const clearCartByUserId = async (id) => {
    try {
        
        const response = await axios.delete(`/api/cart/user/${id}`)
        // console.log(response)
        
        return response
            
                        
    } catch (error) {
        console.log(error)
    }
  }

export const deleteCartById = async (id) => {
    try {
        
        const response = await axios.delete(`/api/cart/${id}`)
        // console.log(response)
        
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

export const updateCart = async(data) => {
    try {
        const response = await axios.patch("/api/cart", data,
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