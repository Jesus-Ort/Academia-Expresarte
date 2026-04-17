<template>
    <UPageHero
        title="Expresarte"
        headline="Academia de música."
        description="Descripción."
        :links="links"
    />

    <USeparator />

    <UContainer class="py-12 mb-8">

        <h2 class="text-2xl font-semibold text-center mb-6">
        Qué puedes hacer en Expresarte
        </h2>

        <div class="grid md:grid-cols-3 gap-6">

        <UCard>
            <h3 class="font-semibold mb-2">Expresarte</h3>
            <p class="text-sm text-gray-500">
            Aprender a cantar.
            </p>
        </UCard>

        <UCard>
            <h3 class="font-semibold mb-2">Expresarte</h3>
            <p class="text-sm text-gray-500">
            Aprender a tocar un instrumento.
            </p>
        </UCard>

        <UCard>
            <h3 class="font-semibold mb-2">Expresarte</h3>
            <p class="text-sm text-gray-500">
            Aprender sobre teoria musical.
            </p>
        </UCard>

        </div>

    </UContainer>

    <UPageCTA
    title="Empieza tu camino como artista hoy"
    description="Consultanos!."
    :links="links"
    />

    <UPageLogos
    title="Cátedras"
    class="mt-8 mb-8"
    marquee
    :items="[
        'i-lucide-guitar',
        'i-lucide-drum',
        'i-lucide-piano',
        'i-lucide-mic-vocal',
        'i-lucide-disc-3',
        'i-lucide-metronome',
        'i-lucide-music',
    ]"
    />

    <USeparator />

</template>

<script setup lang="ts">
import guest from '../middlewares/guest'
definePageMeta({
    middleware: guest
})

import type { ButtonProps } from '@nuxt/ui'

const links = ref<ButtonProps[]>([
    {
        label: 'Contáctanos.',
        to: '/contacto',
        icon: 'i-lucide-mail-plus'
    }
])
</script>