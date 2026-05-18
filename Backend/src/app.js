import express from 'express'
import cors from 'cors'

import { verifyToken } from './middlewares/verifyToken.js'

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import usersRoutes from "./routes/user.js";
import studentsRoutes from "./routes/student.js"
import teachersRoutes from "./routes/teachers.js"
import subjectsRoutes from "./routes/subject.js"
import studentsRepresentativesRoutes from "./routes/studentRepresentatives.js"
import schedulesRoutes from "./routes/schedules.js"
import enrollmentsRoutes from "./routes/enrollments.js"

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
app.use("/api/v1/dashboard", verifyToken, dashboardRoutes); 
app.use("/api/v1/users", verifyToken, usersRoutes); 
app.use("/api/v1/students", verifyToken, studentsRoutes); 
app.use("/api/v1/teachers", verifyToken, teachersRoutes); 
app.use("/api/v1/subjects", verifyToken, subjectsRoutes); 
app.use("/api/v1/studentsRepresentatives", verifyToken, studentsRepresentativesRoutes);
app.use("/api/v1/schedules", verifyToken, schedulesRoutes);
app.use("/api/v1/enrollments", verifyToken, enrollmentsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})