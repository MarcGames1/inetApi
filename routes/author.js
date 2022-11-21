const express = require('express')

const router = express.Router()

const {create, authorById, authorBySlug, read, update, remove, list} = require ('../controllers/author')

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {
  uploadProfilePic,
} = require('../middleweare/fileUpload');
// routes
router.get('/author/:authorId', authorById, read);
router.get('/authors', list);
router.get('/:authorSlug', authorBySlug, read);
router.post('/author/create/:userId',requireSignin, isAuth, isAdmin, uploadProfilePic, create); // requireSignin, isAuth, isAdmin,
router.put('/author/:authorId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('author/:authorId/:userId', requireSignin, isAuth, isAdmin, remove)

//params

router.param('authorId', authorById);
router.param('authorSlug', authorBySlug);
router.param('userId', userById);


//export 
module.exports = router;