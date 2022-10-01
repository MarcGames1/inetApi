import express from 'express';

const router = express.Router();
import { uploadPostImage } from '../middleweare/fileUpload';
import {
  create,
  postById,
  update,
  remove,
  list,
  read,
} from '../controllers/posts';
const { userById } = require('../controllers/user');
import { requireSignin, isAuth, isAdmin } from '../controllers/auth';

router.get('/post/:postId', postById, read);

router.post(
  '/post/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  uploadPostImage,
  create
);
router.put('/post/:postId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/post/:postId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list);

router.post('/post/create/upload', uploadPostImage);

router.param('postId', postById);
router.param('userId', userById);

export default router;
