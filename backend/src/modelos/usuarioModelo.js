import pool from '../configuracion/baseDatos.js'

// Crear un nuevo usuario
export const crearUsuario = async (
  nombreUsuario,
  correo,
  contraseñaEncriptada
) => {
  const consulta = `
    INSERT INTO usuarios (nombreUsuario, email, password)
    VALUES ($1, $2, $3) RETURNING id_usuario, nombreUsuario, email;
  `
  const valores = [nombreUsuario, correo, contraseñaEncriptada]
  const resultado = await pool.query(consulta, valores)
  return resultado.rows[0]
}

// Buscar un usuario por su correo
export const buscarUsuarioPorCorreo = async correo => {
  const consulta = `
    SELECT id_usuario, nombreUsuario, email, password 
    FROM usuarios 
    WHERE email = $1;
  `
  const resultado = await pool.query(consulta, [correo])
  return resultado.rows[0]
}
