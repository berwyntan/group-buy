import { Outlet, Navigate } from "react-router-dom"
import useGroupBuyStore from "../store/store"

const RequireAuth = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const name = authDetails?.name

  return (
    <>
        
        
        {name ? <Outlet /> : <Navigate to="/login" />}
        
    </>
    
  )
}

export default RequireAuth