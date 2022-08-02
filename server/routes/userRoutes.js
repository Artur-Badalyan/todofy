const express = require('express');
const swaggerUi = require('swagger-ui-express');
const middleware = require('../middleware/middlewares');
const swaggerDocument = require('../swagger.json');

const userController = require('../controllers/userController');

const routes = express.Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
// routes.post('/api/signup', middleware.checkNamePass, middleware.checkEmail, middleware.encryptPass, userController.signup);
routes.post('/api/signup', userController.signup);
routes.post('/api/auth/login', middleware.checkEmpty, middleware.checkLoginUser, middleware.checkPassword, middleware.addToken, userController.login);
routes.post('/api/userProfile', middleware.refreshToken, middleware.getUserData, userController.userProfile);

module.exports = routes;
