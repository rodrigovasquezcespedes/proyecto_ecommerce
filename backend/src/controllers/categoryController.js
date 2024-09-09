// controllers/categoryController.js
import categoryModel from '../models/categoryModel.js'

const fetchCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' })
  }
}

const fetchCategoryById = async (req, res) => {
  const { id } = req.params
  try {
    const category = await categoryModel.getCategoryById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category' })
  }
}

const createNewCategory = async (req, res) => {
  const { categoryName } = req.body
  try {
    const newCategory = await categoryModel.createCategory(categoryName)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' })
  }
}

const modifyCategory = async (req, res) => {
  const { id } = req.params
  const { categoryName } = req.body
  try {
    const updatedCategory = await categoryModel.updateCategory(id, categoryName)
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' })
  }
}

const removeCategory = async (req, res) => {
  const { id } = req.params
  try {
    const deletedCategory = await categoryModel.deleteCategory(id)
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(deletedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' })
  }
}

export default {
  fetchCategories,
  fetchCategoryById,
  createNewCategory,
  modifyCategory,
  removeCategory
}
