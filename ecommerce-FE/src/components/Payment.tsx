import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from "../config"

export default function Payment() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expDate: "",
  })

  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/payment`, formData)
      navigate('/home')
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

  return <div>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name On Card</label>
          <div>
            <input
              type="text"
              name={'cardNumber'}
              onChange={handleChange}
              value={formData.cardNumber}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Card Number</label>
          <div>
            <input
              type="text"
              name={'nameOnCard'}
              onChange={handleChange}
              value={formData.nameOnCard}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Expiry Date</label>
          <div>
            <input
              type="text"
              name={'expDate'}
              onChange={handleChange}
              value={formData.expDate}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <button className="button">Add card details</button>
      </form>
    </div>
  </div>
}