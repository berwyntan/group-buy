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

        productId: "",
        setProductId: (data) => set({ productId: data}),

    }))
)

export default useGroupBuyStore



