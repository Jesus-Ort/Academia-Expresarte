import { supabase } from '../config/supabase.js'

// Cargar horarios
export const getSchedules = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("v_schedules_full")
        .select(`*`)

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
        console.error("ERROR EN getSchedules:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar horario
export const postSchedules = async (req, res) => {
    try {
        const {
        teacher_id,
        subject_id,
        day_of_week,
        start_time,
        end_time,
        } = req.body

        if (!teacher_id || !subject_id || !day_of_week || !start_time || !end_time){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:schedulesData, error: schedulesError} = await supabase
        .from("schedules")
        .insert([
            {
                teacher_id,
                subject_id,
                day_of_week,
                start_time,
                end_time,
            }
        ])

        if (schedulesError) {
            return res.status(400).json({message: 'Error al insertar el nuevo horario', error: schedulesError.message});
        }

        res.status(201).json({
        message: 'Registro enviado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN postSchedules:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar horario
export const patchSchedules = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del horario requerido" })

        const {
        teacher_id,
        subject_id,
        day_of_week,
        start_time,
        end_time
        } = req.body

        if (!teacher_id || !subject_id ||!day_of_week || !start_time || !end_time){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:schedulesData, error: schedulesError} = await supabase
        .from("schedules")
        .update([
            {
                teacher_id,
                subject_id,
                day_of_week,
                start_time,
                end_time,
            }
        ])
        .eq("id",id)
        .select()

        if (schedulesError) {
            return res.status(400).json({message: 'Error al actualizar el horario', error: schedulesError.message});
        }

        res.status(201).json({
        message: 'Horario actualizado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN patchSchedules:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar clase
export const delSchedules = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del horario requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("schedules")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Horario eliminado correctamente"})

    } catch (err) {
        console.error("ERROR EN delSchedules:", err);
        res.status(500).json({ error: err.message });
    }
}
