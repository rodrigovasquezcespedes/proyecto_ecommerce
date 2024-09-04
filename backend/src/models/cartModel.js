import pool from '../config/db.js'

const getAllCarts = async () => {
  const result = await pool.query('SELECT * FROM carritos')
  return result.rows
}

const getCartById = async id => {
  const result = await pool.query(
    'SELECT * FROM carritos WHERE id_carrito = $1',
    [id]
  )
  return result.rows[0]
}

const createCart = async cart => {
  const { usuarioId } = cart
  const result = await pool.query(
    'INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING *',
    [usuarioId]
  )
  return result.rows[0]
}

const updateCart = async (id, cart) => {
  const { usuarioId } = cart
  const result = await pool.query(
    'UPDATE carritos SET usuario_id = $1 WHERE id_carrito = $2 RETURNING *',
    [usuarioId, id]
  )
  return result.rows[0]
}

const deleteCart = async id => {
  const result = await pool.query(
    'DELETE FROM carritos WHERE id_carrito = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}
export default { getAllCarts, getCartById, createCart, updateCart, deleteCart }
