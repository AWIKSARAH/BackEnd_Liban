import express from 'express';
import {get,create} from '../controllers/contactInfoController.js';
import auth from '../middleware/auth.js';
import isAdminOrSuperAdmin from '../middleware/Authentication.js';
import uploadImage from '../middleware/HandlingImage.js'
import test from '../middleware/testerFunction.js'
const router = express.Router();

router.get('/',get);
router.post('/',test, uploadImage('contact'),create);

export default router;   