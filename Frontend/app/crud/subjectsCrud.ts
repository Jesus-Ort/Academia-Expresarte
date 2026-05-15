import * as yup from 'yup'

export const subjectsCrud = {
    title: 'Catedra',

    apiBase: {
        list: '/api/v1/subjects',
        create: '/api/v1/subjects',
        update: (id: string) => `/api/v1/subjects/${id}`,
        delete: (id: string) => `/api/v1/subjects/${id}`
    },

    schema: yup.object({
    catedra: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras, números y espacios')
        .required('El nombre es requerido'),
    }),

    form: {
        initial: {
            catedra: '',
        }
    },

    fields: [
        { key: 'catedra', label: 'Catedra', type: 'text' },
    ],
    
}