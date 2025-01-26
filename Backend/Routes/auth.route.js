import express from 'express';
import { signUp, checkUser, login } from '../Controller/auth.controller.js';
import { ProtectedUser } from '../Middleware/ProtectedUser.auth.js';

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/checkUser', ProtectedUser, checkUser)

export default router;