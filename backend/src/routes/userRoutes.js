import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.put('/:idUser', authMiddleware, userController.updateUser)
router.delete('/:idUser', authMiddleware, userController.deleteUser)

export default router
