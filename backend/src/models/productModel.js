import pool from '../config/db.js'

// Crear producto
const createProduct = async (
  name,
  description,
  price,
  stock,
  imageUrl,
  brand,
  categoryId
) => {
  const query =
    'INSERT INTO products (name, description, price, stock, image_url, brand, id_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = [name, description, price, stock, imageUrl, brand, categoryId]
  const result = await pool.query(query, values)
  return result.rows[0] // Retorna el producto insertado
}

// Crear especificaciones del producto
const createProductSpecifications = async (productId, specifications) => {
  const query =
    'INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES ($1, $2, $3)'

  for (const spec of specifications) {
    const specName = Object.keys(spec)[0] // Obtén el nombre de la especificación
    const specValue = spec[specName] // Obtén el valor de la especificación

    // Inserta la especificación en la tabla product_specifications
    await pool.query(query, [productId, specName, specValue])
  }
}

// Obtener todos los productos con especificaciones
const getAllProducts = async () => {
  const productQuery = 'SELECT * FROM products'
  const specQuery = 'SELECT * FROM product_specifications WHERE id_product = $1'

  const result = await pool.query(productQuery)
  const products = result.rows

  for (const product of products) {
    const specResult = await pool.query(specQuery, [product.id_product])
    product.specifications = specResult.rows.map(spec => ({
      [spec.spec_name]: spec.spec_value
    }))
  }

  return products
}

// Obtener un producto por ID con sus especificaciones
const getProductById = async productId => {
  const productQuery = 'SELECT * FROM products WHERE id_product = $1'
  const specQuery = 'SELECT * FROM product_specifications WHERE id_product = $1'

  const result = await pool.query(productQuery, [productId])
  const product = result.rows[0]

  if (!product) {
    return null
  }

  const specResult = await pool.query(specQuery, [productId])
  product.specifications = specResult.rows.map(spec => ({
    [spec.spec_name]: spec.spec_value
  }))

  return product
}

// Actualizar un producto y sus especificaciones
const updateProductById = async (
  productId,
  name,
  description,
  price,
  stock,
  imageUrl,
  brand,
  categoryId,
  specifications
) => {
  const productQuery =
    'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, brand = $6, id_category = $7 WHERE id_product = $8 RETURNING *'
  const values = [
    name,
    description,
    price,
    stock,
    imageUrl,
    brand,
    categoryId,
    productId
  ]
  const result = await pool.query(productQuery, values)

  // Eliminar especificaciones antiguas y agregar nuevas
  await pool.query('DELETE FROM product_specifications WHERE id_product = $1', [
    productId
  ])
  await createProductSpecifications(productId, specifications)

  return result.rows[0]
}

// Eliminar un producto y sus especificaciones
const deleteProductById = async productId => {
  await pool.query('DELETE FROM product_specifications WHERE id_product = $1', [
    productId
  ])
  await pool.query('DELETE FROM products WHERE id_product = $1', [productId])
  return { message: 'Product deleted' }
}

export default {
  createProduct,
  createProductSpecifications,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
}
