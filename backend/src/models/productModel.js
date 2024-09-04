// src/models/productModel.js
import pool from '../config/db.js'

const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM productos')
  return result.rows
}

const getProductById = async id => {
  const result = await pool.query(
    'SELECT * FROM productos WHERE id_producto = $1',
    [id]
  )
  return result.rows[0]
}

export const createProduct = async product => {
  const { nombre, descripcion, precio, stock } = product
  const result = await pool.query(
    `INSERT INTO productos (nombre, descripcion, precio, stock) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombre, descripcion, precio, stock]
  )
  return result.rows[0]
}

const updateProduct = async (id, product) => {
  const { nombre, descripcion, precio, stock } = product
  const result = await pool.query(
    `UPDATE productos 
     SET nombre = $1, descripcion = $2, precio = $3, stock = $4 
     WHERE id_producto = $5 RETURNING *`,
    [nombre, descripcion, precio, stock, id]
  )
  return result.rows[0]
}

const deleteProduct = async id => {
  const result = await pool.query(
    'DELETE FROM productos WHERE id_producto = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}
export default { getAllProducts, getProductById, updateProduct, deleteProduct }
