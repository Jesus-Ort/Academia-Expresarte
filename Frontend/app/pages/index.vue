<template>
    <!-- HERO -->
    <UPageHero
        title="Expresarte"
        headline="Academia de Música"
        description="Desarrolla tu talento musical con clases dinámicas, profesores apasionados y un espacio diseñado para aprender, crear y expresarte a través de la música."
        :links="links"
    >
        <template #top>
            <UBadge
                label="Inscripciones abiertas"
                color="primary"
                variant="soft"
                class="ml-4 mt-2"
            />
        </template>
    </UPageHero>

    <USeparator />

    <!-- SOBRE NOSOTROS -->
    <UContainer class="py-16">
        <div class="max-w-3xl mx-auto text-center space-y-4">
            <h2 class="text-3xl font-bold">
                Vive la música en Expresarte
            </h2>

            <p class="text-lg text-gray-500 leading-relaxed">
                En Expresarte creemos que la música transforma vidas.
                Nuestra academia está enfocada en brindar formación musical
                para niños, jóvenes y adultos, combinando técnica,
                creatividad y pasión artística.
            </p>
        </div>
    </UContainer>

    <!-- SERVICIOS -->
    <UContainer class="pb-16">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold mb-3">
                Qué puedes aprender
            </h2>

            <p class="text-gray-500">
                Programas diseñados para todos los niveles.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard class="hover:shadow-lg transition">
                <template #header>
                    <div class="flex items-center gap-3">
                        <UIcon
                            name="i-lucide-mic-vocal"
                            class="text-primary text-2xl"
                        />

                        <h3 class="font-semibold text-lg">
                            Canto
                        </h3>
                    </div>
                </template>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Aprende técnica vocal, respiración, afinación e
                    interpretación musical con clases adaptadas a tu nivel.
                </p>
            </UCard>

            <UCard class="hover:shadow-lg transition">
                <template #header>
                    <div class="flex items-center gap-3">
                        <UIcon
                            name="i-lucide-guitar"
                            class="text-primary text-2xl"
                        />

                        <h3 class="font-semibold text-lg">
                            Instrumentos Musicales
                        </h3>
                    </div>
                </template>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Clases de guitarra, piano, batería y más, guiadas por
                    profesores con experiencia artística y pedagógica.
                </p>
            </UCard>

            <UCard class="hover:shadow-lg transition">
                <template #header>
                    <div class="flex items-center gap-3">
                        <UIcon
                            name="i-lucide-book-open"
                            class="text-primary text-2xl"
                        />

                        <h3 class="font-semibold text-lg">
                            Teoría Musical
                        </h3>
                    </div>
                </template>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Comprende el lenguaje de la música: lectura, ritmo,
                    armonía y entrenamiento auditivo.
                </p>
            </UCard>

            <UCard class="hover:shadow-lg transition">
                <template #header>
                    <div class="flex items-center gap-3">
                        <UIcon
                            name="i-lucide-users"
                            class="text-primary text-2xl"
                        />

                        <h3 class="font-semibold text-lg">
                            Clases Grupales
                        </h3>
                    </div>
                </template>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Comparte experiencias musicales, participa en ensambles
                    y desarrolla confianza escénica.
                </p>
            </UCard>

            <UCard class="hover:shadow-lg transition">
                <template #header>
                    <div class="flex items-center gap-3">
                        <UIcon
                            name="i-lucide-calendar-days"
                            class="text-primary text-2xl"
                        />

                        <h3 class="font-semibold text-lg">
                            Horarios Flexibles
                        </h3>
                    </div>
                </template>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Organizamos horarios accesibles para estudiantes,
                    trabajadores y niños en etapa escolar.
                </p>
            </UCard>

            <UCard class="hover:shadow-lg transition">
                <template #header>
                    <div class="flex items-center gap-3">
                        <UIcon
                            name="i-lucide-star"
                            class="text-primary text-2xl"
                        />

                        <h3 class="font-semibold text-lg">
                            Formación Artística
                        </h3>
                    </div>
                </template>

                <p class="text-sm text-gray-500 leading-relaxed">
                    Potencia tu creatividad, disciplina y expresión personal
                    mediante la música y el arte.
                </p>
            </UCard>
        </div>
    </UContainer>

    <USeparator />

    <!-- CÁTEDRAS -->
    <UPageLogos
        title="Nuestras cátedras"
        class="py-12"
        marquee
        :items="[
            'i-lucide-guitar',
            'i-lucide-drum',
            'i-lucide-piano',
            'i-lucide-mic-vocal',
            'i-lucide-disc-3',
            'i-lucide-metronome',
            'i-lucide-music'
        ]"
    />

    <USeparator />

    <!-- CTA -->
    <UPageCTA
        title="Empieza tu camino musical hoy"
        description="Únete a Expresarte y descubre todo tu potencial artístico con clases diseñadas para inspirarte y ayudarte a crecer."
        :links="links"
    />
</template>

<script setup lang="ts">
import guest from '../middlewares/guest'
import type { ButtonProps } from '@nuxt/ui'

definePageMeta({
    middleware: guest
})

useHead({
    title: 'Expresarte'
})

const links = ref<ButtonProps[]>([
    {
        label: 'Contáctanos',
        to: '/contacto',
        icon: 'i-lucide-mail-plus',
        size: 'xl'
    },
])
</script>