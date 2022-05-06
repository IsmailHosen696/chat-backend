const express = require('express');
const routes = express.Router();
const User = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const verifytoken = require('../config/verify');
const { forgetpassword, sendmail } = require('../helpers/helper');
const tokensecret = process.env.tokensecret


routes.post("/auth/new/register/:token", async (req, res) => {
    await jwt.verify(req.params.token, tokensecret, async (err, decode) => {
        if (err) {
            res.status(400).json({ err })
        } else {
            await User.findOne({ email: decode.email }).then(async (user) => {
                if (!user) {
                    const usr = new User({ ...decode })
                    await usr.save().then(() => {
                        res.status(201).json({ token: req.params.token, ...decode })
                    }).catch((er) => {
                        res.status(400).json(er)
                    })
                } else {
                    res.status(400).json({ msg: "user already created" })
                }
            })
        }
    })
})
routes.post("/auth/login", async (req, res) => {
    const { email, password } = req.body.userdata
    try {
        await User.findOne({ email }).then(async (user) => {
            if (user) {
                await bcrypt.compare(password, user.password, async (err, success) => {
                    if (!success) {
                        res.status(403).json({ msg: "Credentials aren't matching . Fill all the fields catefully ." })
                    } else {
                        const userobj = {
                            email: user.email,
                            password: user.password,
                            username: user.username
                        }
                        const token = await jwt.sign({ ...userobj }, tokensecret, { expiresIn: "5d" })
                        res.status(200).json({ token, user: { userobj } })
                    }
                })
            } else {
                res.status(404).json({ msg: "Credentials doesn't matching . May be there is no user or the password id wrong ." })
            }
        })

    } catch (error) {
        res.status(400).json({ msg: error })
    }
})

routes.patch("/auth/reset/pass", verifytoken, async (req, res) => {
    const { password } = req.body;
    const { email } = req.user;
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.findOneAndUpdate({ email }, { password: hash })
        .then(() => {
            res.status(201).json({ msg: "password updated" })
        }).catch((err) => {
            res.status(400).json({ msg: err })
        })
})

routes.post("/auth/forgetpassword", async (req, res) => {
    const { email } = req.body
    try {
        const token = await jwt.sign({ email }, tokensecret, { expiresIn: "9000s" })
        await User.findOne({ email }).then(async (user) => {
            if (user) {
                await forgetpassword(email, token).then(() => {
                    res.status(200).json({ msg: "An email has been sent to the provided gmail account . Check that for further instructions ." })
                }).catch((err) => {
                    res.status(400).json({ msg: err })
                })
            } else {
                res.status(400).json({ msg: "No user found with the wmail" })
            }
        })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
})

routes.post("/auth/register", async (req, res) => {
    const { email, username, password } = req.body.userdata
    try {
        await User.findOne({ email: email }).then(async (user) => {
            if (!user) {
                const salt = await bcrypt.genSalt(10)
                await bcrypt.hash(password, salt).then(async (hash) => {
                    const token = await jwt.sign({ email, username, password: hash }, tokensecret, { expiresIn: "10d" })
                    await sendmail(email, token).then(() => {
                        res.status(201).send({ token: `Bearer ${token}` })
                    }).catch((err) => {
                        res.status(400).json(err)
                    })
                })
            } else {
                res.status(401).json({ msg: "Already have an account with the email ." })
            }
        })

    } catch (error) {

    }
})
module.exports = routes;