import axios from "axios";

export const getOrderById = async (id) => {
    try {
        console.log("test")
        const response = await axios.get(`/api/order/${id}`)
        console.log(response)
        if (response.data && response.statusText === "OK") {
            
            return response.data
            
        }                
    } catch (error) {
        console.log(error)
    }
  }