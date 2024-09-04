import model from '../models/paymentModel.js'

const getPayments = async (req, res) => {
  try {
    const payments = await model.getAllPayments()
    res.json(payments)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pagos' })
  }
}

const getPayment = async (req, res) => {
  try {
    const payment = await model.getPaymentById(req.params.id)
    if (!payment) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    res.json(payment)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pago' })
  }
}

const createNewPayment = async (req, res) => {
  try {
    const newPayment = await model.createPayment(req.body)
    res.status(201).json(newPayment)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pago' })
  }
}

const updateExistingPayment = async (req, res) => {
  try {
    const updatedPayment = await model.updatePayment(req.params.id, req.body)
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    res.json(updatedPayment)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pago' })
  }
}

const deletePaymentRecord = async (req, res) => {
  try {
    const deletedPayment = await model.deletePayment(req.params.id)
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    res.json(deletedPayment)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pago' })
  }
}
export default { getPayments, getPayment, createNewPayment, updateExistingPayment, deletePaymentRecord }
