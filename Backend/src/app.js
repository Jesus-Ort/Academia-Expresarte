import express from 'express'
import cors from 'cors'

import { verifyToken } from './middlewares/verifyToken.js'

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import studentRoutes from "./routes/student.js"

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
app.use("/api/v1/users/", verifyToken, userRoutes); 
app.use("/api/v1/students/", verifyToken, studentRoutes); 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})