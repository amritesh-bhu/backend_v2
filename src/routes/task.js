import { taskDomain } from "../domain/tasks/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"

export const taskRouter = (basepath, app) => {
    app.get(`${basepath}`, handleRoute(async (req, res) => {
        const { userId } = req
        const tasks = await taskDomain.listTask({ userId })
        // Object.keys(wsCon[userId]).forEach((client)=>{
        //     wsCon[userId][client].send(tasks)
        // })   
        res.json(tasks)
    }))

    app.post(`${basepath}/taskbyid`,handleRoute(async (req,res)=>{
        const {ids} = req.body
        const tasks = await taskDomain.getTasksById({ids})
        res.json(tasks)
    }))

    app.post(`${basepath}/newtask`, handleRoute(async (req, res) => {
        const { value } = req.body
        const { userId } = req
        const item = await taskDomain.createTask({ value, userId })
        res.json(item)
    }))

    app.put(`${basepath}/updatetask`, handleRoute(async (req, res) => {
        const { id, value } = req.body
        const item = await taskDomain.updateTask({ id, value })
        res.json(item)
    }))

    app.delete(`${basepath}/:id`, handleRoute(async (req, res) => {
        const id = req.params.id
        const item = await taskDomain.deleteTask({ id })
        res.json(item)
    }))
}