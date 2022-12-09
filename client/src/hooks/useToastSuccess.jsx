import { toast } from "react-toastify";

const useToastSuccess = (message) => {
    return (
        toast.success(message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    )
}

export default useToastSuccess