//Controller
import * as Controller from '../Controller/loginController.js';

import express from 'express';

const router = express.Router();

router.get('/',Controller.Protected);
router.post('/',Controller.Login);
router.post('/cerrar',Controller.CerrarSesion);

export default router;