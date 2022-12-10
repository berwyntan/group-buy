import useGroupBuyStore from "../store/store";
import { Link } from "react-router-dom";

const Account = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const role = authDetails.role

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/account">Account</Link></li> 
                   
        </ul>
      </div>    

      <div className="text-lg">Hello, {authDetails.name}</div>
      
      {
        role === "admin" &&
        <Link to="/adminhome">
        <button className="btn btn-secondary btn-wide my-2">Admin Page</button>
      </Link>   
      }
         
      <Link to="/orders">
        <button className="btn btn-wide btn-primary my-2">My Orders</button>
      </Link>      
      <Link to="/updatedetails">
        <button className="btn btn-wide my-2">Update Account Details</button>
      </Link>
      <Link to="/updatepassword">
        <button className="btn btn-wide my-2">Update Password</button>
      </Link>
      <button className="btn btn-wide my-2">Logout</button>
      
    </>
  )
}

export default Account