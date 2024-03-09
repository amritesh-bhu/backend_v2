import { userSession } from "../../domain/session/session";
import { SESSION_NAME } from "../env/env"

export const sessionCheck = async (req,res,next) =>{
    const sessionId = req.cookies[SESSION_NAME];
    const user = await userSession.getSession(sessionId)
    console.log(user)
    if(!user){
        throw  new Error("Please login")
    }
    req.userId = user
    next()
}