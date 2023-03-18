# Project-03
## E-Commerce Store
### Overview

This project tested our abilities to work in groups to create a frontend and backend that worked together to create a fullstack app. Myself and my partner decided to create an E-commerce store where users can make an account to browse and buy products as well as post products they would like to sell once they are logged in. The project took place over the course of 2 weeks.

### Deployment link

To view the app, click here : https://ecommerce-project3.netlify.app

### Technical Requirements

* Work in a team, using **git to code collaboratively**.
* **Build a full-stack application** by making a backend/frontend.
* **Use an Express API** to serve your data from a Mongo database.
* **Consume your API with a separate front-end** built with React.
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end.


### Technologies

Technologies used to design this app included the following:

* TypeScript
* Express
* Mongoose
* MongoDB
* JEST
* Insomnia
* Git and GitHub


### Methodology

During the first steps of the project, wireframing is done with the use of Excalidraw where relationships between models were discussed as well as features we want to build on the frontend screens and what API's would be required to achieve this.

As this project involved more than one person, it was important to know how the work would be divided and agree when deliverables needed to be completed by. For this, Jira was used which allowed us to break down tasks into multipe actions and assign these actions to a lead time. Following this planning stage, some basic boilerplate code is done. Models that are decided during the planning stage were then created together and a basic skeleton of the backend and frontend were set up.

A seed page was then created to test the models and add some initial data into the database so this can be rendered.
```
function getProductsData (user:any){
  return [
  { name: '5600', price: 140, quantity:1, category: 'CPU', user, reviews:[{content: 'good performance', user}]},
  { name: '5600X', price: 170, quantity:1, category: 'CPU', user },
  { name: 'RTX 3060', price: 380, quantity:1, category: 'GPU', user },
  { name: 'RTX 3070', price: 560, quantity:1, category: 'GPU', user }
]
}
```

Following this, we were able to work independently on different pages and their respective endpoints as we had a common vision however regular communication every other day was key to ensuring we were meeting our targets. The work was split by choosing different components for each of us to tackle. It was important to frequently revisit our Jira plan to ensure we were on track due to the tight constraint of time.

During this team project, myself and my partner collaborated in a few different ways:
- Pair programming
- VSCode Livecode - Multiple working at the same time on one computer
- Git to collaborate - Working independently on different features then 'branch' with git to merge code with partners code.


### Build


## Frontend

The frontend was made up of multiple ```React``` components which used async functions which fetched the API's from the MongoAtlas database. An expample of this was to show the individual products that are available on the online store by fetching their unique ID's through ```useEffect()```.

```
React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/product/${productId}`)
      const ProductsData = await resp.json()
      updateProducts(ProductsData)
      console.log(ProductsData);
      
    }
    fetchProducts()
  }, [])
