const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const { Users } = require('../db/models')

// ---> /api/auth

//Register
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password} = req.body
        if(!name || !email || !password) res.status(400).send('Invalid inputs')

        let user = await Users.findOne({ email }).exec()
        if(user) return res.status(409).send('Conflict: user already registered')

        user = await Users.create({ name, email, password})

        if(user) {
            //Login
            const token = jwt.sign({ id: user.id }, 'namethetree')
            res.status(200).json({ user: { ...user._doc, password: null }, token })
        }
    } catch(err) { next(err) }
})


//Login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password} = req.body
        if(!email || !password) res.status(400).send('Invalid inputs')

        const user = await Users.findOne({ email }).exec()
        if(!user) return res.status(401).send('Invalid credentials')

        const compareRes = await user.comparePassword(password)
        if(!compareRes) return res.status(401).send('Invalid credentials')

        const token = jwt.sign({ id: user.id }, 'namethetree')
        res.status(200).json({ user: { ...user._doc, password: null }, token })

    } catch(err) { next(err) }
})


//Logout
router.get("/logout", (req, res, next) => {
    req.user = null;
    res.status(200).json({});
  })

module.exports = router