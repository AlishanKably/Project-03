export interface IPayment{
  cardNumber: Number,
  nameOnCard: String,
  expDate: String,
  flag: String
  user: { username: string }
}