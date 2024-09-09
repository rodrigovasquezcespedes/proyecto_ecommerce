// models/categoryModel.js
import pool from '../config/db.js'

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories')
  return result.rows
}

const getCategoryById = async (categoryId) => {
  const result = await pool.query('SELECT * FROM categories WHERE id_category = $1', [categoryId])
  return result.rows[0]
}

const createCategory = async (categoryName) => {
  const result = await pool.query(
    'INSERT INTO categories (category_name) VALUES ($1) RETURNING *',
    [categoryName]
  )
  return result.rows[0]
}

const updateCategory = async (categoryId, categoryName) => {
  const result = await pool.query(
    'UPDATE categories SET category_name = $1 WHERE id_category = $2 RETURNING *',
    [categoryName, categoryId]
  )
  return result.rows[0]
}

const deleteCategory = async (categoryId) => {
  const result = await pool.query('DELETE FROM categories WHERE id_category = $1 RETURNING *', [categoryId])
  return result.rows[0]
}

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}
