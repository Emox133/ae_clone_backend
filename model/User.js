const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Molimo vas unesite vaše ime.']
    },
    email: {
        type: String,
        required: [true, 'Molimo vas unesite vašu email adresu.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Molimo vas unesite lozinku.'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Molimo vas potvrdite lozinku.'],
        validate: {
            validator: function (val) {
                return val === this.password
            },
            message: "Lozinke se ne podudaraju."
        }
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.confirmPassword = undefined

    next()
})

userSchema.methods.comparePasswords = async function(userPassword, candidatePassword) {
    return await bcrypt.compare(userPassword, candidatePassword)
};

const User = mongoose.model('User', userSchema)

module.exports = User