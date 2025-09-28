import express from "express"
import { authControlelr } from "./auth.controller"


const router = express.Router()


router.post('/login', authControlelr.loginUser)



export const authRouter = router