import express from "express"

import { checkAuth, Role } from "../../middleware/checkAuth"
import { upload } from "../../config/multer.config"
import { blogController } from "./blog.controller"



const router = express.Router()


router.post('/',checkAuth(Role.ADMIN), upload.single("thumbnail"), blogController.createPost)


export const blogRouter = router