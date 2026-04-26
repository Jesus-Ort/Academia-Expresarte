<template>
    <UModal
        v-model:open="open"
        title="Actualizar correo"
        description="Ingresa tu nuevo correo electrónico"
    >
        <template #body>
        <UForm
            :validate-on="['input','blur','change']"
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
        >
            <UFormField label="Nuevo correo" name="email">
            <UInput
                v-model="state.email"
                type="email"
                placeholder="ejemplo@correo.com"
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

const state = reactive<{ email: string }>({ email: '' })

const schema = yup.object({
    email: yup
    .string()
    .email('Correo electrónico no válido')
    .required('Se requiere correo electrónico')
    })

    async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        loading.value = true

        await api.put('/api/v1/users/email', event.data)

        toast.add({ title: 'Éxito', description: 'Correo actualizado', color: 'success' })
        open.value = false
        state.email = ''
        emit('updated')
    } catch (err: any) {
        toast.add({ title: 'Error', description: err?.response?.data?.message || 'Error al actualizar', color: 'error' })
    } finally {
        loading.value = false
    }
}
</script>