//Controller
import * as Controller from '../Controller/userController.js';

import express from 'express';

const router = express.Router();

router.get('/',Controller.GetUsers);
router.get('/:id',Controller.GetIdUsers);
router.post('/',Controller.AgregarUsers);
router.put('/:id',Controller.UpdateUser);
router.delete('/:id',Controller.DeleteUser);

export default router;