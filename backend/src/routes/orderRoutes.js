import express from 'express'
import controller from '../controllers/orderController.js'

const router = express.Router()

router.get('/orders', controller.getAllOrders) // Obtener todos los pedidos
router.get('/orders/:id', controller.getOrder) // Obtener un pedido por ID
router.post('/orders', controller.createNewOrder) // Crear un nuevo pedido
router.put('/orders/:id', controller.updateExistingOrder) // Actualizar un pedido existente
router.delete('/orders/:id', controller.deleteOrderById) // Eliminar un pedido por ID

export default router
