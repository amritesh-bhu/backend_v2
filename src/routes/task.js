import { taskDomain } from "../domain/tasks/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"

export const taskRouter = (basepath, app) => {
    app.get(`${basepath}`, handleRoute(async (req, res) => {
        const { userId } = req.body
        const tasks = await taskDomain.listTask({ userId })
        res.json(tasks)
    }))

    app.post(`${basepath}/newtask`, handleRoute(async (req, res) => {
        const { value, userId } = req.body
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
        console.log(id)
        const item = await taskDomain.deleteTask({ id })
        res.json(item)
    }))
}