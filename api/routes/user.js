import Express from 'express';
const router = Express.Router();
import { delete_user, login_user, register_user } from '../controllers/user.js';
import { checkAdmin, verifyToken } from '../middlewares/auth.js';

router.post('/register', register_user);

router.post('/login', login_user);

router.delete('/:userID', verifyToken, checkAdmin, delete_user);

export default router;