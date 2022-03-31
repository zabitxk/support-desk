import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import TicketItem from "../components/TicketItem"
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
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket._id} />
        ))}
      </div>
    </>
  )
}

export default Tickets
