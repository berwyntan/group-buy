import { Outlet, useNavigate, useLocation } from "react-router-dom"
import useGroupBuyStore from "../store/store"
import { useEffect } from "react"
import useVisibleTab from "../hooks/useVisibleTab"
import axios from "axios"

const PersistLogin = () => {

  const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
  const navigate = useNavigate()
  const location = useLocation()
  const visible = useVisibleTab()

  const refreshToken = async () => {
    
    try {
        const response = await axios.get("/api/user/refresh",
        {
            withCredentials: true
        })
        // console.log(response)
        if (response.data.accessToken) {
          setAuthDetails(response.data)
          if (location.pathname === "/login" || location.pathname === "/signup")
          {
            navigate("/")
          }
        }        
        return response 
    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(() => {
    
      
    const delay = () => {
      refreshToken()
    }
    setTimeout(delay, 1000)  

    return clearTimeout(delay)  
    
  }, [visible])

  return (
    <>
        
        <Outlet />
    </>
    
  )
}

export default PersistLogin