<template>
    <UModal
        v-model:open="open"
        title="Actualizar nombre de usuario"
        description="Ingresa tu nuevo nombre de usuario"
    >
        <template #body>
        <UForm
            :validate-on="['input','blur','change']"
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
        >
            <UFormField label="Nuevo nombre de usuario" name="nombre_completo">
            <UInput
                v-model="state.nombre_completo"
                placeholder="Nombre de usuario"
                class="w-full"
            />
            </UFormField>

            <div class="flex justify-end gap-2">
            <UButton
                label="Cancelar"
                variant="outline"
                color="error"
                @click="open = false"
            />
            <UButton
                label="Actualizar"
                type="submit"
                color="success"
                :loading="loading"
            />
            </div>
        </UForm>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
import { useApi } from '~/composables/useApi';

const emit = defineEmits(['updated'])
const { api } = useApi()
const toast = useToast()

const open = defineModel<boolean>('open')
const loading = ref(false)

const state = reactive<{ nombre_completo: string }>({ nombre_completo: '' })

const schema = yup.object({
    nombre_completo: yup
    .string()
    .min(5,"Debe contener minimo 5 letras")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios')
    .required('El nombre es requerido')
    })

    async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        loading.value = true

        await api.put('/api/v1/users/name', event.data)

        toast.add({ title: 'Éxito', description: 'Nombre de usuario actualizado', color: 'success' })
        open.value = false
        state.nombre_completo = ''
        emit('updated')
    } catch (err: any) {
        toast.add({ title: 'Error', description: err?.response?.data?.message || 'Error al actualizar', color: 'error' })
    } finally {
        loading.value = false
    }
}
</script>