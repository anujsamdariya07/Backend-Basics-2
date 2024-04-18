import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        lowerCase: true, 
        trim: true, 
        index: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowerCase: true, 
        trim: true,
    }, 
    fullName: {
        type: String, 
        required: true, 
        trim: true, 
        index: true, 
    }, 
    avatar: {
        type: String, // cloudinary url
        required: true, 
    }, 
    coverImage: {
        type: String, 
    }, 
    watchHistory: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Video'
        }
    ], 
    password: {
        type: String, 
        required: [true, 'Password is required!']
    }, 
    refreshToken: {
        type: String, 
    }
}, {timestamps: true})

// Do not use arrow function in pre as arrow function does not have 'this' keyword
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    // sign method of jwt generates token, which makes it clear to the server to give information to those who have token, like a key
    return jwt.sign(
        {
            _id: this._id, 
            email: this.email, 
            username: this.username, 
            fullName: this.fullName, 
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.refreshAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id, 
            email: this.email, 
            username: this.username, 
            fullName: this.fullName, 
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)