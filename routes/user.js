const express = require('express');
const User = require('../models/user')
const router = express.Router()

const { userById, update, read } = require('../controllers/user')

const { requireSignin, isAuth, isAdmin} = require('../controllers/auth')




router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)

router.param('userId', userById)



module.exports = router