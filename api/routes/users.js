const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const { Users } = require('../db/models')

//---> /api/users

//Get user by ID
router.get('/', async (req, res, next) => {
    try {
        const { id } = req.user
        const user = await Users.findById(id).exec()
        if(!user) return res.status(400).send('No user found')

        res.status(200).json(user)

    } catch(err) { next(err) }
})

//Get user by treeId (to not repeat naming)
router.get('/', async (req, res, next) => {
    try {
        const { treeId } = req.body
        const user = await Users.findOne({ 'trees.treeId': treeId }).exec()
        if(!user) return {}

        res.status(200).json(user)

    } catch(err) { next(err) }
})

//Get users with tree names (search type: named)
router.get('/named', async (req, res, next) => {
    try {
        const users = await Users.find({ 'trees.0': { '$exists': true } }).exec()
        if(!users) return res.status(400).send('No user with tree name found')

        //Returning trees
        let trees = []
        users.map(user => user.trees.map(tree => trees.push(tree)))
        res.status(200).json(trees)

    } catch(err) { next(err) }
})

//Post trees to user (add a tree name)
router.post('/', async (req, res, next) => {
    try {
        const { userId, 
            userName,
            tree_id, 
            tree_name, 
            zipcode, 
            status, 
            health, 
            spc_common, 
            spc_latin 
        } = req.body
        const user = await Users.findOneAndUpdate(
            { _id: userId }, 
            { $push: { 
                trees: {
                    tree_id, 
                    userName,
                    name: tree_name,
                    zipcode,
                    status,
                    health,
                    spc_common,
                    spc_latin
                } } }, 
            { new: true })
        if(!user) return res.status(400).send('No user found by treeId')

        res.status(200).json(user)

    } catch(err) { next(err) }
})

module.exports = router