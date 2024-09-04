import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import { authMiddleware } from './middlewares/authMiddleware.js' // Importar el middleware

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Aplicar authMiddleware a todas las rutas
app.use(authMiddleware)

app.use('/', userRoutes)
app.use('/', addressRoutes)
app.use('/', productRoutes)
app.use('/', cartRoutes)
app.use('/', orderRoutes)
app.use('/', paymentRoutes)

export default app
