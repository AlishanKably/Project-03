import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from "../config"

export default function Address() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    countryRegion: "",
    fullName: "",
    phoneNumber: "",
    postcode: "",
    addressLine1: "",
    addressLine2: "",
    townCity: "",
    county: "",
    deliveryInstructions: "",
  })

  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${baseUrl}/address`, formData)
      navigate('/payment')
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
          <label>Country/Region</label>
          <div>
            <input
              type="text"
              name={'countryRegion'}
              onChange={handleChange}
              value={formData.countryRegion}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Full Name</label>
          <div>
            <input
              type="text"
              name={'fullName'}
              onChange={handleChange}
              value={formData.fullName}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Phone Number</label>
          <div>
            <input
              type="text"
              name={'phoneNumber'}
              onChange={handleChange}
              value={formData.phoneNumber}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Address Line 1</label>
          <div>
            <input
              type="text"
              name={'addressLine1'}
              onChange={handleChange}
              value={formData.addressLine1}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Address Line 2</label>
          <div>
            <input
              type="text"
              name={'addressLine2'}
              onChange={handleChange}
              value={formData.addressLine2}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Town/City</label>
          <div>
            <input
              type="text"
              name={'townCity'}
              onChange={handleChange}
              value={formData.townCity}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Postcode</label>
          <div>
            <input
              type="text"
              name={'postcode'}
              onChange={handleChange}
              value={formData.postcode}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>County</label>
          <div>
            <input
              type="text"
              name={'county'}
              onChange={handleChange}
              value={formData.county}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>

        <div>
          <label>Delivery Instructions</label>
          <div>
            <input
              type="text"
              name={'deliveryInstructions'}
              onChange={handleChange}
              value={formData.deliveryInstructions}
            />
            {errorMessage && <small>Information entered incorrectly</small>}
          </div>
        </div>
        
        <button className="button">Add card details</button>
      </form>
    </div>
  </div>
}