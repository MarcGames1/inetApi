const express = require('express')

const router = express.Router()

const {create, authorById, read, update, remove, list} = require ('../controllers/author')

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {
  uploadAuthorPic,
  addFieldstobody,
} = require('../middleweare/fileUpload');
// routes
router.get('/author/:authorId', authorById, read);
router.get('/authors', list);
router.post('/author/create/:userId', uploadAuthorPic); // requireSignin, isAuth, isAdmin,
router.put('/author/:authorId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('author/:authorId/:userId', requireSignin, isAuth, isAdmin, remove)

//params

router.param('authorId', authorById);
router.param('userId', userById);


//export 
module.exports = router;