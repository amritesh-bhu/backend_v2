import { requestDomain } from "../domain/actionRequest/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"

export const requestRouter = (basepath, app) => {
    app.post(`${basepath}`, handleRoute(async (req, res) => {
        const { ownerEmail, resourceId, action } = req.body
        const { email } = req

        const resource = await requestDomain.addActionableRequest({ email, ownerEmail, resourceId, action })
        res.json(resource)
    }))

    app.get(`${basepath}/task`,handleRoute(async (req,res)=>{
        const {email} = req
        const requests = await requestDomain.listRequests({email})
        res.json(requests)
    }))

    app.delete(`${basepath}/:id`,handleRoute(async (req,res)=>{
        const {id} = req.params.id
        const item = await requestDomain.deleteRequest({id})

        res.json(item)
    }))
}