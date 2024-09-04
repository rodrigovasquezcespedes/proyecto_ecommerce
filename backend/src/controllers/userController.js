// src/controllers/userController.js
import model from '../models/userModel.js'

const getUsers = async (req, res) => {
  try {
    const users = await model.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await model.getUserById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' })
  }
}

const createNewUser = async (req, res) => {
  try {
    const newUser = await model.createUser(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}

const updateUserDetails = async (req, res) => {
  try {
    const updatedUser = await model.updateUser(req.params.id, req.body)
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

const deleteUserAccount = async (req, res) => {
  try {
    const response = await model.deleteUser(req.params.id)
    res.json(response)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}
export default { getUsers, getUser, createNewUser, updateUserDetails, deleteUserAccount }
