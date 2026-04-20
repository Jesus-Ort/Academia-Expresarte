import { supabase } from '../config/supabase.js'

// REGISTRO
export const register = async (req, res) => {
    try {
        const {
        email, 
        password,
        nombre_completo,
        cedula,
        fecha_nacimiento,
        telefono,
        direccion,
        } = req.body

        if (!email || !password || nombre_completo || cedula || fecha_nacimiento || telefono || direccion ){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        const currentFecha = new Date().getFullYear()

        const edad = currentFecha - fecha_nacimiento

        if ( edad < 18 ){
            return res.status(400).json({message:'El representante debe ser mayor de edad'});
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        if (authError) {
            return res.status(400).json({ message: authError.message, error: authError.message });
        }

        const user_id = authData.user?.id;
        if(!user_id){
            return res.status(500).json({ message: 'No se pudo obtener el ID del usuario' })
        }

        const {data:userTableData, error: userTableError} = await supabase
        .from("profiles")
        .insert([
            {
                id: user_id,
                nombre_completo,
                cedula,
                fecha_nacimiento,
                telefono,
                direccion
            }
        ]);

        if (userTableError) {
            return res.status(400).json({message: 'Error al insertar el nuevo usuario', error: userTableError.message});
        }

        res.status(201).json({
        message: 'Registro exitoso. Revisa tu correo para confirmar la cuenta.',
        });
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email y contraseña son obligatorios"
            });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })        

        if (error) {
        console.error(error)

        return res.status(401).json({
            message: "Credenciales inválidas"
        })
        }

        if (!data.session) {
            return res.status(400).json({ message: 'Usuario no tiene sesión activa o no ha confirmado correo' })
        }

        res.json({
            message: 'Inicio de sesión exitoso',
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
        })
    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Refresh token
export const refreshToken = async (req, res) => {
    try {
        const { refresh_token } = req.body

        if (!refresh_token) {
        return res.status(400).json({ error: "refresh_token requerido" })
        }

        // Refrescar usando SERVICE ROLE
        const { data, error } = await supabase.auth.refreshSession({
        refresh_token
        })

        if (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error"
        })
        }

        return res.json({
        message: "Token refrescado",
        session: data.session,
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: data.user
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}