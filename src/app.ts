import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import compression from "compression"
import { blogRouter } from "./modules/blog/blog.router"
import { authRouter } from "./modules/auth/auth.router"
import { projectRouter } from "./modules/project/project.router"
import { userRoutes } from "./modules/user/user.router";


export const app = express()

app.use(cors({
    origin: ['http://localhost:3000',"https://abdurrahmandev-phi.vercel.app"],
    credentials: true
}));
app.use(compression())
app.use(express.json())
app.use(cookieParser()); 





// router 

app.use('/api/v1/post', blogRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/project', projectRouter)

// Default route testing

app.get('/',(req:Request, res:Response)=>{
    res.send("Abdur Rahman Server is running")
})