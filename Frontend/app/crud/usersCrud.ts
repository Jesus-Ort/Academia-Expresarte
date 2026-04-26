import * as yup from 'yup'

export const usersCrud = {
    title: 'Usuario',

    apiBase: {
        list: '/api/v1/users',
        create: '/api/v1/users',
        update: (id: string) => `/api/v1/users/${id}`,
        delete: (id: string) => `/api/v1/users/${id}`
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

    telefono: yup
        .string()
        .trim()
        .matches(/^[0-9]+$/, 'Solo se permiten números')
        .min(7, 'Teléfono inválido')
        .max(15, 'Teléfono demasiado largo')
        .required('Se requiere el número de teléfono'),

    direccion: yup
        .string()
        .trim()
        .min(5, 'Dirección muy corta')
        .required('Se requiere la dirección'),
    
    rol: yup
        .string()
        .oneOf(['admin', 'representante'])
        .required('El rol es requerido')
    }),

    form: {
        initial: {
            nombre_completo: '',
            cedula: '',
            fecha_nacimiento: '',
            telefono: '',
            direccion: '',
            rol: ''
        }
    },

    fields: [
        { key: 'nombre_completo', label: 'Nombre Completo' },
        { key: 'cedula', label: 'Cédula' },
        { key: 'fecha_nacimiento', label: 'Fecha de Nacimiento' },
        { key: 'edad', label: 'Edad' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'direccion', label: 'Dirección' },
        {
        key: 'rol',
        label: 'Rol',
        type: 'select',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Representante', value: 'representante' }
        ]
        },
    ],
    
}