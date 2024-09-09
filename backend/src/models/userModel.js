import pool from '../config/db.js'

const createUser = async (name, email, password, role) => {
  const query =
    'INSERT INTO users (name, email, password,role) VALUES ($1, $2, $3,$4) RETURNING *'
  const values = [name, email, password, role]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const findUserByEmail = async email => {
  const query = 'SELECT * FROM users WHERE email = $1'
  const result = await pool.query(query, [email])
  return result.rows[0]
}

const updateUserById = async (idUser, name, email) => {
  const query =
    'UPDATE users SET name = $1, email = $2 WHERE id_user = $3 RETURNING *'
  const values = [name, email, idUser]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteUserById = async idUser => {
  const query = 'DELETE FROM users WHERE id_user = $1'
  await pool.query(query, [idUser])
  return { message: 'User deleted' }
}

const findUserById = async idUser => {
  const query = 'SELECT * FROM users WHERE id_user = $1'
  const result = await pool.query(query, [idUser])
  return result.rows[0]
}
export default {
  createUser,
  findUserByEmail,
  updateUserById,
  deleteUserById,
  findUserById
}
