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
import { computed, onMounted } from 'vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useAuth } from '~/composables/useAuth'

const { isLogged, isAdmin, checkAuth, logout } = useAuth()

const items = computed<DropdownMenuItem[][]>(() => {
    const menuGroups = [
        {
            items: [
                {
                label: 'Inicio',
                icon: 'i-heroicons-home',
                to: '/home'
                }
            ]
        },
        {
            adminOnly: true,
            items: [
                {
                label: 'Representantes',
                icon: 'i-heroicons-user',
                to: '/profiles'
                },
                {
                label: 'Estudiantes',
                icon: 'i-heroicons-user',
                to: '/students'
                },
                {
                label: 'Profesores',
                icon: 'i-heroicons-user',
                to: '/teachers'
                },
                {
                label: 'Representados',
                icon: 'i-heroicons-users',
                to: '/studentRepresentatives'
                },
                {
                label: 'Catedras',
                icon: 'i-heroicons-pencil-square',
                to: '/subjects'
                },
                {
                label: 'Horarios',
                icon: 'i-heroicons-calendar-days',
                to: '/schedules'
                },
                {
                label: 'Clases',
                icon: 'i-heroicons-book-open',
                to: '/enrollments'
                }
            ]
        }
    ]

    const menu: DropdownMenuItem[][] = []

    menuGroups.forEach(group => {
        if (group.adminOnly && !isAdmin.value) return
        menu.push(group.items)
    })

    menu.push([
        {
        label: 'Configuración',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/settings'
        }
    ])
    menu.push([
        {
        label: 'Cerrar sesión',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        color: 'error',
        onSelect:  logout
        }
    ])

    return menu
})

onMounted(() => {
    checkAuth()
})

</script>