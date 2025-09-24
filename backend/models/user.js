const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const validator = require('validator');

const userScema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        trim: true,


    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail
        }
    },
    password:
    {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return typeof value === "string" && validator.isStrongPassword(value,
                    {
                        minLength: 8,
                        minLowercase: 0,
                        minUppercase: 0,
                        minNumbers: 0,
                        minSymbols: 0

                    })
            }
            , message: "Passwod must containt 8 charecters",
        }

    }


})
const hashpass = async (password) => {
    const saltround = 10;
    const salt = await bcrypt.genSalt(saltround);
    const hasedPassward = await bcrypt.hash(password, salt);
    return hasedPassward;
}
userScema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hashpass(this.password);
    next()

})
userScema.methods.comparePassword = async function (enterdpass) {
    return bcrypt.compare(enterdpass, this.password)
}

const User = mongoose.model("User", userScema);
module.exports = User
