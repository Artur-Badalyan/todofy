const express = require('express');
// const middleware = require('');
const userController = require('');

module.exports = (app) => {
    app.route('/signup').post(verifyLoginToken, users.getUsers);
    app.route('/auth/login').post(verifyLoginToken, users.getUser);
    app.route('/userProfile').post(users.updateFirebaseToken);
};