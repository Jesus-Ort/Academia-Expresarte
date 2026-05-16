import * as yup from 'yup'

export const schedulesCrud = {
    title: 'Horario',

    apiBase: {
        list: '/api/v1/schedules',
        create: '/api/v1/schedules',
        update: (id: string) => `/api/v1/schedules/${id}`,
        delete: (id: string) => `/api/v1/schedules/${id}`
    },

    schema: yup.object({
        teacher_id: yup
            .string()
            .trim()
            .required('El ID del profesor es requerido'),
    
        subject_id: yup
            .string()
            .trim()
            .required('El ID de la catedra es requerido'),

        day_of_week: yup
            .string()
            .oneOf(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], "Debe ser una de las opciones")
            .required('El dia es requerido'),

        start_time: yup
            .string()
            .required('La hora de incio es requerida'),

        end_time: yup
            .string()
            .required('La hora de salida es requerida')

        }),

    form: {
        initial: {
        teacher_id: '',
        subject_id: '',
        day_of_week: '',
        start_time: '',
        end_time: ''
        }
    },

    fields: [
        {
        key: 'teacher_id',
        label: 'Profesor',
        type: 'relation',
        display: 'nombre_profesor',

        relation: {
            resource: '/api/v1/teachers',
            label: 'nombre_completo',
            value: 'id',
        }
        },
        {
        key: 'subject_id',
        label: 'Catedra',
        type: 'relation',
        display: 'subject_catedra',

        relation: {
            resource: '/api/v1/subjects',
            label: 'catedra',
            value: 'id',
        }
        },
        {
        key: 'day_of_week',
        label: 'Dia',
        type: 'select',
        options: [
            { label: 'Lunes', value: 'Lunes' },
            { label: 'Martes', value: 'Martes' },
            { label: 'Miércoles', value: 'Miércoles' },
            { label: 'Jueves', value: 'Jueves' },
            { label: 'Viernes', value: 'Viernes' },
            { label: 'Sábado', value: 'Sábado' },
            { label: 'Domingo', value: 'Domingo' },
        ]
        },
        {
        key: 'start_time',
        label: 'Hora de Inicio',
        type: 'time',
        },
        {
        key: 'end_time',
        label: 'Hora de Salida',
        type: 'time',
        
        },
    ]
}