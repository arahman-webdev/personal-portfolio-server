import express from "express"
import { projectController } from "./project.controller"
import { upload } from "../../config/multer.config"



const router = express.Router()


router.post('/',upload.single("thumbnail"), projectController.createProject)


export const projectRouter = router