import { userSession } from "../../domain/session/session.js";
import { SESSION_NAME } from "../env/env.js"

export const sessionCheck = async (req, res, next) => {
    const sessionId = req.cookies[SESSION_NAME]
    const userId = await userSession.getSession({ sessionId })
    if (!userId) {
        res.status(401).send({ msg: "Unauthorised user, please login" })
    }
    req.body.userId = userId
    next()
}