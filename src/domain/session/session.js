import { createClient } from 'redis'
import { nanoid } from 'nanoid'
import { json } from 'express'

// export const session = async () => {
const client = createClient()
client.on('error', err => console.log('Redis Client error ', err))
await client.connect()
console.log('redis connected')
// }

const createSession = async (userId, email) => {
    const sessionId = nanoid(10)
    await client.set(sessionId, JSON.stringify({ 'userId': userId, 'email': email }))
    return sessionId
}

const getSession = async ({ sessionId }) => {
    const session = await client.get(sessionId)
    return session
}

const deleteSession = async (sessionId) => {
    const session = await client.del(sessionId)
    return session
}

const manageSession = async (userId, sessionId) => {
    const user = await client.get(userId.toString())
    if (!user) {
        const redisValue = JSON.stringify([sessionId])
        const status = await client.set(userId.toString(), redisValue)
        return status
    }
    const redisValue = JSON.parse(user)
    const status = await client.set(userId.toString(),JSON.stringify([...redisValue,sessionId]))
    return status     
}

const getUserSessions = async (userId) =>{
    const sessions = await client.get(userId.toString())
    return sessions
}

const deleteUserSession = async (userId,sessionId) =>{
    const sessions = await client.get(userId.toString())
    if (JSON.parse(sessions).length == 1){
        return await client.del(userId.toString())
    }
    const session = JSON.parse(sessions).filter((item) => item != sessionId)
    const status = await client.set(userId.toString(),JSON.stringify(session))
    const items = await client.get(userId.toString())
    console.log('remaining sessions',session)
    return status
}

export const userSession = {
    createSession,
    getSession,
    deleteSession,
    manageSession,
    deleteUserSession
}