import { useMutation } from "react-query"
import { updateOrder } from "../../api/order"
import { useNavigate } from "react-router-dom"
import useGroupBuyStore from "../../store/store"
import { useEffect } from "react"

const PaymentCrm = ({id}) => {

    const setOrderId = useGroupBuyStore((state) => state.setOrderId)
    const navigate = useNavigate()

    const mutation = useMutation(formData => updateOrder(formData), 
    {
        onError: (response) => {
            
            console.log(response)
        },
        onSuccess: (response) => {
            
            console.log(response)
            if (response.status === 200) {
            navigate("/admin/updatingorder", {replace: true})
            } 
        },
    })


    const paymentMade = () => {
        const formData = {
            "fulfil": "false",
            "cancel": "false",
            "paid": "true",
            "collect": "false",
            "id": id
        }
        
        mutation.mutate(formData)
    }

    useEffect(() => {setOrderId(id)}, [])

  return (
    <>
        <div className="divider">Payment</div>
        <button className="btn btn-success mx-3 my-2">
            WhatsApp: Payment Reminder                
        </button>
        <button className="btn btn-primary mx-3 my-2" onClick={paymentMade}>Payment made</button>            
        <button className="btn btn-success mx-3 my-2">
            WhatsApp: Payment Received                
        </button>
    </>
  )
}

export default PaymentCrm