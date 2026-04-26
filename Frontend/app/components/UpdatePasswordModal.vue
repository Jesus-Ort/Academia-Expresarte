<template>
    <UModal
        v-model:open="open"
        title="Actualizar contraseña"
        description="Ingresa tu nueva contraseña"
    >
        <template #body>
        <UForm
            :validate-on="['input','blur','change']"
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
        >
                <UFormField label="Contraseña" name="newPassword">
                    <div class="relative">
                        <UInput 
                        class="w-full"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Ingresa la contraseña" 
                        v-model="state.newPassword" 
                        />
                        <button
                            type="button"
                            aria-label="Mostrar u ocultar contraseña"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            @click="showPassword = !showPassword"
                        >
                            <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" size="18" />
                        </button>
                    </div>
                </UFormField>

                <UFormField label="Confirmar Contraseña" name="confirmPassword">
                    <div class="relative">
                        <UInput
                        class="w-full"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        placeholder="Repite la contraseña"
                        v-model="state.confirmPassword"
                        />
                        <button
                            type="button"
                            aria-label="Mostrar u ocultar confirmar contraseña"
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            @click="showConfirmPassword = !showConfirmPassword"
                        >
                            <UIcon :name="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" size="18" />
                        </button>
                    </div>
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
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const state = reactive<{ newPassword: string; confirmPassword: string }>({
    newPassword: '',
    confirmPassword: ''
})

const schema = yup.object({
    newPassword: yup
        .string()
        .trim()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(/^\S+$/, 'No se permiten espacios')
        .matches(/^[^<>\[\]{}^`]+$/, 'Caracteres no permitidos')
        .required('Se requiere contraseña'),

    confirmPassword: yup
        .string()
        .required('Confirma tu contraseña')
        .trim()
        .oneOf([yup.ref('newPassword')], 'Las contraseñas deben coincidir')
})

async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        loading.value = true

        await api.put('/api/v1/users/password', { newPassword: state.newPassword })

        toast.add({ title: 'Éxito', description: 'Contraseña actualizada', color: 'success' })
        open.value = false
        state.newPassword = ''
        state.confirmPassword = ''
        emit('updated')
    } catch (err: any) {
        toast.add({ title: 'Error', description: err?.response?.data?.message || 'Error al actualizar', color: 'error' })
    } finally {
        loading.value = false
    }
}
</script>