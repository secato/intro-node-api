const router = require('express').Router()

//#region GET
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id

        })

    }
    else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})
//#endregion
//#region POST
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
})
//#endregion
//#region PATCH
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    })
})
//#endregion
//#region DELETE
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    })
})
//#endregion

module.exports = router