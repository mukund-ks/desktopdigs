import Express from 'express';
const router = Express.Router();
import { get_all_images, add_image, get_by_tags, get_by_single_tag } from '../controllers/image.js';

router.get('/all', get_all_images);

router.get('/:tag1&:tag2', get_by_tags);

router.get('/:tag', get_by_single_tag);

router.post('/', add_image);

export default router;