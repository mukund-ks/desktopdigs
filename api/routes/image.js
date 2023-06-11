import Express from "express";
const router = Express.Router();
import { get_all_images, add_image } from "../controllers/image.js";

router.get('/', get_all_images);

router.post('/', add_image);

export default router;