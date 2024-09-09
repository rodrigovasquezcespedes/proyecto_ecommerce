import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import model from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    // Verificar si el usuario ya existe
    const existingUser = await model.findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' })
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario
    const newUser = await model.createUser(name, email, hashedPassword, role)

    // Crear el token JWT
    const token = jwt.sign(
      { id_user: newUser.id_user, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(201).json({ token, user: newUser })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar al usuario', error })
  }
}

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Buscar el usuario por email
    const user = await model.findUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
}

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { idUser } = req.params
  const { name, email } = req.body

  try {
    const updatedUser = await model.updateUserById(idUser, name, email)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error })
  }
}

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { idUser } = req.params

  try {
    await model.deleteUserById(idUser)
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
}

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { idUser } = req.params

  try {
    const user = await model.findUserById(idUser)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error })
  }
}
export default { registerUser, loginUser, updateUser, getUserById, deleteUser }
