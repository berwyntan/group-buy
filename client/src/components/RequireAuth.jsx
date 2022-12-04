import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"


const RequireAuth = () => {
  return (
    <>
        <Navbar />
        <div>RequireAuth</div>
        <Outlet />
    </>
    
  )
}

export default RequireAuth