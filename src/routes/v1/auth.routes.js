import { Router } from "express"
import { controller } from "../../controllers/auth.controller.js"

const router = Router()

router
    .post("/sendCode", controller.sendVerificationCode)
    .post("/validateCode", controller.validateCode)
    .post("/cambiarContrasena", controller.cambiarContrasena)
export default router