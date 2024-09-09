import pool from '../config/db.js'

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
  return result.rows[0]
}

const createProductSpecifications = async (productId, specifications) => {
  const query =
    'INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES ($1, $2, $3)'

  for (const spec of specifications) {
    const specName = Object.keys(spec)[0]
    const specValue = spec[specName]
    await pool.query(query, [productId, specName, specValue])
  }
}

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

  await pool.query('DELETE FROM product_specifications WHERE id_product = $1', [
    productId
  ])
  await createProductSpecifications(productId, specifications)

  return result.rows[0]
}

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
