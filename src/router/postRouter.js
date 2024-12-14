//CONTROLLER
import * as Controller from '../Controller/postController.js';

import express from 'express';
const router = express.Router();

router.get('/',Controller.GetMyPost);
router.post('/',Controller.AgregarPost);
router.put('/',Controller.ActualizarPost);
router.delete('/',Controller.EliminarPost);

export default router;