export interface IAddress{
  countryRegion: String,
  fullName: String,
  phoneNumber: String,
  postcode: String,
  addressLine1: String,
  addressLine2: String,
  townCity: String,
  county: String,
  deliveryInstructions: String,
  user: { username: string }
}