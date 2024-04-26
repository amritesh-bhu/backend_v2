import { rbacDomain } from "../domain/rbac/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"
// import { sendWsMessage } from "../lib/ws-utils.js"

export const rbacRouter = (basepath, app, wss) => {
    // get all shared items
    app.get(`${basepath}`, handleRoute(async (req, res) => {
        const { ownerEmail } = req
        const resources = await rbacDomain.listResources({ ownerEmail })
        wss.clients.forEach(client => {
            client.send(resources)
        });
        res.json(resources)
    }))

    //roleBinding
    app.post(`${basepath}/rolebinding`, handleRoute(async (req, res) => {
        const { userEmail, resourceId, actions } = req.body
        const { ownerEmail } = req
        const resource = await rbacDomain.addRoleBinding({ ownerEmail, userEmail, resourceId, actions })



        // TODO: get all active sessions of userEmail ( user to whoom we have to send message )
        // const sessions = []

        // sessions.array.forEach(element => {
        //     sendWsMessage(element, "you go message refresh your page")
        // });
        

        res.json(resource)
    }))

    //checking can i perform this operation on this task
    app.post(`${basepath}/cani`, handleRoute(async (req, res) => {
        const { resourceId, actions } = req.body
        const { ownerEmail } = req
        const decision = await rbacDomain.canI({ ownerEmail, resourceId, actions })
        res.json(decision)
    }))

    //delteing the resource
    app.delete(`${basepath}/:id`, handleRoute(async (req, res) => {
        const id = req.params.id
        const resource = await rbacDomain.deletResource({ id })
        res.json(resource)
    }))

    //action request
    app.put(`${basepath}/actionupdate`, handleRoute(async (req, res) => {
        const { email, resourceId, actions } = req.body
        const resource = await rbacDomain.updateAction({ email, resourceId, actions })
        res.json(resource)
    }))
}