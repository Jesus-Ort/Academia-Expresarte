import * as yup from 'yup'

const formatTime12h = (time: string) => {
    if (!time) return ''
    try {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        })
    } catch {
        return time
    }
}

export const enrollmentsCrud = {
    title: 'Asignado',

    apiBase: {
        list: '/api/v1/enrollments',
        create: '/api/v1/enrollments',
        update: (id: string) => `/api/v1/enrollments/${id}`,
        delete: (id: string) => `/api/v1/enrollments/${id}`
    },

    schema: yup.object({
        student_id: yup
            .string()
            .trim()
            .required('El ID del estudiante es requerido'),
    
        schedule_id: yup
            .string()
            .trim()
            .required('El ID del horario es requerido'),
    
        }),

    form: {
        initial: {
        student_id: '',
        schedule_id: '',
        }
    },

    fields: [
        {
        key: 'student_id',
        label: 'Estudiante',
        type: 'relation',
        display: 'student_id',
        showOnTable: false,

        relation: {
            resource: '/api/v1/students',
            label: 'nombre_completo',
            value: 'id',
        }
        },
        {
        key: 'schedule_id',
        label: 'Horario',
        type: 'relation',
        display: 'teacher_id',
        showOnTable: false,
        cell: ({ row }: any) => {
            const schedule = row.original
            const day = schedule.day_of_week || ''
            const start = formatTime12h(schedule.start_time || '')
            const end = formatTime12h(schedule.end_time || '')
            const subject = schedule.subject_catedra || schedule.catedra || schedule.nombre_catedra || ''
            const teacher = schedule.nombre_profesor || ''
            return `${day} ${start ? `${start} - ${end}` : ''}${subject ? ` | ${subject}` : ''}${teacher ? ` | ${teacher}` : ''}`
        },

        relation: {
            resource: '/api/v1/schedules',
            label: (item: any) => `${item.day_of_week} ${formatTime12h(item.start_time || '')} - ${formatTime12h(item.end_time || '')} | ${item.subject_catedra || item.catedra || item.nombre_catedra || ''} | ${item.nombre_profesor || ''}`,
            value: 'schedule_id',
        }
        },
                {
        key: 'nombre_estudiante',
        label: 'Estudiante',
        showOnCreate: false,
        showOnEdit: false,
        },
        {
        key: 'nombre_representante',
        label: 'Representante',
        showOnCreate: false,
        showOnEdit: false,
        },
        {
        key: 'nombre_catedra',
        label: 'Catedra',
        showOnCreate: false,
        showOnEdit: false,
        },
        {
        key: 'nombre_profesor',
        label: 'Profesor',
        showOnCreate: false,
        showOnEdit: false,
        },
        {
        key: 'day_of_week',
        label: 'Dia',
        showOnCreate: false,
        showOnEdit: false,
        },
        {
        key: 'start_time',
        label: 'Entrada',
        showOnCreate: false,
        showOnEdit: false,
        type: 'time',
        },
        {
        key: 'end_time',
        label: 'Salida',
        type: 'time',
        showOnCreate: false,
        showOnEdit: false,
        },
    ]
}