import { supabase } from '../config/supabase.js'

// Cargar datos del dash
export const getDashboard = async (req, res) => {
    try {
        
        if(!req.user){
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }
        
        const {data, error} = await supabase
        .from("v_dashboard_metrics")
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
        console.error("ERROR EN getDashboard:", err)

        res.status(500).json({
            message: "Internal server error"
        })
    }
}