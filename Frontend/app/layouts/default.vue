<template>
    <UHeader title="Expresarte" to="/" :toggle="false">
        <template #right>

        <!-- Dark mode -->
        <UTooltip text="Modo de color">
            <UColorModeButton/>
        </UTooltip>
        
        <!-- si NO hay sesión -->
        <!-- Login -->
        <UButton
            v-if="!isLogged"
            color="neutral"
            variant="solid"
            to="/login"
        >
            Iniciar sesión
        </UButton>

        <!-- si hay sesión -->
        <!-- Menú -->
        <UDropdownMenu
            v-if="isLogged"
            arrow
            size="lg"
            :items="items"
            :ui="{ content: 'w-48' }"
        >
            <UButton
            icon="i-heroicons-bars-3"
            color="neutral"
            variant="outline"
            />
        </UDropdownMenu>

        </template>

    </UHeader>

    <UMain>
        <slot/>
    </UMain>

    <UFooter>
        <template #default>
            <p class="text-muted text-sm">Jesús Ortega | Copyright © {{ new Date().getFullYear() }}</p>
        </template>
    </UFooter>

</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAuth } from '~/composables/useAuth'

const { isLogged, checkAuth, logout } = useAuth()

const items: DropdownMenuItem[][] = [
    [
        {
        label: 'Inicio',
        icon: 'i-heroicons-home',
        to: '/home'
        },
        {
        label: 'Transacciones',
        icon: 'i-heroicons-arrows-right-left',
        to: '/transactions'
        }
    ],
    [
        {
        label: 'Usuarios',
        icon: 'i-heroicons-user',
        to: '/profiles'
        },
        {
        label: 'Estudiantes',
        icon: 'i-heroicons-user',
        to: '/students'
        },
    ],
    [
        {
        label: 'Configuración',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/settings'
        }
    ],
    [
        {
        label: 'Cerrar sesión',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        color: 'error',
        onSelect:  logout
        }
    ]
]

onMounted(() => {
    checkAuth()
})

</script>