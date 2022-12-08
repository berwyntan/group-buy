import { Link } from "react-router-dom"
import useGroupBuyStore from "../store/store"

const Navbar = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const name = authDetails?.name

  return (
    <div className="navbar bg-slate-200">
      
      <div className="flex-1">
      <Link to="/">
      <div className="btn btn-ghost normal-case text-xl">GroupBuy</div>
      </Link>
      </div>

      <div className="flex-none">
      {name ? 
      <Link to="/account">
      <div className="btn btn-ghost normal-case text-xl">Account</div>
      </Link> :
      <Link to="/login">
        <div className="btn btn-ghost normal-case text-xl">Login</div>
      </Link>
      }
      </div>
      
      
    </div>
  )
}

export default Navbar