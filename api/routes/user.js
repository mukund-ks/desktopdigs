import Express from 'express';
const router = Express.Router();
import { delete_user, get_all_users, get_user, login_user, register_user } from '../controllers/user.js';
import { checkAdmin, verifyToken } from '../middlewares/auth.js';

router.get('/', verifyToken, checkAdmin, get_all_users);

router.get('/:userID', verifyToken, get_user);

router.post('/register', register_user);

router.post('/login', login_user);

router.delete('/:userID', verifyToken, checkAdmin, delete_user);

export default router;