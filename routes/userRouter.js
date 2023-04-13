import express from 'express';
import { createUser, deleteUser, getUsers, getUser,updateUser,getUserbyName, login } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import isAdminOrSuperAdmin from '../middleware/Authentication.js';

const router = express.Router();
router.get('/search', getUserbyName);

router.post('/login', login);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

router.delete('/:id', auth, isAdminOrSuperAdmin, deleteUser);
router.patch('/:id', auth, updateUser);

export default router;   







