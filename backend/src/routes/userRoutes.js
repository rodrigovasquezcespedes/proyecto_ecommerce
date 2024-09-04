// src/routes/userRoutes.js
import express from 'express'
import controller from '../controllers/userController.js'

const router = express.Router()

router.get('/users', controller.getUsers)
router.get('/users/:id', controller.getUser)
router.post('/users', controller.createNewUser)
router.put('/users/:id', controller.updateUserDetails)
router.delete('/users/:id', controller.deleteUserAccount)

export default router
