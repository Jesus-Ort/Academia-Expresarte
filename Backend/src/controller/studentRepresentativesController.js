import { supabase } from '../config/supabase.js'

// Cargar representados
export const getStudentRepresentatives = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        // Seleccionar representados incluyendo datos relacionados (nombre del estudiante y del representante)
        const {data, error} = await supabase
        .from("student_representatives")
        .select(`*, student:student_id(nombre_completo), representative:representative_id(nombre_completo)`)
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
        console.error("ERROR EN getStudentRepresentatives:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar representado
export const postStudentRepresentatives = async (req, res) => {
    try {
        const {
        student_id,
        representative_id,
        relationship,
        } = req.body

        if (!student_id || !representative_id || !relationship){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:studentRepresentativesData, error: studentRepresentativesError} = await supabase
        .from("student_representatives")
        .insert([
            {
                student_id,
                representative_id,
                relationship,
            }
        ])

        if (studentRepresentativesError) {
            return res.status(400).json({message: 'Error al insertar el nuevo representado', error: studentRepresentativesError.message});
        }

        res.status(201).json({
        message: 'Registro enviado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN postStudentRepresentatives:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar representado
export const patchStudentRepresentatives = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del representado requerido" })

        const {
        student_id,
        representative_id,
        relationship,
        } = req.body

        if (!student_id || !representative_id || !relationship ){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:studentRepresentativesData, error: studentRepresentativesError} = await supabase
        .from("student_representatives")
        .update([
            {
                student_id,
                representative_id,
                relationship,
            }
        ])
        .eq("id",id)
        .select()

        if (studentRepresentativesError) {
            return res.status(400).json({message: 'Error al actualizar el representado', error: studentRepresentativesError.message});
        }

        res.status(201).json({
        message: 'Represenado actualizado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN patchStudentRepresentatives:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar representado
export const delStudentRepresentatives = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del representado requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("student_representatives")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Representado eliminado correctamente"})

    } catch (err) {
        console.error("ERROR EN delStudentRepresentatives:", err);
        res.status(500).json({ error: err.message });
    }
}
