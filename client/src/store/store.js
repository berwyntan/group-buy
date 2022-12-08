import create from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

const useGroupBuyStore = create(
    devtools((set) => ({

        
        errorStatus: 400,
        errorStatusText: "",
        setError: (data) => set({ errorStatus: data.status, errorStatusText: data.statusText}),

        authDetails: {},
        setAuthDetails: (data) => set({ authDetails: data}),

        refresh: async () => {
            try {
                const response = await axios.get("/api/user/refresh",
                {
                    withCredentials: true,
                }
                )
                console.log(response)
                if (response.statusText === "OK") {
                    return response
                }                
            
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
        

        categories: [],        
        getAllCategories: async () => {
            try {
                
                const response = await axios.get("/api/category")
                
                if (response.data.length > 0 && response.statusText === "OK") {
                    set({ categories: response.data })
                    
                }
                            
            } catch (error) {
                console.log(error)
            } finally {

            }
        },        
        // addNewCategory,

        products: [],
        getProductsByCategory: async (id) => {
            try {
                
                const response = await axios.get(`/api/product/cat/${id}`)
                
                if (response.data.length > 0 && response.statusText === "OK") {
                    set({ products: response.data })
                    return
                }  
                             
            } catch (error) {
                console.log(error)
            } 
        },
        productSingle: [],
        getProductById: async (id) => {
            try {
                const response = await axios.get(`/api/product/${id}`)
                
                if (response.data && response.statusText === "OK") {
                    set({ productSingle: response.data })
                }                
            } catch (error) {
                console.log(error)
            }
        },
        
        orders: [],
        createOrder: async(data) => {
            try {
                const response = await axios.post("/api/order", data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                if (response.data && response.statusText === "Created") {
                    set({ orders: [response.data]})
                }
                
                return response
                
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
        getOrdersByUserId: async (id) => {
            try {
                const response = await axios.get(`/api/order/user/${id}`)
                
                if (response.data && response.statusText === "OK") {
                    set({ orders: response.data })
                }                
            } catch (error) {
                console.log(error)
            }
        },
        orderSingle: {},
        getOrderById: async (id) => {
            try {
                console.log("test")
                const response = await axios.get(`/api/order/${id}`)
                // console.log(response)
                if (response.data && response.statusText === "OK") {
                    set({ orderSingle: response.data })
                    return response.data
                }                
            } catch (error) {
                console.log(error)
            }
        },
        setOrderSingle: (data) => set({ orderSingle: data}),
        
    }))
)

export default useGroupBuyStore



