import cookieParser from "cookie-parser";
import express from "express";
import { dbcon } from "./databaseConnection/mdbcon.js";
import { HTTP_PORT, MONGO_URI } from "./env/env.js";

const app = express();

dbcon(MONGO_URI)

app.use(express.json())
app.use(cookieParser())




app.listen(HTTP_PORT,()=>{
    console.log(`server is listening on port no ${HTTP_PORT}`)
})