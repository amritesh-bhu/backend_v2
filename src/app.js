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

taskRouter('/user/task', app)
rbacRouter('/rbac/tasks', app)
requestRouter('/action/requests', app)

app.use((err, req, res, next) => {
  res.status(500).json({ 'error': err.message })
  next()
}
)


app.listen(HTTP_PORT, () => {
  console.log(`server is listening on port no ${HTTP_PORT}`)
})