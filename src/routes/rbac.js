import { rbacDomain } from "../domain/rbac"
import { handleRoute } from "../lib/handleRoutes/handleRoute"

const rbacTasks = (basepath, app) => {
    // get all shared items with you
    app.get(`${basepath}`, handleRoute(async (req, res) => {
        const {email} = req.body
        const resources = await rbacDomain.listResources({email})
        res.json(resources)
    }))

    //roleBinding
    app.post(`${basepath}/rolebinding`,handleRoute(async (req,res)=>{
        const {email,resourceId,action} = req.body
        const resorce = await rbacDomain.addRoleBinding({email,resourceId,action})
        res.json(resource)
    }))

    //checking can i perform this operation on this task
    app.get(`${basepath}/cani`, handleRoute(async (req, res) => {
        const {email,resourceId,action} = req.body
        const decision = await rbacDomain.canI({email,resourceId,action})
        res.json(decision)
    }))

    //delteing the resource
    app.delete(`${basepath}/:id`, handleRoute(async (req, res) => {
        const id = req.params.id
        const resource = await rbacDomain.deletResource({id})
        res.json(resource)
    }))
}