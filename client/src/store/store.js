import create from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

const useGroupBuyStore = create(
    devtools((set) => ({

        errorStatus: 400,
        errorStatusText: "",
        setError: (data) => set({ errorStatus: data.status, errorStatusText: data.statusText}),

        authDetails: {},
        login: async (data) => {
            try {
                const response = await axios.post("/api/user/login", data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                if (response.statusText === "OK") {
                    set({ authDetails: response.data })
                    return response
                }                
            
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
        signup: async (data) => {
            try {
                const response = await axios.post("/api/user/signup", data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                // console.log(response)
                if (response.statusText === "Created") {
                    return response
                }                
            
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
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
        updateUser: async (data) => {
            try {
                const response = await axios.post("/api/user/update", data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                console.log(response)
                if (response.statusText === "OK") {
                    set((state) => ({ authDetails: {...state.authDetails, name: response.data.name, mobile: response.data.mobile}}))
                    return response
                }                
            
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
        updatePassword: async (data) => {
            try {
                const response = await axios.post("/api/user/updatepw", data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
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
                const { data } = await axios.get("/api/category")
                // console.log(data)
                if (data.length > 0) {
                    set({ categories: data })
                }                
            } catch (error) {
                console.log(error)
            }
        },        
        // addNewCategory,

        products: [],
        getProductsByCategory: async (id) => {
            try {
                const { data } = await axios.get(`/api/product/cat/${id}`)
                // console.log(data)
                if (data.length > 0) {
                    set({ products: data })
                }                
            } catch (error) {
                console.log(error)
            }
        },
        productSingle: [],
        getProductById: async (id) => {
            try {
                const { data } = await axios.get(`/api/product/${id}`)
                // console.log(data)
                if (data) {
                    set({ productSingle: data })
                }                
            } catch (error) {
                console.log(error)
            }
        },
        
        orders: [],
        getOrdersByUser: async (id) => {},
        createOrder: async(data) => {
            try {
                const response = await axios.post("/api/order", data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                )
                set({ orders: [response.data]})
                return response
                
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
        getOrdersByUserId: async (id) => {
            try {
                const { data } = await axios.get(`/api/order/user/${id}`)
                console.log(data)
                if (data) {
                    set({ orders: data })
                }                
            } catch (error) {
                console.log(error)
            }
        },

        
    }))
)

export default useGroupBuyStore



