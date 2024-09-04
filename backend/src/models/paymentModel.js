import pool from '../config/db.js'

const getAllPayments = async () => {
  const result = await pool.query('SELECT * FROM pagos')
  return result.rows
}

const getPaymentById = async id => {
  const result = await pool.query('SELECT * FROM pagos WHERE id_pago = $1', [
    id
  ])
  return result.rows[0]
}

const createPayment = async payment => {
  const { pedidoId, monto, metodoPago, estado } = payment
  const result = await pool.query(
    `INSERT INTO pagos (pedido_id, monto, metodo_pago, estado)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [pedidoId, monto, metodoPago, estado]
  )
  return result.rows[0]
}

const updatePayment = async (id, payment) => {
  const { pedidoId, monto, metodoPago, estado } = payment
  const result = await pool.query(
    `UPDATE pagos SET pedido_id = $1, monto = $2, metodo_pago = $3, estado = $4 
     WHERE id_pago = $5 RETURNING *`,
    [pedidoId, monto, metodoPago, estado, id]
  )
  return result.rows[0]
}

const deletePayment = async id => {
  const result = await pool.query(
    'DELETE FROM pagos WHERE id_pago = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}
export default { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment }
