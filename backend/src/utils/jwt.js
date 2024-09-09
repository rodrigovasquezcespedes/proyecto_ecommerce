import jwt from 'jsonwebtoken'

export const generateToken = user => {
  return jwt.sign(
    { id: user.id_user, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}
