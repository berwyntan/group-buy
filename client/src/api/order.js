import axios from "axios";

export const getOrderById = async (id) => {
    try {
        
        const response = await axios.get(`/api/order/${id}`)
        console.log(response)
        if (response.status === 200) {
            
            return response.data
            
        }                
    } catch (error) {
        console.log(error)
    }
  }

export const createOrder = async(data) => {
    try {
        const response = await axios.post("/api/order", data,
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

export const getOrdersByUserId = async (id) => {
    try {
        const response = await axios.get(`/api/order/user/${id}`)
        
        if (response.status === 200) {
            return response.data }
                        
    } catch (error) {
        console.log(error)
    }
}

export const getOrdersByProductId = async (id) => {
    try {
        const response = await axios.get(`/api/order/product/${id}`)
        
        if (response.status === 200) {
            return response.data }
                        
    } catch (error) {
        console.log(error)
    }
}