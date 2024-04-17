import { userDomain } from "../domain/user/index.js"

export const resourceOwnerEmail = async (req,res,next)=>{
    const {userId} = req.body
    const user = await userDomain.registerUser({userId})
    console.log('user detail',user)
    if(!user){
        throw new Error('user for this resource does not exist')
    }

    req.resourceOwner = user.email

    next()
}