import mongoose from 'mongoose'

const rbacSchema = mongoose.Schema({
    email: { type: String, required: true },
    resourceId: { type: String, required: true },
    action: { type: Array }
})

const rbacModel = mongoose.model('sharedTasks', rbacSchema)

const listResources = async ({ email }) => {
    const resources = await rbacModel.find({ email })
    return resources
}

const addRoleBinding = async ({ email, resourceId, actions }) => {
    const resource = await rbacModel.create({ email, resourceId, actions })
    return resource
}

const canI = async ({ email, resourceId, action }) => {
    const resource = await rbacModel.findOne({ email, resourceId, action })
    return resource != null
}

const deletResource = async ({ id }) => {
    const resource = await rbacModel.findOne({ _id: id })
    if (!resource) {
        throw new Error('you can not perform this action')
    }

    const item = await rbacModel.deleteOne({ _id: resource._id })
    return item
}

export const rbacDomain = {
    listResources,
    addRoleBinding,
    canI,
    deletResource
}