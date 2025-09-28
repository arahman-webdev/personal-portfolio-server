import express, { Request, Response } from "express"
import cors from "cors"
import compression from "compression"
import { blogRouter } from "./modules/blog/blog.router"


export const app = express()

// Middleware------------------
app.use(cors())
app.use(compression())
app.use(express.json())


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))



// router 

app.use('/api/v1/post', blogRouter)

// Default route testing

app.get('/',(req:Request, res:Response)=>{
    res.send("Server is running")
})