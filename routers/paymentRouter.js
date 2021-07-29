const express = require('express')
const paymentController = require('./../controllers/paymentController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/paypal')
.get(authController.protectRoutes, paymentController.paypalBridge, paymentController.paypal)

router.route('/paypal/orders')
.get(authController.protectRoutes, paymentController.ordersBridge)

router.route('/paypal/success')
.get(authController.protectRoutes, paymentController.paypalBridge, paymentController.successRoute)

router.route('/paypal/cancel')
.get(paymentController.cancelRoute)

module.exports = router