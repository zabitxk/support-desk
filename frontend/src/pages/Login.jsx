import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
function Login() {
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
  const onSubmit = (e) => {
    e.preventDefault()
  }
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
