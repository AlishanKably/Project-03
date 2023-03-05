import ICart from "../interfaces/cart"

export interface IOrder{
  amount: String,
  status: String,
  cart: ICart,
  user: { username: string }
}