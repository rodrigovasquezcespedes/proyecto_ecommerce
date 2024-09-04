// src/controllers/productController.js
import model from '../models/productModel.js'

const getProducts = async (req, res) => {
  try {
    const products = await model.getAllProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' })
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await model.getProductById(id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
}

const addProduct = async (req, res) => {
  try {
    const newProduct = await model.createProduct(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' })
  }
}

const updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await model.updateProduct(id, req.body)
    if (updatedProduct) {
      res.json(updatedProduct)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' })
  }
}

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await model.deleteProduct(id)
    if (deletedProduct) {
      res.json(deletedProduct)
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
}
export default { getProducts, getProduct, addProduct, updateProductDetails, removeProduct }
