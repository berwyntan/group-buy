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
        fetchCategories: async () => {
            try {
                const { data } = await axios.get("/api/product/category")
                console.log(data)
                if (data.success === true) {
                    set({ categories: data.result })
                }
                
            } catch (error) {
                console.log(error)
            }
        },        
        setCategories: (data) => set({ category: data}),


    }))
)

export default useGroupBuyStore

// export const CategoryComponentHomepage = () => {
    
//     const fetch = useGroupBuyStore((state) => state.fetchGp)
//     const data = useGroupBuyStore((state) => state.categoryGp)
//     useEffect(() => {fetch()}, [])
//     const categoryCards = data.map(d => {
//         return(
//             <CategoryCardUser
//                 imgUrl={d.imgUrl}
//                 name={d.name}
//                 id={d.id}
//                 key={d.id}
//             />
//         )
//     })
//     console.log(data)

//     return (
//         <>
//             <div className="container">
//                 <div className="grid grid-cols-2 gap-4">
//                 {categoryCards}
//                 </div>  
//             </div>
//         </>
//     )
// }

