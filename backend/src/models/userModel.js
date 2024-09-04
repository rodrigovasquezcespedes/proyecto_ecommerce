// src/models/userModel.js
import pool from '../config/db.js'

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM usuarios')
  return result.rows
}

const getUserById = async id => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE id_usuario = $1',
    [id]
  )
  return result.rows[0]
}

const createUser = async user => {
  const { nombre, email, contraseña, telefono, rol } = user
  const result = await pool.query(
    `INSERT INTO usuarios (nombre, email, contraseña, telefono, rol) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nombre, email, contraseña, telefono, rol]
  )
  return result.rows[0]
}

const updateUser = async (id, user) => {
  const { nombre, email, telefono, rol } = user
  const result = await pool.query(
    `UPDATE usuarios SET nombre = $1, email = $2, telefono = $3, rol = $4 
     WHERE id_usuario = $5 RETURNING *`,
    [nombre, email, telefono, rol, id]
  )
  return result.rows[0]
}

const deleteUser = async id => {
  await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id])
  return { message: 'Usuario eliminado con éxito' }
}
export default { getAllUsers, getUserById, createUser, updateUser, deleteUser }
