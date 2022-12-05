import { Link } from "react-router-dom"
import useGroupBuyStore from "../store/store"

const Navbar = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const name = authDetails.name

  return (
    <div className="navbar bg-slate-200">
      <div className="flex justify-around">
        <Link to="/">
        <div className="btn btn-ghost normal-case text-xl">Group Buy</div>
        </Link>
        {name ? <div>{`Hello, ${name}`}</div> :
        <Link to="/login">
          <div className="btn btn-ghost normal-case text-xl">Login</div>
        </Link>
        }
        {name && 
        <Link to="/account">
        <div className="btn btn-ghost normal-case text-xl">Account</div>
        </Link>
        }
      </div>
      
    </div>
  )
}

export default Navbar