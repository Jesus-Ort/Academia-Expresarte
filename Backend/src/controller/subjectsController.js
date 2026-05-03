import { supabase } from '../config/supabase.js'

// Cargar catedras
export const getSubjects = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("subjects")
        .select("*")
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
        console.error("ERROR EN getSubjects:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar catedra
export const postSubjects = async (req, res) => {
    try {
        const {
        catedra,
        } = req.body

        if (!catedra){
            return res.status(400).json({message: 'La catedra es obligatoria'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:subjectData, error: subjectError} = await supabase
        .from("subjects")
        .insert([
            {
                catedra: catedra.trim(),
            }
        ])

        if (subjectError) {
            return res.status(400).json({message: 'Error al insertar la nueva catedra', error: subjectError.message});
        }

        res.status(201).json({
        message: 'Registro enviado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN postSubjects:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar catedra 
export const patchSubjects = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id de la catedra requerido" })

        const {
        catedra,
        } = req.body

        if (!catedra){
            return res.status(400).json({message: 'La catedra es obligatoria'});
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:subjectData, error: subjectError} = await supabase
        .from("subjects")
        .update([
            {
                catedra: catedra.trim(),
            }
        ])
        .eq("id",id)
        .select()

        if (subjectError) {
            return res.status(400).json({message: 'Error al actualizar la catedra', error: subjectError.message});
        }

        res.status(201).json({
        message: 'Catedra actualizada exitosamente.',
        });

    } catch (err) {
        console.error("ERROR EN patchSubjects:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar estudiante
export const delSubjects = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id de la catedra requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("subjects")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Catedra eliminada correctamente"})

    } catch (err) {
        console.error("ERROR EN delSubjects:", err);
        res.status(500).json({ error: err.message });
    }
}
