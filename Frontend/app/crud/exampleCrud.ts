import * as yup from 'yup'

export const demoCrud = {
    title: 'Demo',

    apiBase: {
        list: '/api/demo',
        create: '/api/demo',
        update: (id: string) => `/api/demo/${id}`,
        delete: (id: string) => `/api/demo/${id}`
    },

  // -------------------
  // VALIDACIONES
  // -------------------
    schema: yup.object({
        texto: yup.string().required(),
        email: yup.string().email().required(),
        numero: yup.number().required(),
        password: yup.string().min(6).required(),
        fecha: yup.string().required(),
        activo: yup.boolean(),
        rol: yup.string().required(),
        archivo: yup.mixed(),
        multiple_archivos: yup.mixed(),
        descripcion: yup.string()
    }),

    // -------------------
    // ESTADO INICIAL
    // -------------------
    form: {
        initial: {
        texto: '',
        email: '',
        numero: null,
        password: '',
        fecha: '',
        activo: false,
        rol: '',
        archivo: null,
        multiple_archivos: [],
        descripcion: ''
        }
    },

  // -------------------
  // CAMPOS (TIPOS)
  // -------------------
    fields: [
    // TEXT
    {
        key: 'texto',
        label: 'Texto',
        type: 'text'
    },

    // EMAIL
    {
        key: 'email',
        label: 'Correo',
        type: 'email'
    },

    // NUMBER
    {
        key: 'numero',
        label: 'Número',
        type: 'number'
    },

    // PASSWORD
    {
        key: 'password',
        label: 'Contraseña',
        type: 'password',
        showOnEdit: false // típico
    },

    // DATE
    {
        key: 'fecha',
        label: 'Fecha',
        type: 'date'
    },

    // TIEMPO
    {
        key: 'start_time',
        label: 'Hora de Inicio',
        type: 'time'
        },

    // TEXTAREA
    {
        key: 'descripcion',
        label: 'Descripción',
        type: 'textarea'
    },

    // SELECT
    {
        key: 'rol',
        label: 'Rol',
        type: 'select',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Usuario', value: 'user' }
        ]
    },

    // RELATION
    {
    key: 'rol_id',
    label: 'Rol',
    type: 'relation',

    relation: {
        resource: '/api/v1/roles',   // endpoint
        label: 'nombre',             // lo que ve el usuario
        value: 'id',                 // lo que se guarda
    }
    },


    // SWITCH / BOOLEAN
    {
        key: 'activo',
        label: 'Activo',
        type: 'switch'
    },

    // FILE
    {
        key: 'archivo',
        label: 'Archivo',
        type: 'file'
    },

    // MULTIPLE FILE
    {
        key: 'multiple_archivos',
        label: 'Múltiples Archivos',
        type: 'file',
        multiple: true
    }
    ]
}