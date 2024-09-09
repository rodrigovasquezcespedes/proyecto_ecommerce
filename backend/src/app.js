import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import authMiddleware from './middlewares/authMiddleware.js'

const app = express()

app.use(express.json())

app.use(authMiddleware)

app.use('/', userRoutes)
app.use('/', addressRoutes)
app.use('/', productRoutes)
app.use('/', cartRoutes)
app.use('/', orderRoutes)
app.use('/', paymentRoutes)

export default app
