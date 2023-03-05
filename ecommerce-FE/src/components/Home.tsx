import React from "react"
import { IProduct } from "../interfaces/product"
import Product from "./Product"
import { baseUrl } from "../config"

type Products = null | Array<IProduct>


function Home() {
  const [Products, updateProducts] = React.useState<Products>(null)

  React.useEffect(() => {
    console.log("The Home Page has mounted")
  }, [])

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/products`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
    }
    fetchProducts() 
  }, [])

  return (
    <section className="hero is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="container">
          <p className="title pt-6">Project Ecommerce</p>
        </div>
      </div>
      <h2 className="title has-text-centered is-size-4">Browse Products</h2>
      
      <div className="is-flex-direction-row">
      <div className="columns is-flex-direction-row is-flex-wrap-wrap">
        {Products?.map((product: IProduct) => {
          return <Product 
            key={product._id}
            {...product}
            isHome = {true}
          />
        })}
      </div>
    </div>
    </section>
  )
}

export default Home