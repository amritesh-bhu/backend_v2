import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { mdbcon } from './lib/databaseConnection/mdbcon.js';
import { HTTP_PORT, MONGO_URI } from './lib/env/env.js';
import { authRoutes } from './routes/auth.js';
import { handleRoute } from './lib/handleRoutes/handleRoute.js';
import { taskRouter } from './routes/task.js';
import { rbacRouter } from './routes/rbac.js';
import { requestRouter } from './routes/reqst.js';
import { sessionCheck } from './middlewares/sessionCheck.js';
import { WebSocketServer } from 'ws';

import { userSession } from './domain/session/session.js';
import { mailSender } from './lib/sendEmail/email-sender.js';
import Cookies from 'cookies';

const app = express();

mdbcon(MONGO_URI)

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: /http:\/\/(localhost|127.0.0.1):*/,
    credentials: true
  })
)

authRoutes('/auth/user', app)

app.use(handleRoute(sessionCheck))

const wsConn = {}

taskRouter('/user/task', app)
rbacRouter('/rbac/tasks', app)
requestRouter('/action/requests', app)

app.use((err, req, res, next) => {
  res.status(500).json({ 'error': err.message })
  next()
})

const server = app.listen(HTTP_PORT, () => {
  console.log(`server is listening on port no ${HTTP_PORT}`)
})

//configuring websocket
const wss = new WebSocketServer({ server })


wss.on('connection', async (ws, req) => {
  // ws.send("connected with backend")

  const k = new Cookies(req)
  const sessionId = k.get("session")
  const userInfo = await userSession.getSession({ sessionId })
  const userId = JSON.parse(userInfo).userId
  if (!userId in wsConn) {
    wsConn[userId] = { [sessionId]: ws }
  } else {
    wsConn[userId] = { ...wsConn[userId], [sessionId]: ws }
  }

  // console.log(Object.keys(wsCon[userId]))
  // mailSender('sample@gmail.com') // written for testing purpose 
  ws.on('message', (data) => {
    ws.send(' Regitered to server')
    // ws.send(data)
  })

  ws.send('connected to server')
  ws.on('close', () => {
    delete wsConn[userId][sessionId]
    // console.log('disconnect',Object.keys(wsCon[userId]))
    // console.log('client has disconnected')
  })
})
