import express from 'express';
import  { createUser, deleteUser, getUsers, updateUser,login } from '../Controllers/Users_Controllers.js';
import auth from '../midlleware/auth.js'
const router = express.Router();

router.post('/login', login);
router.get('/', getUsers);

router.post('/register', auth,createUser);

router.delete('/:id',auth, deleteUser);
router.patch('/:id',auth, updateUser);
  
  export default router;