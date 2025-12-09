import { service } from "../services/cliente.services.js";

const getCliente = async (req, res) => {
    const rows = await service.getCliente(req, res)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Cliente registrado" : "Cliente no registrado"
    res.send( { success, data, message } )
}

const setCliente = async (req, res) => {
    const rows = await service.setCliente(req, res)
    const success = rows.id || rows.update ? true : false
    const data = rows.id ? rows : null
    const message =  rows.id ? "Cliente registrado" : rows.update ? "Cliente actualizado" : rows.error ? rows.error : "No se pudo registrar el cliente"
    res.send( { success, data, message } )
}

const getClienteCodigo = async (req, res) => {
    const rows = await service.getClienteCodigo(req, res)
    console.log(rows)
    const success = rows[0].length > 0
    const data = success ? rows[0][0] : null
    const message = success ? "Cliente generado" : rows.error ? rows.error : "No se pudo generar el código"
    res.send( { success, data, message } )
}


export const controller = {
    getCliente, setCliente, getClienteCodigo
}