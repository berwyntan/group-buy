import { Outlet, Navigate } from "react-router-dom"
import Navbar from "./Navbar"
import useGroupBuyStore from "../store/store"

const RequireAuth = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const name = authDetails?.name

  return (
    <>
        <Navbar />
        <div>RequireAuth</div>
        {name ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace={true} />}
        
    </>
    
  )
}

export default RequireAuth