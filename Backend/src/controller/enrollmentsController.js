import { supabase } from '../config/supabase.js'

// Cargar asignaciones
export const getEnrollments = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("v_enrollments_full")
        .select(`*`)
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
        console.error("ERROR EN getEnrollments:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar asignado
export const postEnrollments = async (req, res) => {
    try {
        const {
        student_id,
        schedule_id,
        } = req.body

        if (!student_id || !schedule_id){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:enrollmentsData, error: enrollmentsError} = await supabase
        .from("enrollments")
        .insert([
            {
                student_id,
                schedule_id,
            }
        ])

        if (enrollmentsError) {
            return res.status(400).json({message: 'Error al insertar el nuevo asignado', error: enrollmentsError.message});
        }

        res.status(201).json({
        message: 'Registro enviado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN postEnrollments:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar asignado
export const patchEnrollments = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del asignado requerido" })

        const {
        student_id,
        schedule_id,
        } = req.body

        if (!student_id || !schedule_id){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:enrollmentsData, error: enrollmentsError} = await supabase
        .from("enrollments")
        .update([
            {
                student_id,
                schedule_id,
            }
        ])
        .eq("id",id)
        .select()

        if (enrollmentsError) {
            return res.status(400).json({message: 'Error al actualizar el asignado', error: enrollmentsError.message});
        }

        res.status(201).json({
        message: 'Representado actualizado exitosamente.',
        });

    } catch (err) {
        console.error("ERROR EN patchEnrollments:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar asignado
export const delEnrollments = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del asignado requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("enrollments")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Asignado eliminado correctamente"})

    } catch (err) {
        console.error("ERROR EN delEnrollments:", err);
        res.status(500).json({ error: err.message });
    }
}
