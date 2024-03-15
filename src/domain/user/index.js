import mongoose from 'mongoose';
import crypto from 'crypto';
import { nanoid } from 'nanoid';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    }
})

const userModel = mongoose.model('users', userSchema)

const hashPassword = (password, salt) => crypto.createHash('md5').update(Buffer.from(password)).digest('hex') + salt

const authenticateUser = async ({ email, password }) => {
    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error("User with this email/password does not exist")
    }
    if(user.password == hashPassword(password,user.salt)){
        return user
    }

    throw new Error("Invalid email/password")
}

const createUser = async ({ email, password }) => {
    const salt = nanoid(8)
    const user = await userModel.create({ email, password: hashPassword(password, salt), salt })
    return user
}

const registerUser = async ({userId}) =>{
    const user = await userModel.findOne({_id:userId})
    return user
}


export const userDomain = {
    authenticateUser,
    createUser,
    registerUser
}