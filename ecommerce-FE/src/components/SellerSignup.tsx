import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from "../config"

export default function SellerSignup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirmation: "",
    isSeller:true
  })

  const [errorData, setErrorData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    passwordConfirmation: "",
    isSeller:true
  })

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    try {
      await axios.post(`${baseUrl}/seller/signup`, formData)
      navigate('/login')
    } catch (err: any) {
      setErrorData(err.response.data.errors)
    }
  }

  function handleChange(e: any) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value 
    setFormData(newFormData)

    const newErrorData = structuredClone(errorData)
    newErrorData[e.target.name] = ""
    setErrorData(newErrorData)
  }

  return <div className="section">
  <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'username'}
            onChange={handleChange}
            value={formData.username}
          />
          {errorData.username && <small className="has-text-danger">{errorData.username}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'email'}
            onChange={handleChange}
            value={formData.email}
          />
          {errorData.email && <small className="has-text-danger">{errorData.email}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Mobile Number</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'mobile'}
            onChange={handleChange}
            value={formData.mobile}
          />
          {errorData.mobile && <small className="has-text-danger">{errorData.mobile}</small>}     
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name={'password'}
            onChange={handleChange}
            value={formData.password}
          />
          {errorData.password && <small className="has-text-danger">{errorData.password}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label">Re-enter Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name={'passwordConfirmation'}
            onChange={handleChange}
            value={formData.passwordConfirmation}
          />
          {errorData.passwordConfirmation && <small className="has-text-danger">{errorData.passwordConfirmation}</small>}
        </div>
      </div>
      <button className="button">Register</button>
    </form>
  </div>
</div>
}