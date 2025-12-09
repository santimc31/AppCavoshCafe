import { pool } from '../db/db.js'
import { Random } from "random-js"      
const sendVerificationCode = async (req, res) => {
    //Verificar usuario disponible
    console.log(req.body.correo);
    const rows = await pool.query('call sp_getClienteCorreo(?)', req.body.correo);

    if (rows == null || undefined) {
        return false
    }

    //Obtener codigo de verificacion anterior si existe y eliminarlo si es asi
    const codigo_antes = await pool.query('call sp_getCodigoVerificacion(?)', req.body.correo)

    if (codigo_antes[0]) {
        const codestatus = await pool.query('call sp_dltCodigoVerificacion(?)', req.body.correo);
        console.log(codestatus);
    }

    // Generar codigo nuevo
    const random = new Random(); //  utiliza el motor nativeMath     
    const NewCode = random.integer(1000, 9000);
    console.log(NewCode);

    // Fecha de hoy
    const hoy = new Date();

    // Setear codigo en la base de datos
    const response = await pool.query('call sp_setCodigoVerificacion(?,?,?)', [req.body.correo, NewCode, hoy])

    console.log(response);

    return NewCode
}

const validateCode = async (req, res) => {
    console.log(req.body.correo);
    //Verificar codigo de usuario en la db
    const rows = await pool.query("call sp_getCodigoVerificacion(?)", req.body.correo);
    // console.log( rows[0][0][0].Codigo);
    // console.log(req.body.code);

    //validar codigo de verificacion enviado con el verdadero de la db
    if (req.body.code == rows[0][0][0].Codigo) {
        return true
    }

    return false
}


const cambiarContrasena = async (req, res) => {
    //Verificar codigo de usuario en la db
    // console.log(req);

    const rows = await pool.query("call sp_getClienteCorreo (?) ", req.body.correo);

    if (rows == null || undefined) {
        return false
    }

    // console.log(req.body.correo, req.body.NewPasswordd);

    const cambiarContrasena = await pool.query('call sp_cambiarContrasena (?,?) ', [ ...Object.values( req.body ) ]);
    console.log(cambiarContrasena);
    return true
}

export const service = {
    sendVerificationCode,
    validateCode,
    cambiarContrasena,
}
