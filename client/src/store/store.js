import create from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
// import CategoryCardUser from '../components/CategoryCardUser';
// import { useEffect } from 'react';

const useGroupBuyStore = create(
    devtools((set) => ({

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
                const { data } = await axios.get(`/api/product/${id}`)
                console.log(data)
                if (data.length > 0) {
                    set({ products: data })
                }                
            } catch (error) {
                console.log(error)
            }
        }


    }))
)

export default useGroupBuyStore



