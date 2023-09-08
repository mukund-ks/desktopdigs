import Express from "express";
const router = Express.Router();
import { static_req } from "../controllers/static.js";

router.get('/', static_req);

export default router;