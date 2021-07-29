const express = require('express')
const cartController = require('./../controllers/cartController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/')
.get(cartController.getCart)
.post(authController.protectRoutes, cartController.createCart)

module.exports = router