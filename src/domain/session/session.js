import { createClient } from 'redis'
import { nanoid } from 'nanoid'

export const session = async () => {
    const client = createClient()
    client.on(error, err => console.log('Redis Client error ', err))
    await client.connect()
}

const createSession = async ({ userId }) => {
    const userSession = nanoid()
    await client.set(userSession, userId)
    return userSession
}

const getSession = async ({ userSession }) => {
    const session = await client.get(userSession)
    return session
}

const deleteSession = async ({ sessionId }) => {
    const session = await client.del(sessionId)
    return session
}

export const userSession = {
    createSession,
    getSession,
    deleteSession
}