```
Log in and Sign up components were created to allow the user to create an account through a sign up and log in process to give them more access to do more functions on the app. This was then ```navigate``` the user the home page where the list of available products are shown through the 'mapping' over the individual roducts to render these as cards on the home screen. By clicking on the individual cards, the user can see an expanded description of the products and them to their cart with the following function:

```
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
```
This posts the chosen product to the ```cart``` database. Once the user has completed browsing the products and adding to the basket, they can navigate to the ```cart``` tab and see the products they have selected through the following code:
```
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
```


A function was also used to add the prices of each product to give a check out total. 

```
Carts[0].products?.map(product => {
            console.log(product)
            sumArr.push(product.quantity * Number(product.product.price))
            console.log(sumArr);
            reducedArr = sumArr.reduce((acc, current) => {
              return acc + current
            })
```

Each component is also linked to an interface which describes the type of each prop, e.g.

```
export interface IOrder{
  amount: String,
  status: String,
  cart: ICart,
  user: { username: string }
}
```


## Backend

We used an MVC approach was consisted of the following:
* Model - This describes the data to be represented with the use of Schema's.

```
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Enter a valid name'] },
    description: { type: String },
    price: { type: Number, required: [true, 'Enter a price']
      baseprice: { type: Number, required: [true, 'Enter a price'] },
      minPrice: { type: Number },
      maxPrice: { type: Number },
      discount: { type: Number, required: true, default: 0 }
    },
    categories: { type: String },
    image: { type: String },
  
    quantity: { type: Number, required: [true, 'Enter a quantity'] },
    reviews: [reviewSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)
```


*  View - This describes the ways data can be seen through different endpoints. For this, Insomnia was employed to view the several routes and responses.

```
router.route('/signup').post(signup)
router.route('/login').post(login)
```


* Controller (business logic) - Required to do various actions such as make a request to the database through async functions.

```
export async function getProducts(req: Request, res: Response) {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (e) {
    console.log(e)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'There was an error' })
  }
}
```


## The API

For the API, Express was the chosen library used for this project which allowed methods such as ```GET``` ```POST``` ```PUT``` and ```DELETE``` to be incorporated.
MongoDB was used by creating an array of objects or JSON documents which hold the database with the API's fetched to render on the app. Specifically, MongoAtlas was used for this project. An object document mapper is then used for document stores to provide methods to connect to mongodb such as connecting to the database stored on MongoAtlas. For this project, Mongoose was used. The building blocks of Mongoose come from the models/schemas written in the backend to allow items such as custom validation and relationships to other models. Specifically, a RESTful API was used through creating various endpoints to fetch information from the database.

```
// product endpoints
router.route('/products').get(getProducts)
router.route('/product/:productId')
  .get(getProduct)
  .put(secureRoute, updateProduct)
  .delete(secureRoute, deleteProduct)
router.route('/addproduct').post(secureRoute, addProduct)
```


In addition, callback functions are used when a route is fetched such with ```Request``` ```Response``` in the ```Controllers``` section of the backend:

```
export async function signup(req: Request, res: Response) {
  try {
    if (checkPasswords(req.body.password, req.body.passwordConfirmation)) {
      const user = await User.create(req.body)
      res.send(user)
    } else {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(
        { message: "Passwords don't match", errors: { password: "Passwords don't match" } }
      )
    }
  } catch (e: any) {
    console.log(e)
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .send({ errors: formatValidationError(e) })
  }
}
```


## Authentication/Authorization




* Authentication: 

JWT (jsonwebtoken) was used to create a unique token for the user as they sign up. This can then be sent when they make requests on the app. During the sign up process, bcrypt was used to hash the password and store the hash to the database. If passwords are attempted at a later time, the hashed password can be compared to the stored password.

```
userSchema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

export function validatePassword(
  loginPassword: string,
  originalPassword: string
) {
  return bcrypt.compareSync(loginPassword, originalPassword)
}

export function checkPasswords(password: string, passwordConfirmation: string) {
  return password === passwordConfirmation
}
```


* Authorization:

To apply autherisation to the user details, middleware was used, specifically secure route, error handling, and logging
JWT to verify the token when a product is posted.

```
const isValidPw = validatePassword(req.body.password, user.password)
    
    if (isValidPw) {
      const token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: '24h' }
      )
      res.status(StatusCodes.OK).send({ message: "Login successful", token })
    } else {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Login failed on if is valid pw" })
    }
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Login failed" })
  }
```

This token is also used on the frontend by:
* Attaching it to requests to complete actions such as post/delete.
* Show various items on the frontend when the user is logged in. An example of this is the changes in the navbar. The ```Add Product``` tab would only be visible to a user who has sign up and can provide a token.


### Testing

To ensure correctness of our TypeScipt codebase, the ```JEST``` framework was employed.

## Challenges

The most important aspect of this project was to ensure we were working collaboratively and communicating well to ensure our independant code was building the app and not conflicting in any way. Regular discussions and 'stand ups' helped to achieve this.

## Wins

My group was able effectively collaborate our code to create a presentable app which incorporated many different features for a user to experiment with. We were able to successfully sign up and log in a user who then had the permission upload their own products to the online store which could then be bought by another user by saving the product to their cart and checking out.











