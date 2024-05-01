import { userSession } from '../domain/session/session.js'
import { userDomain } from '../domain/user/index.js'
import { SESSION_NAME } from '../lib/env/env.js'
import { handleRoute } from '../lib/handleRoutes/handleRoute.js'
import { sessionCheck } from '../middlewares/sessionCheck.js'

export const authRoutes = (basepath, app) => {

    app.get(`${basepath}/me`, handleRoute(sessionCheck), handleRoute(async (req, res) => {
        if (!req.userId) {
            res.status(401).send({ msg: 'Please login' })
            return
        }
        res.send({ msg: 'already logged in' })
    }))

    app.delete(`${basepath}/logout`, handleRoute(sessionCheck), handleRoute(async (req, res) => {
        const session_id = req.cookies[SESSION_NAME]
        await userSession.deleteUserSession(req.userId, session_id)
        await userSession.deleteSession(session_id)
        res.clearCookie(SESSION_NAME)
        res.json({ msg: 'You have been logged out!' })
    }))

    app.delete(`${basepath}/alldevices/logout`, handleRoute(sessionCheck), handleRoute(async (req, res) => {
        const session_id = req.cookies[SESSION_NAME]
        const userId = req.userId
        await userSession.logoutFromAllDevices(userId)
        await userSession.deleteSession(session_id)
        res.clearCookie(SESSION_NAME)
        res.json({ msg: 'You have been logout from all the devices' })
    }))

    app.post(`${basepath}/login`, handleRoute(async (req, res) => {
        const { email, password } = req.body
        const user = await userDomain.authenticateUser({ email, password })
        console.log(user)
        //creating session for the user 
        const userId = user._id
        const session_id = await userSession.createSession(userId.toString(), user.email.toString())
        res.cookie(SESSION_NAME, session_id, { httpOnly: true, secure: true, sameSite: 'None' })

        await userSession.manageSession(userId, session_id)
        res.json({ msg: "logged in successfully!" })
    }))

    app.post(`${basepath}/signup`, handleRoute(async (req, res) => {
        const { email, password } = req.body
        const user = await userDomain.createUser({ email, password })
        res.json({ user, msg: "User has been created successfully!" })
    }))
}