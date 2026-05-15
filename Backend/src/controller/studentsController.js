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
        console.error("ERROR EN getStudents:", err)

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
        console.error("ERROR EN postStudents:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar estudiante 
export const patchStudents = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del estudiante requerido" })

        const {
        nombre_completo,
        cedula,
        fecha_nacimiento,
        } = req.body

        if (!nombre_completo || !cedula || !fecha_nacimiento ){
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

        const {data:studentsData, error: studentsError} = await supabase
        .from("students")
        .update([
            {
                nombre_completo: nombre_completo.trim(),
                cedula: cedula.trim(),
                fecha_nacimiento,
            }
        ])
        .eq("id",id)
        .select()

        if (studentsError) {
            return res.status(400).json({message: 'Error al actualizar el estudiante', error: studentsError.message});
        }

        res.status(201).json({
        message: 'Estudiante actualizado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN patchStudents:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar estudiante
export const delStudents = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del estudiante requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("students")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Estudiante eliminado correctamente"})

    } catch (err) {
        console.error("ERROR EN delStudents:", err);
        res.status(500).json({ error: err.message });
    }
}
