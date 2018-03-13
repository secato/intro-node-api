const router = require('express').Router()
const checkAuth = require('../middlware/check-auth')
const OrderController = require('../controllers/order')

// GET
router.get('/', checkAuth, OrderController.get_all)
router.get('/:orderId', checkAuth, OrderController.get_by_id)

// POST
router.post('/', checkAuth, OrderController.create_order)

// DELETE
router.delete('/:orderId', checkAuth, OrderController.delete_order)

module.exports = router