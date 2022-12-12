import { Outlet, Navigate } from "react-router-dom"
import useGroupBuyStore from "../store/store"

const RequireAdmin = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const role = authDetails?.role

  return (
    <>
        
        
        {role==="admin" ? <Outlet /> : <Navigate to="/" />}
    </>
    
  )
}

export default RequireAdmin