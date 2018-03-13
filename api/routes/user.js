const router = require('express').Router()
const checkAuth = require('../middlware/check-auth')
const UserController = require('../controllers/user')

// SIGNUP
router.post('/signup', UserController.signup)

// LOGIN
router.post('/login', UserController.login)

// DELETE
router.delete('/:userId', checkAuth, UserController.delete_user)

module.exports = router