const { User } = require('../models');
const VALIDATION = require('../utils/constants');

const signup = async (req, res) => {
    const payload = req.body;

    try {
        await User.create(payload)
    } catch (err) {
        res.status(500).end(JSON.stringify({status: { err }}));
    }

    res.status(200).end(JSON.stringify({
        status: VALIDATION.SUCCESS_SIGN
    }));
}

const login = async (req, res) => {
    res.status(200).end(JSON.stringify(
        {
            status: VALIDATION.SUCCESS_LOGIN,
            data: res.locals
        }
    ));
}

const userProfile = (req, res) => {
    res.status(200).end(JSON.stringify(
        {
            data: res.locals
        }
    ));
}

module.exports = { signup, login, userProfile };
