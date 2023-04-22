import express from 'express';
import { createUser, deleteUser, getUsers, updateUserPrev,updatePassword,getUser,updateUser,getUserbyName, login } from '../controllers/userController.js';
import auth from '../middleware/jwtAuthenticationMiddleware.js';
import isAdminOrSuperAdmin from '../middleware/adminAuthenticaitonMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/',  getUsers);
router.get('/user', auth, getUser);
router.post('/', auth, isAdminOrSuperAdmin,createUser);

router.delete('/:id', auth, isAdminOrSuperAdmin, deleteUser);

router.patch('/profile', auth, updatePassword);
router.patch('/', auth,  updateUser);
router.patch('/conf/:id',auth,isAdminOrSuperAdmin,  updateUserPrev);

export default router;   







