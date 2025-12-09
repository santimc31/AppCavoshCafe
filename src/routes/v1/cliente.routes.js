import { Router } from "express"
import { controller } from "../../controllers/cliente.controller.js"

const router = Router()

router
    .post("/login", controller.getCliente )
    .post("/registrar", controller.setCliente )
    .post("/codigo", controller.getClienteCodigo )
export default router

