import * as yup from 'yup'

export const studentsCrud = {
    title: 'Estudiante',

    apiBase: {
        list: '/api/v1/students',
        create: '/api/v1/students',
        update: (id: string) => `/api/v1/students/${id}`,
        delete: (id: string) => `/api/v1/students/${id}`
    },

    schema: yup.object({
        nombre_completo: yup
            .string()
            .trim()
            .min(5, "Debe contener mínimo 5 letras")
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios')
            .required('El nombre es requerido'),
    
        cedula: yup
            .string()
            .trim()
            .matches(/^[0-9]+$/, 'Solo se permiten números')
            .min(6, 'Cédula inválida')
            .required('Se requiere la cédula'),
    
        fecha_nacimiento: yup
            .string()
            .required('Se requiere la fecha de nacimiento')
            .test('valid-date', 'Fecha inválida', value => {
                return !!value && !isNaN(Date.parse(value))
            }),
        }),

    form: {
        initial: {
        nombre_completo: '',
        cedula: '',
        fecha_nacimiento: '',
        }
    },

    fields: [
        { key: 'nombre_completo', label: 'Nombre', type: 'text' },
        { key: 'cedula', label: 'Cédula', type: 'text' },
        { key: 'fecha_nacimiento', label: 'Fecha de Nacimiento', type: 'date'}
    ]
}