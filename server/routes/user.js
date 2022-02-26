const express = require('express');
const userRouter = express.Router();
const User = require('../models/users.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create user
userRouter.post('/create', async (req, res) => {
    const { name, email, password } = req.body;
    const is_email = await User.findOne({ email: email });
    if (is_email) {
        res.send({
            status: 0,
            message: 'Email already exists'
        })
    } else {
        const salt = await bcryptjs.genSalt();
        const new_password = await bcryptjs.hash(password, salt);
        const users = new User({
            name: name,
            email: email,
            password: new_password
        });
        const result = await users.save();
        if (result) {
            res.send({
                status: 1,
                message: 'User Add Successfully'
            })
        } else {
            res.send({
                status: 0,
                message: 'Server Problem'
            })
        }
    }

})
// user login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const is_email = await User.findOne({ email, email });
    if (is_email) {
        const passwords = await bcryptjs.compare(password, is_email.password);
        if (passwords) {
            const token = jwt.sign({
                user_id: is_email._id,
                name: is_email.name,
                email: is_email.email
            }, 'hilalahmadkhanfrompakistan');

            res.send({
                status: 1,
                message: 'User Login Successfully',
                jwt: token,
            });
        } else {
            res.send({
                status: 0,
                message: 'Invalid email and password',
            });
        }
    } else {
        res.send({
            status: 0,
            message: 'Email not Found',
        });
    }
})

// get user
userRouter.get('/users', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const users = jwt.verify(token, "hilalahmadkhanfrompakistan");
        res.send({ users: users })
    } catch (err) {
        // console.log(err);
    }
})

module.exports = userRouter;