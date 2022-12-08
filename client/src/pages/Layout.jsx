import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import useGroupBuyStore from "../store/store"

const Layout = () => {

  const isLoading  = useGroupBuyStore((state) => state.isLoading)
  

  return (
    <>
        <Navbar />
        {
          isLoading ?
          <div>Loading...</div> :
          <Outlet />
        }
        
    </>
  )
}

export default Layout