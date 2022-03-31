import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import BackButton from '../components/BackButton'


function NewTicket() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  )
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState("iPhone")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success("New ticket has been created")
      dispatch(reset())
      navigate("/tickets")
    }
  }, [isError, isSuccess, message, dispatch, navigate])
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createTicket({
        product,
        description,
      })
    )
  }
  if (isLoading) return <Spinner />
  return (
    <>
    <BackButton url='/'/>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form bewlow</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
