import mongoose from 'mongoose'

const rbacSchema = mongoose.Schema({
    ownerEmail : {type :String, required:true},
    userEmail: { type: String, required: true },
    resourceId: { type: String, required: true },
    actions: { type: Array }
})

const rbacModel = mongoose.model('sharedTasks', rbacSchema)

const listResources = async ({ ownerEmail }) => {
    const resources = await rbacModel.find({ ownerEmail })
    return resources
}

const addRoleBinding = async ({ownerEmail, userEmail, resourceId, actions }) => {
    console.log( ownerEmail, userEmail, resourceId, actions )
    const resource = await rbacModel.create({ ownerEmail,userEmail, resourceId, actions })
    return resource
}

const canI = async ({ ownerEmail, resourceId, actions }) => {
    const resource = await rbacModel.findOne({ userEmail:ownerEmail, resourceId, actions })
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

const updateAction = async ({email,resourceId,actions}) =>{
    
    const resource = await rbacModel.findOne({userEmail:email,resourceId})
    if(!resource){
        throw new Error('resource not available')
    }
    // const action = [...resource.action,action]
    const rsrc = await rbacModel.updateOne({_id: resource._id},{$push : {actions : actions}})
    return rsrc
}

export const rbacDomain = {
    listResources,
    addRoleBinding,
    canI,
    deletResource,
    updateAction
}