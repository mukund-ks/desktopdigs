import Express from 'express';
import {
    add_image,
    get_all_images,
    get_all_tags,
    get_by_id,
    get_by_single_tag,
    get_by_tags
} from '../controllers/image.js';
const router = Express.Router();

router.get('/all', get_all_images);

router.get('/all-tags', get_all_tags);

router.get('/id/:imageID', get_by_id);

router.get('/:tag1&:tag2', get_by_tags);

router.get('/:tag', get_by_single_tag);

router.post('/', add_image);

export default router;