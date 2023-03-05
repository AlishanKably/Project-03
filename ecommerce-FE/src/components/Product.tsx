import { Link } from "react-router-dom"
import { IProduct } from "../interfaces/product"
import { baseUrl } from "../config"

function Product({ _id, name, description, price, categories, image, quantity, reviews, isHome }: IProduct) {
  return <div className="column is-one-quarter-desktop is-one-third-tablet">
    <Link to={`/product/${_id}`}>
      <div className="card m-5">
        <div className="card-header">
          <div className="card-header-title">{name}</div>
        </div>
        {!isHome && <div className="card-content">
          <div>Description: { description }</div>
        </div>}
        <div className="card-content">
          <div>Price = £{ price }</div>
        </div>
        {!isHome && <div className="card-content">
          <div>Category: { categories }</div>
        </div>}
        <div className="card-image has-border " >
          <figure className="image is-3by2 ">
            <img src={image} className="card-img-top" alt={name} />
          </figure>
        </div>
        {!isHome && <div className="card-content">
          <div>Quantity: { quantity }</div>
        </div>}
      </div>
    </Link>
  </div>
}
export default Product