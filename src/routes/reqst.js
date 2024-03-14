import { requestDomain } from "../domain/actionRequest/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"

export const requestRouter = (basepath, app) => {
    app.post(`${basepath}/sharedtask/req`, handleRoute(async (req, res) => {
        const { ownerEmail, resourceId, action } = req.body
        const { requesterEmail } = req

        const resource = await requestDomain.addActionableRequest({ requesterEmail, ownerEmail, resourceId, action })
        res.json(resource)
    }))

    // app.get(`${basepath}/sharedtask`,handleRoute(async (req,res)=>{

    // }))

    // app.delete(`${basepath}/:id`,handleRoute(async (req,res)=>{
    //     //delete the shared action
    // }))
}