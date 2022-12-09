import axios from "axios";

export const getProductsByCategory = async (id) => {
    try {
        
        const response = await axios.get(`/api/product/cat/${id}`)
        
        // if (response.data.length > 0 && response.statusText === "OK") {
        //     set({ products: response.data })
        //     return
        // }  
        if (response.status === 200) return response.data
                     
    } catch (error) {
        console.log(error)
    } 
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`/api/product/${id}`)
        
        if (response.status === 200) return response.data
    } catch (error) {
        console.log(error)
    }
}