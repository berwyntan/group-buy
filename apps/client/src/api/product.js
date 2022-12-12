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

export const countProductsByCategory = async (id) => {
    try {
        
        const response = await axios.get(`/api/product/cat/count/${id}`)
        
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

export const updateProductById = async (data) => {
    try {
        const response = await axios.put("/api/product/", data, 
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateProductListingById = async (id) => {
    try {
        const response = await axios.put(`/api/product/list/${id}`,  
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}

export const addNewProduct = async (data) => {
    try {
        const response = await axios.post(`/api/product/`, data,  
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}