import model from '../models/orderModel.js'

const getAllOrders = async (req, res) => {
  try {
    const orders = await model.getOrders()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' })
  }
}

const getOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await model.getOrderById(id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido' })
  }
}

const createNewOrder = async (req, res) => {
  try {
    const newOrder = await model.createOrder(req.body)
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' })
  }
}

const updateExistingOrder = async (req, res) => {
  try {
    const { id } = req.params
    const updatedOrder = await model.updateOrder(id, req.body)
    if (updatedOrder) {
      res.json(updatedOrder)
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido' })
  }
}

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params
    await model.deleteOrder(id)
    res.status(204).json()
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido' })
  }
}
export default { getAllOrders, getOrder, createNewOrder, updateExistingOrder, deleteOrderById }
