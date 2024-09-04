import pool from '../config/db.js'

// Obtener todas las direcciones por ID de usuario
const getAddressesByUserId = async usuarioId => {
  const result = await pool.query(
    'SELECT * FROM direcciones WHERE usuario_id = $1',
    [usuarioId]
  )
  return result.rows
}

// Crear una nueva dirección
const createAddress = async address => {
  const { usuarioId, direccion, ciudad, codigoPostal, tipo } = address
  const result = await pool.query(
    `INSERT INTO direcciones (usuario_id, direccion, ciudad, codigo_postal, tipo) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [usuarioId, direccion, ciudad, codigoPostal, tipo]
  )
  return result.rows[0]
}

// Actualizar una dirección
const updateAddress = async (idDireccion, address) => {
  const { direccion, ciudad, codigoPostal, tipo } = address
  const result = await pool.query(
    `UPDATE direcciones SET direccion = $1, ciudad = $2, codigo_postal = $3, tipo = $4 
     WHERE id_direccion = $5 RETURNING *`,
    [direccion, ciudad, codigoPostal, tipo, idDireccion]
  )
  return result.rows[0]
}

// Eliminar una dirección
const deleteAddress = async idDireccion => {
  const result = await pool.query(
    'DELETE FROM direcciones WHERE id_direccion = $1 RETURNING *',
    [idDireccion]
  )
  return result.rows[0]
}
export default { getAddressesByUserId, createAddress, updateAddress, deleteAddress }
