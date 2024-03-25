import express from 'express';
import { loginController } from './controllers/loginController.js';
import { authMiddleware } from './middlewares/login.js';
import { infoController } from './controllers/infoController.js';
import { productsController } from './controllers/productController.js';
import cors from 'cors';
import { ApiError } from './utils/apiError.js';



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

app.listen(3307, () => {
    console.log("The server is running in port: 3307");
  });