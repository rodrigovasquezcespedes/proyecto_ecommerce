import express from 'express'
import categoryController from '../controllers/categoryController.js'

const router = express.Router()

router.get('/categories', categoryController.fetchCategories)
router.get('/categories/:id', categoryController.fetchCategoryById)
router.post('/categories', categoryController.createNewCategory)
router.put('/categories/:id', categoryController.modifyCategory)
router.delete('/categories/:id', categoryController.removeCategory)

export default router
