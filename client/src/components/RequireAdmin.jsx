import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


const RequireAdmin = () => {
  return (
    <>
        
        <div>RequireAdmin</div>
        <Outlet />
    </>
    
  )
}

export default RequireAdmin