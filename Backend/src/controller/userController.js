import { supabase } from '../config/supabase.js'

// Cargar usuarios
export const getUsers = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("v_profiles_representatives")
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
        console.error("ERROR EN getUser:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Editar usuario 
export const patchUsers = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id del usuario requerido" })

        const {
        nombre_completo,
        cedula,
        fecha_nacimiento,
        telefono,
        direccion,
        rol,
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
                message: 'El representante debe ser mayor de edad'
            })
        }

        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const {data:userTableData, error: userTableError} = await supabase
        .from("profiles")
        .update([
            {
                nombre_completo: nombre_completo.trim(),
                cedula: cedula.trim(),
                fecha_nacimiento,
                telefono: telefono.trim(),
                direccion: direccion.trim(),
                rol: rol
            }
        ])
        .eq("id",id)
        .select()

        if (userTableError) {
            return res.status(400).json({message: 'Error al actualizar el usuario', error: userTableError.message});
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

// Eliminar usuario
export const delUsers = async (req,res) => {
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
        .from("profiles")
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

// Cambiar correo
export const updateEmail = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Correo es obligatorio" });

        const { data, error } = await supabase.auth.admin.updateUserById(req.user.id, {
        email,
        });

        if (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
        }

        res.json({ message: "Correo actualizado correctamente", user: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Cambiar contraseña
export const updatePassword = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Usuario no autenticado" });

        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6)
        return res.status(400).json({ message: "Nueva contraseña inválida" });

        const { data, error } = await supabase.auth.admin.updateUserById(req.user.id, {
        password: newPassword,
        });

        if (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
        }

        res.json({ message: "Contraseña actualizada correctamente", user: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Cambiar nombre de usuario
export const updateUserName = async (req, res) => {
    try {
        if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const { nombre_completo } = req.body;
        if (!nombre_completo) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        const { data, error } = await supabase
        .from('profiles')
        .update({ nombre_completo })
        .eq('id', req.user.id);

        if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error actualizando el nombre del usuario" });
        }

        res.json({ message: "Nombre del usuario actualizado correctamente"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
