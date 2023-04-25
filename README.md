# TODO application with Role-Based Access Control (RBAC) system
TODO application with access control by OAuth0. Managed fronend and backend in one repository.

## Overview
All logged in users be able to view list of todos and only 'Admin' role users be able to Create, Update and Delete.

## Technologies
 - NodeJS ( Backend )
 - ReactJS ( Frontend )


## application users credentials ( email / password )
 - Regular User : test@test.test / Test@123
 - Admin User : singhgovind.dz@gmail.com / Test@123



## Project setup

### Folder structure 


    .
    ├── public                  # React app public folder
    ├── server                  # Source files NodeJS Restful API server ( runs on port 3001 )
    ├── src                     # Source files React App 
    ├── package.json            
    ├── server.js               # Frontend app server ( port 3000)
    ├── LICENSE
    └── README.md               # Documentation

Use `yarn` to install the project dependencies:

```bash
yarn
```

Start Project run following command and it will start frontend and backend both applications
```bash
yarn start 
```
Frontend ( ReactJS ) application local url http://localhost:3000 
<br />
Backend ( NodeJS Restful API server ) application local url http://localhost:3001


### NodeJS Server 
 server handles CURD api calls for todo and user authentication and authorization is managed from oAuth0.
  ```
├── server
│   ├── middleware
|   |   |   ├── auth0.middleware.js                      # middleware to validate scope 
|   |   |   ├── error.middleware.js                      # middleware to manage errors
|   |   |   ├── not-found.middleware.js                  # middleware for not found requests
│   ├── todos
|   |   |   ├── data.js                                  # todos data (no db integrated)
|   |   |   ├── todos.permissions.js                     # defined all permissions ( same as in oAuth dashboard )
|   |   |   ├── todos.router.js                          # API router for todo 
|   |   |   ├── todos.service.js                         # all business logics managed in server     
│   └── index.js
| ....
```

**Endpoints and security**
<br />

GET `/api/todo` : fetch all todos and it is accesible by all logged in users.

POST `/api/todo` : create new todo and only accessible by admin user.

DELETE `/api/todo` : delete todo and only accessible by admin user.

UPDATE `/api/todo` : update existing todo and only accessible by admin user.

** oAuth0 permissions ***
  ```
  Read: "read:todos"
  Write: "write:todos"
  Delete: "delete:todos"
  Create: "create:todos"
  ```

### React application 
 Frontend project is simple react application and by using oAuth0 javascript library its authentication managed. frontend application folder structure

  ```
├── src
│   ├── components
|   |   |   ├── Todos                                    # Todos comopnents 
|   |   |   |       ├── CreateOrUpdateTodo.js            # dialog form for create and update todo
|   |   |   |       ├── Todo.js                          # Todo component 
|   |   |   |       ├── index.js                         # Wrapper component handles logics & presentation
| ....
│   ├── views
|   |   |   ├── Home.js                                  # Home page which renders Todo wrapper component
|   |   |   ├── ...
| ....
```
 
## Configure credentials

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

replace values in `src/auth_config.json`
<br /> 

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}",
  "appOrigin": "{OPTIONAL: THE BASE URL OF YOUR APPLICATION (default: http://localhost:3000)}",
  "apiOrigin": "{OPTIONAL: THE BASE URL OF YOUR API (default: http://localhost:3001)}"
}
```
