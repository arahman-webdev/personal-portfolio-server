import express from "express"
import { blogControlelr } from "./blog.controller"


const router = express.Router()


router.post('/', blogControlelr.createPost)


export const blogRouter = router