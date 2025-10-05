import express from "express"

import { checkAuth, Role } from "../../middleware/checkAuth"
import { upload } from "../../config/multer.config"
import { blogController } from "./blog.controller"



const router = express.Router()


router.post('/', upload.single("thumbnail"), blogController.createPost)
router.get('/', blogController.getAllPosts)
router.delete('/:id', blogController.deletePost)
router.put('/:id',upload.single("thumbnail"), blogController.updatePost)


export const blogRouter = router