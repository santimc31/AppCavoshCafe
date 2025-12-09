import { service } from "../services/auth.services.js";

const sendVerificationCode = async (req, res) => {
    const response = await service.sendVerificationCode(req,res);
    const success = response ? 200 : 500;
    const data = success == 200 ? response : null
    const message = success == 200 ? "Codigo generado correctamente" : "Codigo no generado por usuario no encontrado"
    res.send( { success, data, message } )
}

const validateCode = async (req, res) => {
    const response = await service.validateCode(req,res);
    const success = response ? 200 : 500;
    const data = success == 200 ? response : null
    const message = success == 200 ? "Codigo validado correctamente" : "El codigo no es correcto"
    res.send( { success, data, message } )
}

const cambiarContrasena = async (req, res) => {
    const response = await service.cambiarContrasena(req,res);
    const success = response ? 200 : 500;
    const data = success == 200 ? response : null
    const message = success == 200 ? "Contraseña cambiada exitosamente" : "Error al cambiar contraseña o correo no valido"
    res.send( { success, data, message } )
}

export const controller = {
    sendVerificationCode,
    validateCode,
    cambiarContrasena,
}