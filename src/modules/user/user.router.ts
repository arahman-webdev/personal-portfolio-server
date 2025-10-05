
import express from "express"


import { checkAuth, Role } from "../../middleware/checkAuth"

import { UserController } from "./user.controller"

const router = express.Router()

router.get('/me', checkAuth(...Object.values(Role)),UserController.getMe)

export const userRoutes = router
