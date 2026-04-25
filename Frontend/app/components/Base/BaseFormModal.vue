<template>
    <UModal
        v-model:open="open"
        :ui="{
        overlay: 'bg-black/40 backdrop-blur-sm',
        wrapper: 'flex items-center justify-center',
        container: 'p-4',
        base: 'bg-transparent shadow-none'
        }"
    >
        <template #content>
        <div>

            <UCard variant="soft" class="shadow-xl border border-gray-200 dark:border-gray-800">

            <template #header>
                <div class="text-center">
                <h2 class="text-xl font-semibold">
                    {{ title }}
                </h2>

                <p v-if="description" class="text-sm text-gray-500 mt-1">
                    {{ description }}
                </p>
                </div>
            </template>

            <UForm
                :state="state"
                :schema="schema"
                class="space-y-4"
                @submit="handleSubmit"
            >
                <slot :state="state" />

                <div class="flex gap-2 justify-center pt-4 border-t border-gray-200 dark:border-gray-800">
                
                <UButton
                    color="neutral"
                    variant="soft"
                    @click="open = false"
                >
                    Cancelar
                </UButton>

                <UButton
                    type="submit"
                    :loading="loading"
                >
                    {{ submitText || 'Guardar' }}
                </UButton>

                </div>
            </UForm>

            <template v-if="$slots.footer" #footer>
                <slot name="footer" />
            </template>

            </UCard>

        </div>
        </template>

    </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const open = defineModel<boolean>('open')

defineProps<{
    title?: string
    description?: string
    state: Record<string, any>
    schema?: any
    loading?: boolean
    submitText?: string
}>()

const emit = defineEmits<{
    (e: 'submit', payload: any): void
}>()

const handleSubmit = (event: FormSubmitEvent<any>) => {
    emit('submit', event.data)
}
</script>