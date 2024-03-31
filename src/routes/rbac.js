import { rbacDomain } from "../domain/rbac/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"

export const rbacRouter = (basepath, app) => {
    // get all shared items with you
    app.get(`${basepath}`, handleRoute(async (req, res) => {
        const { ownerEmail } = req
        console.log(ownerEmail)
        const resources = await rbacDomain.listResources({ ownerEmail })
        res.json(resources)
    }))

    //roleBinding
    app.post(`${basepath}/rolebinding`, handleRoute(async (req, res) => {
        const { userEmail, resourceId, actions } = req.body
        const { ownerEmail } = req
        const resource = await rbacDomain.addRoleBinding({ ownerEmail, userEmail, resourceId, actions })
        res.json(resource)
    }))

    //checking can i perform this operation on this task
    app.get(`${basepath}/cani`, handleRoute(async (req, res) => {
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
        console.log({email,resourceId,actions})

        const resource = await rbacDomain.updateAction({ email, resourceId, actions})
        res.json(resource)
    }))
}