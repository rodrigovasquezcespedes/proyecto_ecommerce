import productModel from '../models/productModel.js'

// Crear un nuevo producto con especificaciones
const createNewProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    imageUrl,
    brand,
    categoryId,
    specifications
  } = req.body

  try {
    // Crear el producto
    const newProduct = await productModel.createProduct(
      name,
      description,
      price,
      stock,
      imageUrl,
      brand,
      categoryId
    )

    // Verificar si hay especificaciones antes de intentar insertarlas
    if (specifications && specifications.length > 0) {
      await productModel.createProductSpecifications(
        newProduct.id_product,
        specifications
      )
    }

    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error })
  }
}

// Obtener todos los productos con especificaciones
const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error })
  }
}

// Obtener un producto por ID
const getProduct = async (req, res) => {
  const { productId } = req.params

  try {
    const product = await productModel.getProductById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error })
  }
}

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  const { productId } = req.params
  const {
    name,
    description,
    price,
    stock,
    imageUrl,
    brand,
    categoryId,
    specifications
  } = req.body

  try {
    const updatedProduct = await productModel.updateProductById(
      productId,
      name,
      description,
      price,
      stock,
      imageUrl,
      brand,
      categoryId,
      specifications
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error })
  }
}

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  const { productId } = req.params

  try {
    await productModel.deleteProductById(productId)
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error })
  }
}

export default {
  createNewProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
