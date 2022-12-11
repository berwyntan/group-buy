
const useStatusCheck = ({cancel, fulfil, paid, collect}) => {
    let status;      
      if (!cancel && !fulfil && !paid && !collect) {
          status = ("Payment pending")
          
      } else if (!cancel && !fulfil && paid && !collect) {
          status = ("Fulfilling order")
          
      } else if (!cancel && fulfil && paid && !collect) {
          status = ("Ready for collection")
          
      } else if (cancel && !fulfil && !paid && !collect) {
          status = ("Order cancelled")
          
      } else if (cancel && !fulfil && paid && !collect) {
          status = ("Refund pending")
          
      } else if (!cancel && fulfil && paid && collect) {
          status = ("Collected")
          
      }
      return status
}

export default useStatusCheck