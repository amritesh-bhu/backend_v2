import express from 'express';
import cookieParser from 'cookie-parser';

import { dbcon } from './databaseConnection/mdbcon.js';
import { HTTP_PORT, MONGO_URI } from './lib/env/env.js';
import { authRoutes } from './routes/auth.js';

const app = express();

dbcon(MONGO_URI)

app.use(express.json())
app.use(cookieParser())


authRoutes('/auth', app)


app.listen(HTTP_PORT, () => {
    console.log(`server is listening on port no ${HTTP_PORT}`)
})