import axios from "axios"
import React, { useState } from "react"
import { IOrder } from "../interfaces/order"
import { baseUrl } from "../config"

type TOrder = null | Array<IOrder>

export default function Order() {
  const [orders, updateOrders] = useState<TOrder>(null)
  const [errorMessage, setErrorMessage] = useState('')

  async function updateOrder() {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${baseUrl}/order`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateOrders(data)
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }
  React.useEffect(() => {
    updateOrder()
  }, [])
  console.log(orders);

  if (!orders) {
    return <div className="section"><h2>No orders placed</h2></div>
  }

  return (
    <div className="section" >
      <div className="container">
        <h2 className="is-size-3">Your order</h2>
        <h2 className="is-size-5">Order summary:</h2>
        <div className="pt-4">
          {orders[0].cart.products.map(product => {
            console.log(product)
            return (
              <div className="card" key={product._id}>
                <h2>{product.product.name}</h2>
              </div>
            )
          })
          }
          <div className="pt-4">
            <h2>Status: {orders[0].status}</h2>
          </div>
          <div className="pt-4">
            <h2>Total: {orders[0].amount}</h2>
          </div>
        </div>
      </div>
    </div >
  )
}
