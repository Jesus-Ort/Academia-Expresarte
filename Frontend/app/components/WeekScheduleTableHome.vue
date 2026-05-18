<template>
    <UContainer class="container max-w-6xl mx-auto mt-10 px-4">
        <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-semibold text-center">Horario de la semana</h2>
        </div>

        <div class="mt-6">
        <BaseTable :data="rows" :columns="columns" :loading="loading" />
        </div>
    </UContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useApi } from '~/composables/useApi'
import BaseTable from './Base/BaseTable.vue'

const { api } = useApi()
const rows = ref<any[]>([])
const loading = ref(true)

const formatTime12h = (time: string) => {
    if (!time) return ''
    try {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('es-ES', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    } catch (e) {
        return time
    }
}

const formatScheduleLabel = (row: any) => {
    const subject = row.subject_catedra || row.nombre_materia || row.nombre_catedra || row.nombre || row.subject || ''
    const teacher = row.nombre_profesor || row.nombre_docente || row.nombre_completo || row.teacher || ''
    const start = formatTime12h(row.start_time || '')
    const end = formatTime12h(row.end_time || '')
    const time = start && end ? `${start} - ${end}` : start || end || ''
    return { subject, teacher, time }
}

const columns = computed(() => [
    { id: 'day_of_week', header: 'Día', accessorKey: 'day_of_week' },
    {
        id: 'subject',
        header: 'Materia',
        cell: ({ row }: any) => formatScheduleLabel(row.original).subject
    },
    {
        id: 'teacher',
        header: 'Profesor',
        cell: ({ row }: any) => formatScheduleLabel(row.original).teacher
    },
    {
        id: 'time',
        header: 'Horario',
        cell: ({ row }: any) => formatScheduleLabel(row.original).time
    }
])

const loadSchedule = async () => {
    loading.value = true
    try {
        const res: any = await api.get('/api/v1/schedules')
        rows.value = Array.isArray(res?.data) ? res.data : res?.data ?? []
    } catch (err) {
        console.error('Error cargando horario semanal:', err)
        rows.value = []
    } finally {
        loading.value = false
    }
}

onMounted(loadSchedule)
</script>
