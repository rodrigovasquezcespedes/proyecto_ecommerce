import express from 'express'
import controller from '../controllers/paymentController.js'

const router = express.Router()

router.get('/payments', controller.getPayments)
router.get('/payments/:id', controller.getPayment)
router.post('/payments', controller.createNewPayment)
router.put('/payments/:id', controller.updateExistingPayment)
router.delete('/payments/:id', controller.deletePaymentRecord)

export default router
