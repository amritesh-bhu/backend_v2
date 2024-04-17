import { userSession } from "../domain/session/session.js";
import { SESSION_NAME } from "../lib/env/env.js"

export const sessionCheck = async (req, res, next) => {
    const sessionId = req.cookies[SESSION_NAME]
    const userInfo = await userSession.getSession({ sessionId })
    const user = JSON.parse(userInfo)
    if (!user.userId) {
        res.status(401).send({ msg: "Unauthorised user, please login" })
    }
    req.userId = user.userId
    req.ownerEmail = user.email
    next()  
}