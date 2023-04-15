import { Router } from 'express';
import ProductController from '../app/controllers/productController';

const router = Router();

router.get('/getUrl', ProductController.getS3Url);
router.get('/', ProductController.listAll);
router.post('/', ProductController.addNew);
router.get('/:id', ProductController.getById);
router.delete('/:id', ProductController.deleteById);
router.put('/:id', ProductController.update);

export default router;
