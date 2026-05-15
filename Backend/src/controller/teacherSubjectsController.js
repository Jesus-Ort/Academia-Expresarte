import { supabase } from '../config/supabase.js'

// Cargar clases
export const getTeacherSubjects = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        // Seleccionar clases incluyendo datos relacionados (nombre del profesor y catedra)
        const {data, error} = await supabase
        .from("teacher_subjects")
        .select(`*, teacher:teacher_id(nombre_completo), subject:subject_id(catedra)`)
        .eq("is_active", true)

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
        console.error("ERROR EN getTeacherSubjects:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar clase
export const postTeacherSubjects = async (req, res) => {
    try {
        const {
        teacher_id,
        subject_id,
        } = req.body

        if (!teacher_id || !subject_id){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:teacherSubjectsData, error: teacherSubjectsError} = await supabase
        .from("teacher_subjects")
        .insert([
            {
                teacher_id,
                subject_id,
            }
        ])

        if (teacherSubjectsError) {
            return res.status(400).json({message: 'Error al insertar la nueva clase', error: teacherSubjectsError.message});
        }

        res.status(201).json({
        message: 'Registro enviado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN postTeacherSubjects:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar clase
export const patchTeacherSubjects = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id de la clase requerido" })

        const {
        teacher_id,
        subject_id,
        } = req.body

        if (!teacher_id || !subject_id){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:teacherSubjectsData, error: teacherSubjectsError} = await supabase
        .from("teacher_subjects")
        .update([
            {
                teacher_id,
                subject_id,
            }
        ])
        .eq("id",id)
        .select()

        if (teacherSubjectsError) {
            return res.status(400).json({message: 'Error al actualizar la clase', error: teacherSubjectsError.message});
        }

        res.status(201).json({
        message: 'Clase actualizada exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN patchTeacherSubjects:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar clase
export const delTeacherSubjects = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id de la clase requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("teacher_subjects")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Clase eliminada correctamente"})

    } catch (err) {
        console.error("ERROR EN delTeacherSubjects:", err);
        res.status(500).json({ error: err.message });
    }
}
