import {Router} from 'express';
import {deleteUsuario, getUsuarioById, getUsuarios, postUsuario, putUsuario,} from "../controllers/usuarios";

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);


export default router;