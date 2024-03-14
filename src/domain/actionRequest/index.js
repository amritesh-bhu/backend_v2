import mongoose from 'mongoose'

const reqSchema = mongoose.Schema({
    requesterEmail : {
        type: String,
        required : true
    },
    ownerEmail : {
        type : String,
        required : true
    },
    resourceId : {
        type :String,
        required : true
    },
    action : {
        type : String,
        required : true
    }
})

const reqModel = mongoose.model('reqActions',reqSchema)

const listRequests = async ({ownerEmail}) =>{
    const resources = await reqModel.find({ownerEmail})
    return resources
}

const addActionableRequest = async ({requesterEmail,ownerEmail,resourceId,action}) =>{
    const resource = await reqModel.create({requesterEmail,ownerEmail,resourceId,action})
    return resource
}

const deleteRequest = async ({id}) =>{
    const resource = await reqModel.findOne({_id:id})
    if(!resource){
        throw new Error('resource does not exist')
    }

    const item = await reqModel.deleteOne({_id:resource._id})
    return resource
}

export const requestDomain = {
    listRequests,
    addActionableRequest,
    deleteRequest
}