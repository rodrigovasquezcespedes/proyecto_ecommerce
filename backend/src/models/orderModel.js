import pool from '../config/db.js'

// Obtener todos los pedidos
const getOrders = async () => {
  const result = await pool.query('SELECT * FROM pedidos')
  return result.rows
}

// Obtener un pedido por ID
const getOrderById = async id => {
  const result = await pool.query(
    'SELECT * FROM pedidos WHERE id_pedido = $1',
    [id]
  )
  return result.rows[0]
}

// Crear un nuevo pedido
const createOrder = async order => {
  const { usuarioId, total, estado } = order
  const result = await pool.query(
    `INSERT INTO pedidos (usuario_id, total, estado) 
         VALUES ($1, $2, $3) RETURNING *`,
    [usuarioId, total, estado]
  )
  return result.rows[0]
}

// Actualizar un pedido
const updateOrder = async (id, order) => {
  const { total, estado } = order
  const result = await pool.query(
    `UPDATE pedidos 
         SET total = $1, estado = $2 
         WHERE id_pedido = $3 RETURNING *`,
    [total, estado, id]
  )
  return result.rows[0]
}

// Eliminar un pedido
const deleteOrder = async id => {
  await pool.query('DELETE FROM pedidos WHERE id_pedido = $1', [id])
}
export default { getOrders, getOrderById, createOrder, updateOrder, deleteOrder }
