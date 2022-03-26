import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const { name, email, password, password2 } = formData
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
    }
  }
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
