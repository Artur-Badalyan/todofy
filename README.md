[![N|Solid](https://i.ibb.co/9c1yxLh/logo.png)](https://nodesource.com/products/nsolid)

# LRG
## _Login-Registration-Groups_

### LRG is a user login-registration template that is used for a website

### Functional Specification Document

- https://bit.ly/3Cjz3id

## Tech

LRG uses a number of open source projects to work properly:

- [React] - Library for creating user interfaces
- [node.js] - evented I/O for the backend
- [Express] - A fast, flexible, minimalistic web framework for Node applications.js
- [MySQL] - Relational database management system

## Installation
#### Make sure that you see the following files
```sh
client
server
README.md
```

### Install the dependencies for server and client
```sh
cd server
npm i
cd ../client
npm i
```

#### Add your username,password and database in server > config > config.json

#### Create ․env file and fill in the specified fields as .env.example in the file

#### Start server
```sh
cd server
npm run start
```

#### Start client
```sh
cd client
npm run start
```

## Project APIs

- If you want to see the projects APIs
- If server is connected, write http://localhost:8008/api-docs/ in browser
- 8008 instead of your port on which the server is running


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[React]: <https://reactjs.org/>
[MySQL]: <https://www.mysql.com/>
