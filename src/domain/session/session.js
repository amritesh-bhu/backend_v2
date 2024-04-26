import { createClient } from 'redis'
import { nanoid } from 'nanoid'

// export const session = async () => {
const redisClient = createClient()
redisClient.on('error', err => console.log('Redis Client error ', err))
await redisClient.connect()
console.log('redis connected')
// }

const createSession = async (userId, email) => {
    const sessionId = nanoid(10)
    await redisClient.set(sessionId, JSON.stringify({ 'userId': userId, 'email': email }))
    return sessionId
}

const getSession = async ({ sessionId }) => {
    const session = await redisClient.get(sessionId)
    return session
}

const deleteSession = async (sessionId) => {
    const session = await redisClient.del(sessionId)
    return session
}

const logoutFromAllDevices = async (userId) =>{
    const sessions = await redisClient.get(userId.toString())
    JSON.parse(sessions).forEach(element => {
        deleteSession(element)
    });
    return await redisClient.del(userId)
}

const manageSession = async (userId, sessionId) => {
    const user = await redisClient.get(userId.toString())
    if (!user) {
        const redisValue = JSON.stringify([sessionId])
        const status = await redisClient.set(userId.toString(), redisValue)
        return status
    }
    const redisValue = JSON.parse(user)
    const status = await redisClient.set(userId.toString(),JSON.stringify([...redisValue,sessionId]))
    return status     
}

const getUserSessions = async (userId) =>{
    const sessions = await redisClient.get(userId.toString())
    return sessions
}

const deleteUserSession = async (userId,sessionId) =>{
    const sessions = await redisClient.get(userId.toString())
    if (JSON.parse(sessions).length == 1){
        return await redisClient.del(userId.toString())
    }
    const session = JSON.parse(sessions).filter((item) => item != sessionId)
    const status = await redisClient.set(userId.toString(),JSON.stringify(session))
    const items = await redisClient.get(userId.toString())
    console.log('remaining sessions',session)
    return status
}

export const userSession = {
    createSession,
    getSession,
    deleteSession,
    manageSession,
    deleteUserSession,
    logoutFromAllDevices,
    getUserSessions
}