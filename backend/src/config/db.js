import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

pool.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err)
  } else {
    console.log('Conectado a la base de datos PostgreSQL')
  }
})

export default pool
