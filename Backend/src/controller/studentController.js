import { supabase } from '../config/supabase.js'

// Cargar estudiantes
export const getStudents = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("v_students_with_age")
        .select("*")

        if (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error"
        })
        }

        res.json({
            data
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar estudiante
export const postStudents = async (req, res) => {
    try {
        const {
        nombre_completo,
        cedula,
        fecha_nacimiento,
        } = req.body

        if (!nombre_completo || !cedula || !fecha_nacimiento){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        // Parsear fecha 
        const birthDate = new Date(fecha_nacimiento)
        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({
                message: 'Fecha de nacimiento inválida'
            })
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:studentData, error: studentError} = await supabase
        .from("students")
        .insert([
            {
                nombre_completo: nombre_completo.trim(),
                cedula: cedula.trim(),
                fecha_nacimiento,
            }
        ])

        if (studentError) {
            return res.status(400).json({message: 'Error al insertar el nuevo estudiante', error: studentError.message});
        }

        res.status(201).json({
        message: 'Registro enviado exitosamente.',
        });
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}