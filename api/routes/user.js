import Express from 'express';
import {
    change_password,
    delete_user,
    get_all_users,
    get_jwt_user,
    get_user,
    login_user,
    register_user
} from '../controllers/user.js';
import { checkAdmin, verifyToken } from '../middlewares/auth.js';
const router = Express.Router();

router.get('/', verifyToken, checkAdmin, get_all_users);

router.get('/jwtinfo', verifyToken, get_jwt_user);

router.get('/:userID', verifyToken, get_user);

router.post('/register', register_user);

router.post('/login', login_user);

router.post('/change-password', change_password);

router.delete('/:userID', verifyToken, checkAdmin, delete_user);

export default router;