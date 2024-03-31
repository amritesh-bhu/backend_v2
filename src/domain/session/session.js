import { createClient } from 'redis'
import { nanoid } from 'nanoid'

// export const session = async () => {
const client = createClient()
client.on('error', err => console.log('Redis Client error ', err))
await client.connect()
console.log('redis connected')
// }

const createSession = async (userId,email) => {
    const sessionId = nanoid(10)
    await client.set(sessionId, JSON.stringify({'userId':userId,'email':email}))
    return sessionId
}

const getSession = async ({ sessionId }) => {
    const session = await client.get(sessionId)
    return session
}

const deleteSession = async ( sessionId ) => {
    const session = await client.del(sessionId)
    return session
}

export const userSession = {
    createSession,
    getSession,
    deleteSession
}