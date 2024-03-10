import { taskDomain } from "../domain/tasks/index.js"
import { handleRoute } from "../lib/handleRoutes/handleRoute.js"

export const taskRouter = (basepath, app) => {
    app.get(`${basepath}/tasks`, handleRoute(async (rea, res) => {
        const tasks = await taskDomain.listTask({ userId })
        rea.json(tasks)
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
        const { id } = req.params.id
        const item = await taskDomain.deleteTask({ id })
        res.json(item)
    }))
}