import { supabase } from '../config/supabase.js'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ error: 'Token requerido' })

        const { data, error } = await supabase.auth.getUser(token)
        if (error) return res.status(401).json({ error: 'Error verificando token', details: error.message })
        if (!data.user) return res.status(401).json({ error: 'Token expirado o inválido' })
        
        req.user = data.user
        next()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}