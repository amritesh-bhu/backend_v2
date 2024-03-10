import express from 'express';
import cookieParser from 'cookie-parser';

import { mdbcon } from './lib/databaseConnection/mdbcon.js';
import { HTTP_PORT, MONGO_URI } from './lib/env/env.js';
import { authRoutes } from './routes/auth.js';
import { sessionCheck } from './lib/sessionCheck/sessionCheck.js';
import { handleRoute } from './lib/handleRoutes/handleRoute.js';
import { taskRouter } from './routes/task.js';

const app = express();

mdbcon(MONGO_URI)

app.use(express.json())
app.use(cookieParser())


authRoutes('/auth', app)

app.use(handleRoute(sessionCheck))

taskRouter('/task',app)

app.use((err,req,res,next) => {
    res.status(500).json({'error': err.message})
    next()
  }
)


app.listen(HTTP_PORT, () => {
    console.log(`server is listening on port no ${HTTP_PORT}`)
})