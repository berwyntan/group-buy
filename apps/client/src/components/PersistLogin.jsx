import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import useGroupBuyStore from "../store/store"
import { useEffect } from "react"

const PersistLogin = () => {

  // const refresh = useGroupBuyStore((state) => state.refresh)
  // useEffect(() => {
  //   refresh()
  // }, [])

  return (
    <>
        
        <div>PersistLogin</div>
        <Outlet />
    </>
    
  )
}

export default PersistLogin