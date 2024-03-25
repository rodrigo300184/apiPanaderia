import express from 'express';
import { loginController } from './controllers/loginController';
import { authMiddleware } from './middlewares/login';
import { infoController } from './controllers/infoController';
import { productsController } from './controllers/productController';
import cors from 'cors';
import { ApiError } from './utils/apiError';



export const app = express();

app.use(cors())
app.use(express.json())
// middlewares

// public routes
app.use('/', infoController)
app.use('/login', loginController)
app.use(authMiddleware)
app.use('/products', productsController)
app.use((error, _req, res) => {
    return res.send(error instanceof ApiError ? error.status : 500).json({ error: true, message: error.message ||'Application error' })
})