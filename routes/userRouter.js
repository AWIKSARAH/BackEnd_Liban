import express from 'express';
import { createUser, deleteUser, getUsers, updatePassword,getUser,updateUser,getUserbyName, login } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import isAdminOrSuperAdmin from '../middleware/Authentication.js';

const router = express.Router();
router.get('/search',  auth,isAdminOrSuperAdmin,getUserbyName);

router.post('/login', login);
router.patch('/profile', auth, updatePassword);
router.get('/', auth,isAdminOrSuperAdmin, getUsers);
router.get('/:id', auth, getUser);
router.post('/', auth, isAdminOrSuperAdmin,createUser);

router.delete('/:id', auth, isAdminOrSuperAdmin, deleteUser);
router.patch('/:id',   updateUser);

export default router;   







