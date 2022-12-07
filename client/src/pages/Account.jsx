import useGroupBuyStore from "../store/store";
import { Link } from "react-router-dom";

const Account = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)


  return (
    <>
      <div className="text-lg">Hello, {authDetails.name}</div>
      
      <Link to="/orders">
        <button className="btn btn-wide my-2">My Orders</button>
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