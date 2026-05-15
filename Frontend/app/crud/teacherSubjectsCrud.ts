import * as yup from 'yup'

export const teacherSubjectsCrud = {
    title: 'Clase',

    apiBase: {
        list: '/api/v1/teacherSubjects',
        create: '/api/v1/teacherSubjects',
        update: (id: string) => `/api/v1/teacherSubjects/${id}`,
        delete: (id: string) => `/api/v1/teacherSubjects/${id}`
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

        }),

    form: {
        initial: {
        student_id: '',
        representative_id: ''
        }
    },

    fields: [
        {
        key: 'teacher_id',
        label: 'Profesor',
        type: 'relation',
        display: 'teacher.nombre_completo',

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
        display: 'subject.catedra',

        relation: {
            resource: '/api/v1/subjects',
            label: 'catedra',
            value: 'id',
        }
        },
    ]
}