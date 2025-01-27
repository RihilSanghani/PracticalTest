import express from 'express';
import { getForm, getForms, saveForm, updateForm } from '../Controller/forms.controller.js';
import { ProtectedUser } from '../Middleware/ProtectedUser.auth.js';

const router = express();

router.post('/save', ProtectedUser, saveForm);
router.post('/list', ProtectedUser, getForms);
router.post('/:id', ProtectedUser, getForm);
router.patch('/update/:id', ProtectedUser, updateForm);

export default router;