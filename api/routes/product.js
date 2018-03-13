const router = require('express').Router()
const checkAuth = require('../middlware/check-auth')
const ProductController = require('../controllers/product')

//region multer (upload) middleware config
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // acceppt a file
        cb(null, true)
    } else {
        // reject a file
        cb(new Error('File not jpeg or png'), false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 2 megabytes
    },
    fileFilter: fileFilter

})
//endregion

// GET
router.get('/', ProductController.get_all)
router.get('/:productId', ProductController.get_by_id)

// POST
router.post('/', checkAuth, upload.single('productImage'), ProductController.create_product)

// PATCH
router.patch('/:productId', checkAuth, ProductController.update_product)

// DELETE
router.delete('/:productId', checkAuth, ProductController.delete_product)

module.exports = router