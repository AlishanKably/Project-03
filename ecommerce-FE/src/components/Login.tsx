import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from "../config"

export default function Login({ fetchUser }: { fetchUser: Function }) {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/login`, formData)
      const token: string = data.token
      localStorage.setItem('token', token)
      fetchUser()
      navigate('/')
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  function handleChange(e: any) {
    const newFormData = structuredClone(formData)
    newFormData[e.target.name] = e.target.value 
    setFormData(newFormData)
    setErrorMessage("")
  }

  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
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
            {errorMessage && <small className="has-text-danger">Log in failed</small>}
          </div>
        </div>
        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}