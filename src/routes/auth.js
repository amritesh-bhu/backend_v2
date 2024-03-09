import { userSession } from '../domain/session/session.js'
import { userDomain } from '../domain/user/index.js'
import { SESSION_NAME } from '../lib/env/env.js'
import { handleRoute } from '../lib/handleRoutes/handleRoute.js'
import { sessionCheck } from '../lib/sessionCheck/sessionCheck.js'

export const authRoutes = (basepath, app) => {

    app.get(`${basepath}/me`, handleRoute(sessionCheck), handleRoute(async (req, res) => {
        if (!req.userId) {
            res.status(401).send({ msg: 'Please login' })
            return
        }
        res.send({ msg: 'already loged in' })
    }))

    app.delete(`${basepath}/logout`, handleRoute(sessionCheck), handleRoute(async (req, res) => {
        const session_id = req.cookies[SESSION_NAME]
        const session = await userSession.deleteSession({ session_id })
        res.clearCookie(SESSION_NAME)
        res.json({ msg: 'You have been logged out' })
    }))

    app.get(`${basepath}/login`, handleRoute(async (req, res) => {
        const { email, password } = req.body
        const user = await userDomain.authenticateUser({ email, password })

        //creating session for the user 
        const userId = user._id
        const session_id = await userSession.createSession({ userId })
        res.cookie(SESSION_NAME, session_id, { httpOnly: true, secure: true, sameSite: 'None' })

        res.json(user)
    }))

    app.post(`${basepath}/signup`, handleRoute(async (req, res) => {
        const { email, password } = req.body
        const user = await userDomain.createUser({ email, password })
        res.json(user)
    }))
}