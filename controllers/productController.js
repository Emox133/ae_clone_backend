const catchAsync = require('./../utils/catchAsync')
const Product = require('./../model/Product')

exports.getAllProducts = catchAsync(async(req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        message: 'success',
        products
    })
})

exports.createProducts = catchAsync(async(req, res, next) => {
    const newProduct = await Product.create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description
    })

    res.status(201).json({
        message: 'success',
        newProduct
    })
})