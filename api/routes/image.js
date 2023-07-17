import Express from 'express';
const router = Express.Router();
import { 
    get_all_images, 
    add_image, 
    get_by_tags, 
    get_by_single_tag, 
    get_by_id 
} from '../controllers/image.js';

router.get('/all', get_all_images);

router.get('/:imageID', get_by_id);

router.get('/:tag1&:tag2', get_by_tags);

router.get('/:tag', get_by_single_tag);

router.post('/', add_image);

export default router;