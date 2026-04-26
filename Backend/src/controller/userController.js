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
        console.error(err)

        res.status(500).json({
            message: "Internal server error"
        })
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
