const router = require('express').Router()
    
//#region GET
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    })
})
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders',
        orderId: req.params.orderId
    })
})
//#endregion
//#region POST
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        order: order
    })
})
//#endregion

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE requests to /orders',
        orderId: req.params.orderId
    })
})

module.exports = router