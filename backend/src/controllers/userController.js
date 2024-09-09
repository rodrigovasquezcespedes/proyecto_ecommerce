import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const existingUser = await userModel.findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.createUser(name, email, hashedPassword, role)

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

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userModel.findUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

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

const updateUser = async (req, res) => {
  const { idUser } = req.params
  const { name, email } = req.body

  try {
    const updatedUser = await userModel.updateUserById(idUser, name, email)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error })
  }
}

const deleteUser = async (req, res) => {
  const { idUser } = req.params

  try {
    await userModel.deleteUserById(idUser)
    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
}

const getUserById = async (req, res) => {
  const { idUser } = req.params

  try {
    const user = await userModel.findUserById(idUser)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error })
  }
}
export default { registerUser, loginUser, updateUser, getUserById, deleteUser }
