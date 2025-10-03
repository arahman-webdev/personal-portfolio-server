import express from "express"
import { blogControlelr } from "./blog.controller"
import { checkAuth, Role } from "../../middleware/checkAuth"



const router = express.Router()


router.post('/',checkAuth(Role.ADMIN), blogControlelr.createPost)


export const blogRouter = router