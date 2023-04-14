"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuarioById = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        msg: 'getUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarios = yield usuario_1.default.findByPk(id);
    if (usuarios) {
        res.json(usuarios);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    /*res.json({
        msg: 'getUsuarioById',
        usuarios
    })*/
});
exports.getUsuarioById = getUsuarioById;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
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
        const usuarios = new usuario_1.default(body);
        yield usuarios.save();
        res.json(usuarios);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Comuníquese con el administrador'
        });
    }
    /*res.json({
        msg: 'postUsuario',
        body
    })*/
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuarios = yield usuario_1.default.findByPk(id);
        if (!usuarios) {
            return res.status(400).json({
                msg: 'No existe un usuarioPage con el id' + id
            });
        }
        yield usuarios.update(body);
        res.json(usuarios);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'No se pudo actualizar comuniquese con el administrador'
        });
    }
    /* res.json({
         msg: 'putUsuario',
         body,
         id
     })*/
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarios = yield usuario_1.default.findByPk(id);
    if (!usuarios) {
        return res.status(404).json({
            msg: `No existe un usuario con el id: ${id}`
        });
    }
    yield usuarios.update({ estado: false });
    res.json(usuarios);
    /*res.json({
        msg: 'deleteUsuario',
        id
    })*/
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map