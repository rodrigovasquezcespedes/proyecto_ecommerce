import db from '../config/db.js' // Asegúrate de que esta sea tu configuración de base de datos

const addFavorite = async (userId, productId) => {
  const query =
    'INSERT INTO favorites (id_user, id_product) VALUES ($1, $2) RETURNING *'
  const values = [userId, productId]
  try {
    const result = await db.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error adding favorite')
  }
}

const removeFavorite = async favoriteId => {
  const query = 'DELETE FROM favorites WHERE id_favorite = $1 RETURNING *'
  const values = [favoriteId]
  try {
    const result = await db.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error removing favorite')
  }
}

const getFavoriteByProductId = async (userId, productId) => {
  const query = 'SELECT * FROM favorites WHERE id_user = $1 AND id_product = $2'
  const values = [userId, productId]
  try {
    const result = await db.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw new Error('Error retrieving favorite')
  }
}

export default {
  addFavorite,
  removeFavorite,
  getFavoriteByProductId
}
