# Express Starter Pack

This repository is a complete Express starter pack that follows industry standard patterns. It is made with TypeScript, PostgreSQL, and TypeORM.

# Features
SOLID Principle
Repository Pattern
MVC
Error Handling
Schema Validation


# Getting Started
To get started, simply clone the repository and install the dependencies:

git clone https://github.com/TechJayVee/express-starter-pack.git
cd express-starter-pack
npm install

# Usage
To start the server, run the following command:
npm run dev
The server will be running on port 3000. You can access it at http://localhost:3000.

# Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

# License
This project is licensed under the MIT License.

# Environment Variables
To configure the application, create an .env file in the root of the project and add the following environment variables:

EXPRESS_PORT=8000
POSTGRES_DB
POSTGRES_PORT
POSTGRES_HOST
POSTGRES_USERNAME
POSTGRES_PASSWORD
TYPE=postgres
POSTGRES_SYNC=true

The EXPRESS_PORT variable specifies the port that the application will listen on. The POSTGRES_* variables specify the connection details for the PostgreSQL database. The TYPE variable specifies the type of database that the application will use.

# Configurations
The following configurations are already set up and ready to use:

tsconfig.json: This file configures the TypeScript compiler.
nodemon.json: This file configures Nodemon, a tool that will automatically restart the application when changes are made to the code.
vscode: This folder contains a VSCode configuration file that will set up the editor with the necessary settings and extensions.
eslintrc: This file configures ESLint, a tool that will lint the code for errors.
Endpoints
The following endpoints are available for the user resource:

# POST /public/v1/user/user
Create a new user.

# GET /public/v1/user/users-list
Get a list of all users.

# GET /public/v1/user/user/:id
Get a user by ID.

# DELETE /public/v1/user/user/:id
Delete a user by ID.

# PUT /public/v1/user/user/:id
Update a user by ID.
