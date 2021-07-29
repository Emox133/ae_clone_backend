const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/AppError')
const User = require('./../model/User')
const {promisify} = require('util')
const signToken = require('./../utils/signToken')
const jwt = require('jsonwebtoken')

exports.signup = catchAsync(async(req, res, next) => {
    const registeredUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })

    const token = signToken(registeredUser._id)

    res.status(201).json({
        message: 'success',
        token
    })
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body

    if(!email || !password) {
        return next(new AppError('Molimo vas unesite email i lozinku.', 400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user || !await user.comparePasswords(password, user.password)) {
        return next(new AppError('Netačan e-mail ili lozinka.', 401))
    }

    const token = signToken(user._id)

    res.status(201).json({
        message: 'success',
        token
    })
})

exports.protectRoutes = catchAsync(async(req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(new AppError('Neispravan token', 401))
    }

    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)

    if(!currentUser) {
        return next(new AppError('Korisnik povezan sa ovim tokenom više ne postoji.', 401))
    }

    req.user = currentUser
    next()
})