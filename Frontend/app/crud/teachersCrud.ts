import * as yup from 'yup'

export const teachersCrud = {
    title: 'Profesor',

    apiBase: {
        list: '/api/v1/teachers',
        create: '/api/v1/teachers',
        update: (id: string) => `/api/v1/teachers/${id}`,
        delete: (id: string) => `/api/v1/teachers/${id}`
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
    
    }),

    form: {
        initial: {
            nombre_completo: '',
            cedula: '',
            fecha_nacimiento: '',
            telefono: '',
            direccion: '',
        }
    },

    fields: [
        { key: 'nombre_completo', label: 'Nombre Completo', type: 'text' },
        { key: 'cedula', label: 'Cédula', type: 'text'  },
        { key: 'fecha_nacimiento', label: 'Fecha de Nacimiento', type: 'date' },
        { key: 'edad', label: 'Edad', type: 'text', disabledOnEdit:true, showOnCreate:false },
        { key: 'telefono', label: 'Teléfono', type: 'text'  },
        { key: 'direccion', label: 'Dirección', type: 'text'  },
    ],
    
}