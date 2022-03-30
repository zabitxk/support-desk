import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const { user, isError, isLoading, isSuccess, message } = useSelector(
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
  
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
  if (isLoading) return <Spinner />
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please login to your account</p>
      </section>
      <form onSubmit={onSubmit}>
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
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default Login
