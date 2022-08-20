const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const VALIDATION = require('../utils/constants');

// middlewares for /signup

const checkNamePass = (req, res, next) => {
    const { userName } = req.body;
    const { password } = req.body;

    if (!userName.match('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$')) {
        res.status(401).end(JSON.stringify(
            {
                status: VALIDATION.CHECK_USER_NAME
            }
        ));
        return;
    }

    if (!password.match('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')) {
        res.status(401).end(JSON.stringify(
            {
                status: VALIDATION.CHECK_PASS
            }
        ));
        return;
    }

    User.findOne({
        where: {
            userName
        }
    }).then((data) => {
        if (data instanceof User) {
            res.status(401).end(JSON.stringify(
                {
                    status: VALIDATION.USERNAME_USED
                }
            ));
        } else {
            next();
        }
    });
};

const checkEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email.match('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$')) {
        res.status(401).end(JSON.stringify(
            {
                status: VALIDATION.CHECK_EMAIL
            }
        ));
    } else {
        User.findOne({
            where: {
                email
            }
        }).then((data) => {
            if (data instanceof User) {
                res.status(401).end(JSON.stringify(
                    {
                        status: VALIDATION.EMAIL_USED
                    }
                ));
            } else {
                next();
            }
        });
    }
};

const encryptPass = async (req, res, next) => {
    const salt = 10;
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = encryptedPassword;
    next();
};

// middlewares for /login

const checkEmpty = (req, res, next) => {
    User.findAll().then((data) => {
        if (data.length === 0) {
            res.status(401).end(JSON.stringify(
                {
                    status: VALIDATION.SIGN_FOR_LOGIN
                }
            ));
        }
    });
    next();
};

const checkLoginUser = (req, res, next) => {
    const { userName } = req.body;

    if (userName) {
        User.findOne({
            where: {
                userName
            }
        }).then((model) => {
            if (!(model instanceof User)) {
                User.findOne({
                    where: {
                        email: req.body.userName
                    }
                }).then((data) => {
                    if (!(data instanceof User)) {
                        res.status(401).end(JSON.stringify(
                            {
                                status: VALIDATION.USER_NAME_WRONG
                            }
                        ));
                    } else {
                        res.locals.comparePassword = data.password;
                        next();
                    }
                });
            } else {
                res.locals.comparePassword = model.password;
                next();
            }
        });
    } else {
        res.status(400).end(JSON.stringify(
            {
                status: VALIDATION.USER_NAME_WRONG
            }
        ));
    }
};

const checkPassword = async (req, res, next) => {
    const { password } = req.body;
    const { comparePassword } = res.locals;

    await bcrypt.compare(password, comparePassword)
        .then((data) => (data ? next()
            : res.status(400).end(JSON.stringify(
                {
                    status: VALIDATION.PASS_WRONG
                }
            ))));
};

const addToken = (req, res, next) => {
    const { userName } = req.body;
    const expirySeconds = 20 * 60;

    const token = jwt.sign({ userName }, process.env.REACT_APP_TOKEN_SECRET, {
        expiresIn: expirySeconds
    });

    res.locals = { token };
    next();
};

// middlewares for /userProfile

const refreshToken = (req, res, next) => {
    const { token } = req.body;
    const jwtKey = process.env.REACT_APP_TOKEN_SECRET;
    const expirySeconds = 20 * 60;
    let newToken;

    let payload;
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).end(JSON.stringify(
                {
                    status: e
                }
            ));
        }
        res.status(400).end();
    }

    const { userName } = payload;
    const nowSeconds = Math.round(Number(new Date()) / 1000);

    if (payload.exp - nowSeconds < 60) {
        newToken = jwt.sign({ userName }, process.env.REACT_APP_TOKEN_SECRET, {
            expiresIn: expirySeconds
        });
        res.locals.token = newToken;
    } else {
        res.locals.token = token;
    }

    res.locals.userName = userName;
    next();
};

const getUserData = (req, res, next) => {
    const { userName } = res.locals;

    User.findOne({
        where: {
            userName
        }
    }).then((data) => {
        if (data instanceof User) {
            res.locals.email = data.email;
        } else {
            res.status(501).end();
        }
    }).then(() => next());
};

module.exports = {
    checkNamePass,
    checkEmail,
    encryptPass,
    checkEmpty,
    checkLoginUser,
    checkPassword,
    addToken,
    refreshToken,
    getUserData
};
