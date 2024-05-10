import { mongoose } from 'mongoose'

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

const taskModel = mongoose.model('tasks', taskSchema)

const listTask = async ({ userId }) => {
    const tasks = await taskModel.find({ userId })
    return tasks
}

const createTask = async ({ value, userId }) => {
    const task = await taskModel.create({ task: value, userId })
    return task
}

const updateTask = async ({ id, value }) => {
    const item = await taskModel.findOne({ _id: id })
    if (!item) {
        throw new Error('this task does not exist')
    }
    const task = await taskModel.updateOne({ _id: item._id }, { $set: { task: value } })
    return await taskModel.find({_id:item._id})
}

const deleteTask = async ({ id }) => {
    // console.log(id)
    const item = await taskModel.findOne({ _id: id })
    if (!item) {
        throw new Error('this task does not exist')
    }
    const task = await taskModel.deleteOne({ _id: item._id })
    return item
}

const getTasksById = async ({ ids }) => {
    const objectids = ids.map((id) => {
        return new mongoose.Types.ObjectId(id)
    })
    const tasks = await taskModel.find({ _id: { $in: objectids } })
    if (!tasks) {
        throw new Error('some error occured')
    }
    return tasks
}


export const taskDomain = {
    listTask,
    createTask,
    updateTask,
    deleteTask,
    getTasksById
}