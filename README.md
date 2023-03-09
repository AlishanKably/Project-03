# Project-03
## E-Commerce Store
### Overview

This project tested our abilities to work in groups to create a frontend and backend that worked together to create a fullstack app. `myself and my partner decided to create an E-commerce store where users can make accounts to  browse and buy products as well as post products they would like to sell. The project took place over the course of 2 weeks.

### Deployment link

To view the app, click here : https://ecommerce-project3.netlify.app

### Technical Requirements

* Work in a team, using **git to code collaboratively**.
* **Build a full-stack application** by making a backend/frontend
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.


### Technologies and methods

Technologies used to design this app included the following:

* TypeScript
* Express
* Mongoose
* MongoDB (As an API database)
* Insomnia (for testing routes)
* Git and GitHub

### Methodology

Express


seed page used to put some initial data into database.

mongoose
object document mapper (Mongoose) used for document stores to provide methods to talk to mongo db e.g connecting to database on MongoAtlas.
made up of models/schemas in the backend. This is where custom validation/relationships to other models is done e.g. users

mongodb/mongoatlas
mongoDB is an array of objects or JSON documents which holds the database with the API's fetched to render on the app. Specifically, MongoAtlas was used for this project

The API

Express was the chosen library used for this project.
Methods used: GET POST PUT DELETE
MVC - Model (datarepresentation e.g. products
-View, ways of looking at data(Routes and responses in insomnia)
- Controller (business logic), written code to do various things such as make a request to the database.

RESTful API
building blocks of the API:
Routes themselves
callback functions for routes e.g router.get('/product').route(
async=> {})



Authentication/Authorization

Authentication: 
JWT (jsonwebtoken) creates a unique token for a user, which they can send when they make requests. This is how you know they are logged in as proof.
bcrypt - used to hash password and store the hash to db. Laterit can hash attempted passwords and compare that to the stored password.

Authorization:
Use of Middleware e.g secure route, error handling, logging
JWT - verify the token when a product is posted.

Use of token on frontend:
- Attaching it to requests to do things like post/delete
- Show various things on your frontend if the user is logged in
- Show vrious things on your frontend for only the logged in user who has permission


Group work:
At beginning, some basic boiler plate code is done. Then created models together and set up basic skeleton of backend and front end.
Wireframing - talking about the models and relationships between them. Features we want to build on front end screens. API end points we want.
Then worked independantley on differnt pages and their respective endpoints.
During this team project, myself nd my partner collaborated in a few different ways:
- Pair programming
- VSCode Livecode - Multiple working at the same time on one computer
- Git to collaborate - Working indepentdently on diffferent features then 'branch' with git to merge code with partners code.












