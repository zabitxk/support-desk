import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const { name, email, password, password2 } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    // Show error
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("Password do not match")
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }
  if(isLoading) return <Spinner/>
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={onChange}
            placeholder="Please enter your name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={onChange}
            placeholder="Please enter your email"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={onChange}
            placeholder="Please enter your password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password2"
            value={password2}
            name="password2"
            onChange={onChange}
            placeholder="Please confirm your password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default Register
