import express from 'express';
import { createUser, deleteUser, getUsers, updatePassword,getUser,updateUser,getUserbyName, login } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import isAdminOrSuperAdmin from '../middleware/Authentication.js';

const router = express.Router();
router.get('/search', getUserbyName);

router.post('/login', login);
router.patch('/profile/:id', updatePassword);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

router.delete('/:id', auth, isAdminOrSuperAdmin, deleteUser);
router.patch('/:id', updateUser);

export default router;   







