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
// import { mailSender } from './lib/sendEmail/email-sender.js';
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
const wsConnEmail = {}

taskRouter('/user/task', app, wsConn, wsConnEmail)
rbacRouter('/rbac/tasks', app, wsConn, wsConnEmail)
requestRouter('/action/requests', app, wsConn)

app.use((err, req, res, next) => {
  res.status(500).json({ 'error': err.message })
  next()
})

const server = app.listen(HTTP_PORT, () => {
  console.log(`server is listening on port no ${HTTP_PORT}`)
})

//configuring websocket
const wss = new WebSocketServer({ server })


wss.on('connection', async (ws, req, res) => {
  // ws.send("connected with backend")
  const k = new Cookies(req)
  const sessionId = k.get("session")
  if (!sessionId) {
    ws.on('close', () => {
      ws.send('Please login first')
    })
    return
  }

  const userInfo = await userSession.getSession({ sessionId })
  const userId = JSON.parse(userInfo).userId
  const email = JSON.parse(userInfo).email
  if (!userId in wsConn) {
    wsConn[userId] = { [sessionId]: ws }
    wsConnEmail[email] = { [sessionId]: ws }
  } else {
    wsConn[userId] = { ...wsConn[userId], [sessionId]: ws }
    wsConnEmail[email] = { ...wsConnEmail[email], [sessionId]: ws }
  }

  // console.log(Object.keys(wsConnEmail))

  // mailSender('sample@gmail.com') // written for testing purpose 
  ws.on('message', (data) => {
    ws.send(' Regitered to server')
  })

  ws.send('connected to server')
  ws.on('close', () => {
    delete wsConn[userId][sessionId]
  })
})
