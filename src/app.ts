import express, { Request, Response } from "express"
import cors from "cors"
import compression from "compression"


export const app = express()

// Middleware------------------
app.use(cors())
app.use(compression())
app.use(express.json())


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


// Default route testing

app.get('/',(req:Request, res:Response)=>{
    res.send("Server is running")
})