<template>
    <UContainer class="container max-w-6xl mx-auto mt-10 px-4 space-y-6">
        <h2 class="text-2xl font-semibold text-center">Resumen</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard variant="subtle" v-for="k in keysOrder" :key="k" class="card p-4">
                <div class="text-center">
                    <p class="text-sm text-gray-500">{{ fieldMap[k] }}</p>
                    <USkeleton v-if="pendingTotals" class=" h-6 w-24 mx-auto my-2"></USkeleton>
                    <p v-else class="text-xl font-bold">{{ formatNumber(totals[k]) }}</p>
                </div>
            </UCard>
        </div>
    </UContainer>

    <WeekScheduleTableHome />
</template>

<script setup lang="ts">
useHead({ title: 'Inicio' })
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})

import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'
import WeekScheduleTableHome from '~/components/WeekScheduleTableHome.vue'

const { api } = useApi()
const pendingTotals = ref(true)
const totals = ref<Record<string, any>>({})

const fieldMap: Record<string, string> = {
    total_students: 'Estudiantes',
    total_teachers: 'Profesores',
    total_subjects: 'Catedras',
    total_schedules: 'Horarios',
    total_enrollments: 'Inscripciones',
    total_representatives: 'Representantes'
}

const keysOrder = [
    'total_representatives',
    'total_students',
    'total_teachers',
    'total_subjects',
    'total_schedules',
    'total_enrollments',
]

const formatNumber = (v: any) => {
    const n = Number(v ?? 0)
    return new Intl.NumberFormat('es-ES').format(n)
}

const loadDashboard = async () => {
    pendingTotals.value = true
    try {
        const res: any = await api.get('/api/v1/dashboard')
        const row = Array.isArray(res?.data) ? res.data[0] : res?.data
        totals.value = row || {}
    } catch (err) {
        console.error('Error cargando dashboard:', err)
        totals.value = {}
    } finally {
        pendingTotals.value = false
    }
}

onMounted(loadDashboard)
</script>
