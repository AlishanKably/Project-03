import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ICart from '../interfaces/cart'
import { IProduct } from '../interfaces/product'
import Product from './Product'
import { baseUrl } from "../config"


type TCart = null | Array<ICart>

function Cart() {
  const [Carts, updateCarts] = React.useState<TCart>(null)
  // const [total, updateTotal] = React.useState<number>(0)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function updateCart() {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${baseUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCarts(data)
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }
  useEffect(() => {
    updateCart()
  }, [])
  console.log(Carts);

  if (!Carts) {
    return <img src="https://www.vinsolutions.com/wp-content/uploads/sites/2/vinsolutions/media/Vin-Images/news-blog/Empty_Shopping_Cart_blog.jpg"/>
  }
  
  async function handleRemoveFromCart(productId: String) {

    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.delete(`${baseUrl}/product/${productId}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
      updateCart()
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  async function handleAddOrder(cartId: String) {

    try {
      const token = localStorage.getItem('token')
      const body = { amount: String(reducedArr) }
      console.log(body);

      const { data } = await axios.post(`${baseUrl}/cart/${cartId}/order`, body,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
      console.log(data);
      navigate('/order')
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  const sumArr = [] as Array<number>
  let reducedArr: number = 0
  return (
    <section className="hero is-link is-fullheight-with-navbar is-link">
      <div className="hero-body has-text-centered">
        <div className="container">
          <p className="title">Your Cart</p>
        </div>
      </div>
      <div className="is-flex-direction-row">
        <div className="is-flex-direction-row">
          {Carts[0].products?.map(product => {
            console.log(product)
            sumArr.push(product.quantity * Number(product.product.price))
            console.log(sumArr);
            reducedArr = sumArr.reduce((acc, current) => {
              return acc + current
            })
            console.log(reducedArr)

            

            return (
              <div className="card" key={product._id}>
                <div className="card-header">
                  <div className="card-header-title">
                    <h2>{product.product.name}</h2>
                  </div>
                </div>

                <div className="card-content">
                  <div> <img src={product.product.image} /></div>
                </div>

                <div className="card-content">
                  <p>Price: {product.product.price}</p>
                </div>

                <div className="card-content">
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="card-content">
                  <p>Total: {product.quantity * Number(product.product.price)}</p>
                </div>
                <div>
                  {<button className="button" onClick={() => handleRemoveFromCart(product.product._id)}>Remove from cart</button>}
                </div>
              </div>
            )
          })}
        </div>
        {<p>Total: {reducedArr}</p>}
      </div>
      <div>
        {<button className='button' onClick={() => handleAddOrder(Carts[0]._id)} >Order</button>}
      </div>
    </section>
  )
}

export default Cart
