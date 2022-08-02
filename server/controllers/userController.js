const { User } = require('../models');
const VALIDATION = require('../utils/constants');

function signup(req, res) {
    console.log('signup')
    const { userName } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    User.create({
        userName,
        email,
        password
    }).then(() => {
        res.status(200).end(JSON.stringify(
            {
                status: VALIDATION.SUCCESS_SIGN
            }
        ));
    }).catch((err) => {
        res.status(501).end(JSON.stringify(
            {
                status: { err }
            }
        ));
    });
}

function login(req, res) {
    console.log('\n\n\n req.body',req.body)
    res.status(200).end(JSON.stringify(
        {
            status: VALIDATION.SUCCESS_LOGIN,
            data: res.locals
        }
    ));
}

function userProfile(req, res) {
    res.status(200).end(JSON.stringify(
        {
            data: res.locals
        }
    ));
}

module.exports = { signup, login, userProfile };
