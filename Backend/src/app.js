import express from 'express'
import cors from 'cors'

import { verifyToken } from './middlewares/verifyToken.js'

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js"


const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

// Test
app.get('/test', (req, res) => {
    res.send('Api funcionando!')
})

// Rutas
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/user/", verifyToken, userRoutes); 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})