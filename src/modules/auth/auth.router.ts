import express from "express"
import { authControlelr } from "./auth.controller"


const router = express.Router()


router.post('/login', authControlelr.loginUser)
router.post('/logout', authControlelr.logoutUser)



export const authRouter = router