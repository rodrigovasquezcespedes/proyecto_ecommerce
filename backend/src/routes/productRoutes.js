import express from 'express'
import productController from '../controllers/productController.js'

const router = express.Router()

router.post('/', productController.createNewProduct)
router.get('/', productController.getProducts)
router.get('/:productId', productController.getProduct)
router.put('/:productId', productController.updateProduct)
router.delete('/:productId', productController.deleteProduct)

export default router
