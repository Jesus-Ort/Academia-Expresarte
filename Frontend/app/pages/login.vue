<template>
    <div class="min-h-screen flex items-center justify-center px-4">

        <UCard 
        variant="soft" 
        class="w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-sm" 
        >
            <template #header>
                <div class="text-center">
                <h2 class="text-xl font-semibold">Iniciar Sesión</h2>
                <p class="text-sm text-gray-500 mt-1">
                    Ingresa tus datos.
                </p>
                </div>
            </template>

            <UForm 
                :validate-on="['input','blur', 'change']" 
                :schema="schema" 
                :state="state" 
                class="space-y-4 w-full"
                @submit="onSubmit">
    
                <UFormField label="Correo" name="email">
                    <UInput
                    class="w-full"
                    type="email" 
                    placeholder="Ingresa tu correo" 
                    v-model="state.email" 
                    />
                </UFormField>
    
                <UFormField label="Contraseña" name="password">
                    <div class="relative">
                        <UInput 
                        class="w-full"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Ingresa tu contraseña" 
                        v-model="state.password" 
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
    
                <UButton 
                type="submit" 
                :loading="loading" 
                :disabled="loading"
                block
                >
                    Iniciar Sesión
                </UButton>
                </UForm>
                <template #footer>
                    <p class="text-sm text-center text-gray-500">
                    ¿Quieres ser parte de Expresarte?
                    <NuxtLink
                        to="/contacto"
                        class="text-primary font-medium hover:underline block"
                    >
                        Contáctanos!.
                    </NuxtLink>
                    </p>
                </template>

        </UCard>

    </div>
</template>

<script setup lang="ts">
import guest from '../middlewares/guest'
definePageMeta({
    middleware: guest
})

import * as yup from 'yup'
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
import { useAuth } from '~/composables/useAuth'

const { $api } = useNuxtApp()
const toast = useToast()

const loading = ref(false)
const showPassword = ref(false)

// Esquema Yup
const schema = yup.object({
    email: yup
    .string()
    .email('Correo electrónico no válido')
    .required('Se requiere correo electrónico'),
    password: yup
    .string()
    .matches(/^[^<>[\]{}^`]+$/, 'No se permiten los caracteres < > [ ] { } ` ^')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Se requiere contraseña'),
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: '',
    password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        loading.value = true

        const { isLogged } = useAuth()
        const res = await $api.post('/api/v1/auth/login', event.data)

        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)

        isLogged.value = true

        toast.add({
        title: 'Sesión iniciada',
        description: 'Ahora puedes usar la app.',
        color: 'success'
        })

        await new Promise(r => setTimeout(r, 800))
        await navigateTo('/home')

    } catch (error: any) {

        const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'No se pudo iniciar la sesión'

        toast.add({
        title: 'Error',
        description: message,
        color: 'error'
        })
    } finally {
        loading.value = false
    }
}
</script>
