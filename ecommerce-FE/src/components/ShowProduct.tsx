import React, { SyntheticEvent, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { IProduct } from "../interfaces/product"
import Product from "./Product"
import axios from "axios"
import {IUser} from "../interfaces/user"
import { baseUrl } from "../config"

interface ShowProductProps {
  user: IUser | null
  setUser: Function
}

function ShowProduct({ user, setUser }: ShowProductProps) {
  const [product, updateProducts] = React.useState<IProduct | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const { productId, userId } = useParams()
  const navigate = useNavigate()
  async function handleAddToCart(e: SyntheticEvent) {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post(`${baseUrl}/product/${productId}/cart`, productId, 
      {headers: { Authorization: `Bearer ${token}` }
      
    })
      console.log(productId, userId)
      navigate('/')
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }

  React.useEffect(() => {
    console.log("Your product is available")
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/product/${productId}`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
      console.log(ProductsData);
      
    }
    fetchProducts()
  }, [])

  return <section>
    <div>
      <div>
      {product && <Product
          key={product._id}
          {...product}
        />}
      </div>
      <div>
        {user && <button className="button" onClick={handleAddToCart}>Add to cart</button>}
      </div>
    </div>
  </section>
}

export default ShowProduct