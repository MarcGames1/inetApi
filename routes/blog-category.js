const express = require('express');

const router = express.Router();
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require('../controllers/blog-category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
// const { rawListeners } = require('../models/category');

router.get('/blog-category/:categoryId', categoryById, read);
router.post('/blog-category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put(
  '/blog-category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/blog-category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/blog-categories', list);
router.get('/blog-category/:categoryId', categoryById, read);
router.post('/blog-category/create/:userId',
 requireSignin,
  isAuth,
   isAdmin,
    create);
router.put(
  '/blog-category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/blog-category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);



router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
