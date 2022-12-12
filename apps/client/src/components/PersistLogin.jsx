import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import useGroupBuyStore from "../store/store"
import { useEffect } from "react"
import { refreshToken } from "../api/user"
import { useQuery } from "react-query"
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
        console.log(error)
    }
  }
  
  useEffect(() => {
    
    refreshToken()    
    
  }, [])

  return (
    <>
        
        <Outlet />
    </>
    
  )
}

export default PersistLogin