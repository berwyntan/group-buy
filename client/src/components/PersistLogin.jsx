import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const PersistLogin = () => {
  return (
    <>
        <Navbar />
        <div>PersistLogin</div>
        <Outlet />
    </>
    
  )
}

export default PersistLogin