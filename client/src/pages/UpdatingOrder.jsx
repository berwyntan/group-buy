import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGroupBuyStore from "../store/store";

const UpdatingOrder = () => {

    const orderId = useGroupBuyStore((state) => state.orderId)
    const navigate = useNavigate()
    useEffect(() => {navigate(`/admin/updateorder/${orderId}`)}, [])

  return (
    <div>Updating Product...</div>
  )
}

export default UpdatingOrder