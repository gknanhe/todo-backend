# Todo APP API

This is the backend server for the Todo App, providing APIs for managing user tasks and authentication.
It allows the users) to register and log in, register , and create todos . It also provides endpoints to retrieve all todos , filtered by status.
The API is built using Node.js and MongoDB, and uses JSON Web Tokens (JWT) for authentication. The folder structure is organized into models, controllers, and routes for scalability and maintainability.

## 🔗 Links

> ## Checkout the API [Web Application API](https://todo-backend-i499.onrender.com/)

<br/>
<br/>

## Installation

To install and run the application, follow the steps below:

1. Clone the repository - `git clone https://github.com/gknanhe/todo-backend.git`
2. Navigate to the project directory: `cd todo-backend`
3. Install the dependencies - `npm install`
4. Create a `.env` file in the root directory with the following environment variables: -
   - `PORT=8000`
   - `MONGODB_URI=<your_mongodb_uri>`
   - `JWT_SECRET=<your_jwt_secret>`
   - `SESSION_COOKIE_KEY`
5. Start the server: `npm start`
6. Open the app in your web browser at `http://localhost:8000`

That's it! You should now have the Todo API app up and running on your local machine.

> Note: In order to use the app's functionality, you will need to have Node.js and npm installed on your system. If you don't have them installed, you can download and install them from the official Node.js [website](https://nodejs.org/en/).

## Dependencies

Todo API requires the following dependencies:

- `dotenv` - Loads environment variables from a `.env` file
- `express` - Web framework for Node.js
- `jsonwebtoken` - Generates and verifies JSON web tokens (JWTs)
- `mongoose` - ODM (Object-Document Mapping) library for MongoDB and Node.js
- `express-session` - for managing user sessions in Express.js applications.
- `passport` - Authentication middleware for Node.js
- `passport-jwt` - Passport strategy for authenticating with a JSON Web Token (JWT)
- `cors` - is a mechanism for browsers to let a site running at origin A to request resources from origin B.

## API Routes

### Doctor

- **POST** `/api/user/register` - Register a new user with a username and password.
- **POST** `/api/user/login` - Login with a username and password to receive a JWT.
  > Note: All routes except for `/api/user/register` and `/api/user/login` require a valid JWT to be included in the Authorization header of the request. The JWT should have the format `Bearer <token>`.

### User

- **POST** `/api/user/register` - Register a new user with a phone number.
- **GET** `/api/user/login` - login and get user info with jwt token

### Todos

- **GET** `/api/user/get-todo:id/` - Get all the todos with id,.
- **POST** `/api/user/create-todo` - Create the todo.
- **POST** `/api/user/delete-todo` - delete the todo.
- **POST** `/api/user/edit-todo` - edite the todo.
- **POST** `/api/user/toggle-todo` - toggle todo as done /not done.
- **GET** `/api/user//search-todo/:userId/:searchText` - get todos based on search text.

## Folder structure

The project has a scalable folder structure with separate models, controllers, and routes:

        -todo-backend/
        |-- config/
        |   |-- mongoose.js
        |   |-- passport-jwt-strategy.js
        |-- controllers/
        |   |-- userController.js
        |   |-- todoController.js
        |-- models/
        |   |-- user.js
        |   |-- todo.js
        |-- routes/
        |   |-- index.js
        |   |-- userRoutes.js
        |-- .env
        |-- .gitignore
        |-- package.json
        |-- index.js
        |-- README.md

## Contributing

We welcome contributions from the community! If you would like to contribute to CN Hospitel API, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them
4. Push your changes to your forked repository
5. Create a pull request to merge your changes into the main repository

## Author

[Ganesh K Nanhe](https://github.com/gknanhe/todo-backend)

## License

This project is licensed under the ISC License.

## Bugs/Issues

If you encounter any bugs or issues while using the app, please report them [here](https://github.com/gknanhe/hospital-api/issues).
