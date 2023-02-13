import { Router } from 'express';
import {
  getController,
  postController,
  patchController,
  deleteController,
} from '../controllers/constroller';

const router = Router();

router.get('/', getController);
router.post('/', postController);
router.patch('/:id', patchController);
router.delete('/:id', deleteController);

export default router;
