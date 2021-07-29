const catchAsync = require('./../utils/catchAsync')
const Cart = require('./../model/Cart')

exports.getCart = catchAsync(async(req, res, next) => {
    const cart = await Cart.find()

    res.status(200).json({
        message: 'success',
        cart
    })
})

exports.createCart = catchAsync(async(req, res, next) => {
    const newCart = await Cart.create({
        cartOwner: req.user._id,
        products: req.body.items
    })

    res.status(201).json({
        message: 'success',
        newCart
    })
})
