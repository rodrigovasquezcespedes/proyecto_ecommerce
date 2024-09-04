import model from '../models/cartModel.js'

const getAllCartsHandler = async (req, res) => {
  try {
    const carts = await model.getAllCarts()
    res.json(carts)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' })
  }
}

const getCartByIdHandler = async (req, res) => {
  try {
    const cart = await model.getCartById(req.params.id)
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' })
    }
    res.json(cart)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' })
  }
}

const createCartHandler = async (req, res) => {
  try {
    const newCart = await model.createCart(req.body)
    res.status(201).json(newCart)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' })
  }
}

const updateCartHandler = async (req, res) => {
  try {
    const updatedCart = await model.updateCart(req.params.id, req.body)
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' })
    }
    res.json(updatedCart)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' })
  }
}

const deleteCartHandler = async (req, res) => {
  try {
    const deletedCart = await model.deleteCart(req.params.id)
    if (!deletedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' })
    }
    res.json({ message: 'Carrito eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' })
  }
}
export default { getAllCartsHandler, getCartByIdHandler, createCartHandler, updateCartHandler, deleteCartHandler }
