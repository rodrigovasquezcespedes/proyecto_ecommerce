import express from 'express'
import controller from '../controllers/cartController.js'

const router = express.Router()

router.get('/carts', controller.getAllCartsHandler)
router.get('/carts/:id', controller.getCartByIdHandler)
router.post('/carts', controller.createCartHandler)
router.put('/carts/:id', controller.updateCartHandler)
router.delete('/carts/:id', controller.deleteCartHandler)

export default router
