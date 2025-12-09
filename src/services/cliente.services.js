import { pool } from '../db/db.js'

const getCliente = async (req, res) => {
    const rows = await pool.query('call sp_getCliente(?,?)', [ ...Object.values( req.body ) ])
    return ( rows[0] )
}

const setCliente = async (req, res) => {
    const id = req.body.id
    const [ rows ] = await pool.query('call sp_setCliente(?,?,?,?)', [ ...Object.values( req.body ) ])

    if ( id == 0 && rows[0][0].insertID ) {
        req.body.id = rows[0][0].insertID
        return ( req.body )
    }

    if ( typeof rows[0] != 'undefined' ) return ( { "error" : rows[0][0].error } )
    return ( { "update" : true } )
}

const getClienteCodigo = async (req, res) => {

    let rows

    try {
        const [value] = await pool.query('call sp_getClienteCodigo(?,?)', [req.body.correo])
        rows = value
    } catch (error) {
        return ({"error" : "El servidor no esta disponible"} )
    }


    if (rows[0][0].codigo)
        return ({ "id": rows[0][0].id,"codigo" : rows[0][0].codigo})

    if (typeof rows[0] != 'undefined')
        return ({"error" : rows[0][0].error})
}

const getClienteCodigoValidar = async (req, res) => {
    const rows = await pool.query('call sp_getCliente(?,?)', [ ...Object.values( req.body ) ])
    return ( rows[0] )
}

export const service = {
    getCliente, setCliente,getClienteCodigo

}
