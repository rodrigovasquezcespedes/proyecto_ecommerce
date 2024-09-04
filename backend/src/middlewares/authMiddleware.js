import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  // Obtener el token desde el encabezado de autorización
  const token = req.header('Authorization')

  // Si no hay token, denegar el acceso
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Acceso denegado, no se proporcionó token' })
  }

  try {
    // Verificar el token usando la clave secreta
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified // Adjuntar la información del usuario a la solicitud
    next() // Continuar con la siguiente función en la ruta
  } catch (error) {
    // Si la verificación falla, retornar un error
    res.status(400).json({ error: 'Token no válido' })
  }
}
