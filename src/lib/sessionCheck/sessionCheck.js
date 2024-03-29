import { userSession } from "../../domain/session/session.js";
import { userDomain } from "../../domain/user/index.js";
import { SESSION_NAME } from "../env/env.js"

export const sessionCheck = async (req, res, next) => {
    const sessionId = req.cookies[SESSION_NAME]
    const userId = await userSession.getSession({ sessionId })
    const email = await userDomain.registerUser({userId})
    // console.log(email.email)
    if (!userId) {
        res.status(401).send({ msg: "Unauthorised user, please login" })
    }
    console.log('session user',userId)
    req.userId = userId
    req.email = email.email
    next()  
}