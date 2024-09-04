import express from 'express'
import controller from '../controllers/addressController.js'

const router = express.Router()

router.get('/users/:usuarioId/addresses', controller.getUserAddresses)
router.post('/addresses', controller.createNewAddress)
router.put('/addresses/:idDireccion', controller.updateExistingAddress)
router.delete('/addresses/:idDireccion', controller.deleteAddressById)

export default router
