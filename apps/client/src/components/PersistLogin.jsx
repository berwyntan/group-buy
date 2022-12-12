import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import useGroupBuyStore from "../store/store"
import { useEffect } from "react"
import { refreshToken } from "../api/user"
import { useQuery } from "react-query"

const PersistLogin = () => {

  // const refresh = useGroupBuyStore((state) => state.refresh)
  useEffect(() => {
    refreshToken()
  }, [])

  return (
    <>
        
        <div>PersistLogin</div>
        <Outlet />
    </>
    
  )
}

export default PersistLogin