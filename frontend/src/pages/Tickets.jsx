import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import { toast } from "react-toastify"

function Tickets() {
  const dispatch = useDispatch()
  const { tickets, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  )
  useEffect(() => {
    dispatch(getTickets())
    if (isError) {
      toast.error(message)
    }
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess, isError, message])
  if (isLoading) return <Spinner />
  return (
    <>
      <BackButton url="/" />
      <h1>Hello Tickets</h1>
    </>
  )
}

export default Tickets
