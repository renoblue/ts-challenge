import {Request, Response} from 'express'
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        msg: 'getUsuarios',
        usuarios
    })
}


export const getUsuarioById = async (req: Request, res: Response) => {

    const {id} = req.params;
    const usuarios = await Usuario.findByPk(id);

    if (usuarios) {
        res.json(usuarios);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

    /*res.json({
        msg: 'getUsuarioById',
        usuarios
    })*/
}

export const postUsuario = async (req: Request, res: Response) => {

    const {body} = req;


    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe con un usuarioPage con el email: ' + body.email
            });
        }

        // @ts-ignore
        const usuarios = new Usuario(body);
        await usuarios.save();

        res.json(usuarios);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        })
    }
    /*res.json({
        msg: 'postUsuario',
        body
    })*/
}


export const putUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;
    const {body} = req;

    try {
        const usuarios = await Usuario.findByPk(id);

        if (!usuarios) {
            return res.status(400).json({
                msg: 'No existe un usuarioPage con el id' + id
            });
        }

        await usuarios.update(body);
        res.json(usuarios);

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'No se pudo actualizar comuniquese con el administrador'
        })
    }

    /* res.json({
         msg: 'putUsuario',
         body,
         id
     })*/
}


export const deleteUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;

    const usuarios = await Usuario.findByPk(id);

    if (!usuarios) {
        return res.status(404).json({
            msg: `No existe un usuario con el id: ${id}`
        })
    }

    await usuarios.update({estado: false});

    res.json(usuarios);

    /*res.json({
        msg: 'deleteUsuario',
        id
    })*/
}




