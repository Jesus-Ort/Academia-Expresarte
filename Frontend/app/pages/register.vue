<template>
    <div class="min-h-screen flex items-center justify-center px-4">

        <UCard 
        variant="soft" 
        class="w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-sm" 
        >
            <template #header>
                <div class="text-center">
                <h2 class="text-xl font-semibold">Registrar Usuario</h2>
                <p class="text-sm text-gray-500 mt-1">
                    Ingresa los datos del usuario.
                </p>
                </div>
            </template>

            <UForm 
                :validate-on="['input','blur', 'change']" 
                :schema="schema" 
                :state="state" 
                class="space-y-4 w-full"
                @submit="onSubmit">

                <UFormField label="Nombre Completo" name="nombre_completo">
                    <UInput class="w-full" placeholder="Ingresa el nombre" v-model="state.nombre_completo" />
                </UFormField>

                <UFormField label="Cédula" name="cedula">
                    <UInput class="w-full" placeholder="Ingresa la cédula" v-model="state.cedula" />
                </UFormField>

                <UFormField label="Fecha de nacimiento" name="fecha_nacimiento">
                    <UInput type="date" class="w-full" placeholder="Ingresa la fecha de nacimiento" v-model="state.fecha_nacimiento" />
                </UFormField>

                <UFormField label="Teléfono" name="telefono">
                    <UInput class="w-full" placeholder="Ingresa el número de teléfono" v-model="state.telefono" />
                </UFormField>

                <UFormField label="Dirección" name="direccion">
                    <UInput class="w-full" placeholder="Ingresa la dirección" v-model="state.direccion" />
                </UFormField>
    
                <UFormField label="Correo" name="email">
                    <UInput
                    class="w-full"
                    type="email" 
                    placeholder="Ingresa el correo" 
                    v-model="state.email" 
                    />
                </UFormField>
    
                <UFormField label="Contraseña" name="password">
                    <div class="relative">
                        <UInput 
                        class="w-full"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Ingresa la contraseña" 
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

                <UFormField label="Confirmar Contraseña" name="confirm_password">
                    <div class="relative">
                        <UInput
                        class="w-full"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        placeholder="Repite la contraseña"
                        v-model="state.confirm_password"
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
    
                <UButton 
                type="submit" 
                :loading="loading" 
                :disabled="loading"
                block
                >
                    Registrarme
                </UButton>
                </UForm>
                <template #footer>
                    <p class="text-sm text-center text-gray-500">
                    Verifica los datos del usuario.
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
import { useToast } from '#imports'
const config = useRuntimeConfig()

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Esquema Yup
const schema = yup.object({
    nombre_completo: yup
        .string()
        .trim()
        .min(5, "Debe contener mínimo 5 letras")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios')
        .required('El nombre es requerido'),

    email: yup
        .string()
        .trim()
        .email('Correo electrónico no válido')
        .required('Se requiere correo electrónico'),

    password: yup
        .string()
        .trim()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(/^[^\s<>[\]{}^`]+$/, 'Caracteres no permitidos o espacios')
        .required('Se requiere contraseña'),

    confirm_password: yup
        .string()
        .trim()
        .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Confirma tu contraseña'),

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
        .required('Se requiere la dirección')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
    nombre_completo: '',
    email: '',
    password: '',
    confirm_password: '',
    cedula: '',
    fecha_nacimiento: '',
    telefono: '',
    direccion: '',
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        loading.value = true

        const data = {
            nombre_completo: event.data.nombre_completo.trim(),
            email: event.data.email.trim(),
            password: event.data.password,
            cedula: event.data.cedula.trim(),
            fecha_nacimiento: event.data.fecha_nacimiento, // ya validado como string ISO
            telefono: event.data.telefono.trim(),
            direccion: event.data.direccion.trim(),
        }

        await $fetch('/api/v1/auth/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
        })

        toast.add({
            title: 'Registro exitoso',
            description: 'Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.',
            color: 'success'
        })

        await new Promise(r => setTimeout(r, 1200))
        await navigateTo('/login')

    } catch (error: any) {
        const message =
            error?.data?.message ||
            error?.data?.error ||
            error?.message ||
            'No se pudo registrar'

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
