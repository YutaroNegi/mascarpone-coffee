const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const MascarponeUser = require('../models/MascarponeUser')
const MascarponeOrder = require('../models/MascarponeOrder')
require('dotenv').config()
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')

let auth = function(req, res, next) {
    const token = req.body.token
    if(!token) return res.status(401).json({message: 'Access Denied'})

    try {
        const verify = jwt.verify(token, SECRET)
        req.user = verify
        next()
    } catch (error) {
        res.status(401).json({message: 'Access Denied'})
    }
}

router.post('/createAccount',async function (req, res){
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const mascarponeUser = new MascarponeUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
        })
        
        await mascarponeUser.save()
        res.status(200).send({sucess : 1})
    } catch (error) {
        console.log('error creating account, error: ', error);
        res.status(500).send({sucess : 0})
    }

})

router.post('/login',async function (req, res){
    try {
        let found = await MascarponeUser.findOne({ email: req.body.email}).exec();
        let check = bcrypt.compareSync(req.body.password, found.password)
        let orders = await MascarponeOrder.find({ email: req.body.email }).exec();

        if(check){
            const token = jwt.sign({email: req.body.email}, SECRET)
            res.status(200).send({success : 1, firstName: found.firstName, lastName: found.lastName, email: found.email, orders: orders, token: token})
        }else{
            res.status(500).send({success : 0})
        }
        
    } catch (error) {
        console.log('error creating account, error: ', error);
        res.status(500).send({sucess : 0})
    }

})

router.post('/verifyUser', auth,async function (req, res){
    try {
        let found = await MascarponeUser.findOne({ email: req.body.email}).exec();
        let orders = await MascarponeOrder.find({ email: req.body.email }).exec();

        const token = jwt.sign({email: req.body.email}, SECRET)
        res.status(200).send({success : 1, firstName: found.firstName, lastName: found.lastName, email: found.email, orders: orders, token: token})
    } catch (error) {
        console.log('error creating account, error: ', error);
        res.status(500).send({sucess : 0})
    }

})

router.post('/updateUser', auth, async function (req, res){
    try {
        let found = await MascarponeUser.findOne({ email: req.body.email}).exec();
        let check = bcrypt.compareSync(req.body.password, found.password)

        if(!check){
            res.status(500).send({success : 0})
            return
        }

        await MascarponeUser.findOneAndUpdate({ email: req.body.email}, {firstName: req.body.firstName, lastName: req.body.lastName}).exec()
        res.status(200).send({success : 1})
    } catch (error) {
        console.log('error updating user', error);
        res.status(500).send({sucess : 0})
    }
})

router.post('/createOrder',auth ,async function (req, res){
    try {
        const mascarponeOrder = new MascarponeOrder({
            orderID: Math.floor(Math.random() * 100000),
            userEmail: req.body.email,
            coffee: req.body.coffee || 0,
            tea: req.body.tea || 0,
            espresso: req.body.espresso || 0,
            hamburger: req.body.hamburger || 0,
            iceCream: req.body.iceCream || 0,
            cake: req.body.cake || 0,
            value: req.body.value
        })

        await mascarponeOrder.save()

        res.status(200).send({sucess: 1, orderID: mascarponeOrder.orderID})
    } catch (error) {
        console.log('error updating user', error);
        res.status(500).send({sucess : 0})
    }
})



module.exports = router