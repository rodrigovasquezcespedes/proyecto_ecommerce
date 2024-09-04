// src/routes/productRoutes.js
import express from 'express'
import controller from '../controllers/productController.js'

const router = express.Router()

router.get('/products', controller.getProducts) // Obtener todos los productos
router.get('/products/:id', controller.getProduct) // Obtener un producto por ID
router.post('/products', controller.addProduct) // Crear un nuevo producto
router.put('/products/:id', controller.updateProductDetails) // Actualizar un producto existente
router.delete('/products/:id', controller.removeProduct) // Eliminar un producto

export default router
