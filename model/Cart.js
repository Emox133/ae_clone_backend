const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cartOwner: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Korpa mora imati vlasnika.']
    },
    products: {
        type: Array,
        default: []
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart