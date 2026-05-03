import { supabase } from '../config/supabase.js'

// Cargar profesores
export const getTeachers = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("v_teachers_full")
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
        console.error("ERROR EN getTeachers:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Registrar profesores
export const postTeachers = async (req, res) => {
    try {
        const {
        nombre_completo,
        cedula,
        fecha_nacimiento,
        telefono,
        direccion,
        } = req.body

        if (!nombre_completo || !cedula || !fecha_nacimiento || !telefono || !direccion ){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        // Parsear fecha 
        const birthDate = new Date(fecha_nacimiento)
        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({
                message: 'Fecha de nacimiento inválida'
            })
        }

        // Calcular edad 
        const today = new Date()
        let edad = today.getFullYear() - birthDate.getFullYear()

        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            edad--
        }

        if (edad < 18) {
            return res.status(400).json({
                message: 'El profesor debe ser mayor de edad'
            })
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:teachersData, error: teachersError} = await supabase
        .from("teachers")
        .insert([
            {
                nombre_completo: nombre_completo.trim(),
                cedula: cedula.trim(),
                fecha_nacimiento,
                telefono: telefono.trim(),
                direccion: direccion.trim(),
            }
        ])

        if (teachersError) {
            return res.status(400).json({message: 'Error al insertar el nuevo profesor', error: teachersError.message});
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

// Editar profesores 
export const patchTeachers = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del profesor requerido" })

        const {
        nombre_completo,
        cedula,
        fecha_nacimiento,
        telefono,
        direccion,
        } = req.body

        if (!nombre_completo || !cedula || !fecha_nacimiento || !telefono || !direccion ){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        // Parsear fecha 
        const birthDate = new Date(fecha_nacimiento)
        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({
                message: 'Fecha de nacimiento inválida'
            })
        }

        // Calcular edad 
        const today = new Date()
        let edad = today.getFullYear() - birthDate.getFullYear()

        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            edad--
        }

        if (edad < 18) {
            return res.status(400).json({
                message: 'El profesor debe ser mayor de edad'
            })
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:teachersData, error: teachersError} = await supabase
        .from("teachers")
        .update([
            {
                nombre_completo: nombre_completo.trim(),
                cedula: cedula.trim(),
                fecha_nacimiento,
                telefono: telefono.trim(),
                direccion: direccion.trim(),
            }
        ])
        .eq("id",id)
        .select()

        if (teachersError) {
            return res.status(400).json({message: 'Error al actualizar el profesor', error: teachersError.message});
        }

        res.status(201).json({
        message: 'Usuario actualizado exitosamente.',
        });
    } catch (err) {
        console.error("ERROR EN putUser:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Eliminar profesores
export const delTeachers = async (req,res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del usuario requerido" })

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        // Eliminar de forma logica
        const { data, error } = await supabase
        .from("teachers")
        .update({ is_active: false })
        .eq("id", id)
        .select()

        // Respuesta al front
        return res.json({ message: "Usuario eliminado correctamente"})

    } catch (err) {
        console.error("ERROR EN delUser:", err);
        res.status(500).json({ error: err.message });
    }
}