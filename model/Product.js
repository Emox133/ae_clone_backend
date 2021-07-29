const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    description: {
        type: String
    },
    unit_amount: {
        currency_code: {
            type: String,
            default: 'USD'
        },
        value: {
            type: String
        }
    },
    sku: {
        type: String,
        default: 'item'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product