import { Outlet } from "react-router-dom"
import useGroupBuyStore from "../store/store"
import { useEffect } from "react"
import axios from "axios"

const PersistLogin = () => {

  const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
  // const authDetails = useGroupBuyStore((state) => state.authDetails)

  const refreshToken = async () => {
    
    try {
        const response = await axios.get("/api/user/refresh",
        {
            withCredentials: true
        })
        // console.log(response)
        setAuthDetails(response.data)
        return response 
    } catch (error) {
        // console.log(error)
    }
  }
  
  useEffect(() => {
    
      
    const delay = () => {
      refreshToken()
    }
    setTimeout(delay, 1000)  

    return clearTimeout(delay)  
    
  }, [])

  return (
    <>
        
        <Outlet />
    </>
    
  )
}

export default PersistLogin