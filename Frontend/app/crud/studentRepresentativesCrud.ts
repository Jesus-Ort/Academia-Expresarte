import * as yup from 'yup'

export const studentRepresentativesCrud = {
    title: 'Representados',

    apiBase: {
        list: '/api/v1/studentsRepresentatives',
        create: '/api/v1/studentsRepresentatives',
        update: (id: string) => `/api/v1/studentsRepresentatives/${id}`,
        delete: (id: string) => `/api/v1/studentsRepresentatives/${id}`
    },

    schema: yup.object({
        student_id: yup
            .string()
            .trim()
            .required('El ID del estudiante es requerido'),
    
        representative_id: yup
            .string()
            .trim()
            .required('El ID del respresentate es requerido'),

        relationship: yup
            .string()
            .oneOf(['Mamá', 'Papá', 'Otro'], "Debe ser una de las opciones")
            .required('El tipo de relación es requerido')        
        }),

    form: {
        initial: {
        student_id: '',
        representative_id: '',
        relationship: ''
        }
    },

    fields: [
        {
        key: 'student_id',
        label: 'Estudiante',
        type: 'relation',
        display: 'student.nombre_completo',

        relation: {
            resource: '/api/v1/students',
            label: 'nombre_completo',
            value: 'id',
        }
        },
        {
        key: 'representative_id',
        label: 'Representante',
        type: 'relation',
        display: 'representative.nombre_completo',

        relation: {
            resource: '/api/v1/users',
            label: 'nombre_completo',
            value: 'id',
        }
        },
        {
        key: 'relationship',
        label: 'Relación',
        type: 'select',
        options: [
            { label: 'Mamá', value: 'Mamá' },
            { label: 'Papá', value: 'Papá' },
            { label: 'Otro', value: 'Otro ' }
        ]
        },
    ]
}