import Express from "express";
import { static_req } from "../controllers/static.js";
const router = Express.Router();

router.get('/', static_req);

export default router;