# ASSIGNMENT 2  
Assignment 2 of JBNU Web Service Design class  
Developped by PASSELEGUE Anne Sarah  

### Project description  
This project is a backend e-commerce system for a bookstore, built entirely with Express.js and MySQL, with no frontend. It allows users to browse and purchase books, manage accounts, and supports basic administrative functions. All functionality is provided via a REST API, with a database designed to ensure data integrity and secure handling of authentication.  
  
### Swagger  
The Swagger documentation can be viewed at the address `/api-docs`.  
  
### API root address  
During local development, the API is available at :  
http://localhost:3000/  
When deployed, this address will be replaced by the public server URL.  
Accessing this endpoint returns a welcome message and confirms that the API is running.  
  
### How to install  
Import database (file *bookstore.sql*)  
Clone repository  
Create a *.env* file with the variables `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and `DB_PORT`   
`npm install` to install dependencies (only the first time)  
`node server.js` to start server  
  
### Postman collection  
This Postman collection demonstrates several endpoints of the bookstore backend API built with Express.js. It includes some user management routes (creating users, fetching user data, and viewing user orders), authentication routes (login and token refresh), book-related routes (fetching books, viewing reviews, updating, and deleting books), and error handling routes (e.g., 404). The collection showcases different HTTP methods (GET, POST, PUT, DELETE) and how the API responds with various status codes. Some routes require admin authentication, so a valid JWT token must be included in the request headers.  
