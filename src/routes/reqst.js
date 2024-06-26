import { requestDomain } from "../domain/actionRequest/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"
import { mailSender } from "../lib/sendEmail/email-sender.js"
import { resourceOwnerEmail } from "../middlewares/resourceOwner.js"

export const requestRouter = (basepath, app, wsConn) => {
    app.post(`${basepath}`, handleRoute(resourceOwnerEmail), handleRoute(async (req, res) => {
        const { resourceId, action } = req.body
        const { ownerEmail, resourceOwner } = req
        const resource = await requestDomain.addActionableRequest({ ownerEmail, resourceOwner, resourceId, action })
        // mailSender(resourceOwner,`${ownerEmail} has requested for the ${action} action on a resource !`)
        res.json(resource)
    }))

    app.get(`${basepath}/listrqsts`, handleRoute(async (req, res) => {
        const { ownerEmail } = req
        const requests = await requestDomain.listRequests({ ownerEmail })
        res.json(requests)
    }))

    app.delete(`${basepath}/:id`, handleRoute(async (req, res) => {
        const id = req.params.id
        const item = await requestDomain.deleteRequest({ id })

        res.json(item)
    }))
}