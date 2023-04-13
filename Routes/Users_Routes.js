import express from 'express';
import { createUser, deleteUser, getUsers, getUser,updateUser,getUserbyName, login } from '../Controllers/Users_Controllers.js';
import auth from '../midlleware/auth.js';
import isAdminOrSuperAdmin from '../midlleware/Authentication.js';

const router = express.Router();
router.get('/search', getUserbyName);

router.post('/login', login);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/register', createUser);

router.delete('/:id', auth, isAdminOrSuperAdmin, deleteUser);
router.patch('/:id', auth, updateUser);

export default router;
