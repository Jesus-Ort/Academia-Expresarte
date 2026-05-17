<script setup lang="ts">
    import { useFormBuilder } from '~/composables/useFormBuilder';
    import { useRelations } from '~/composables/useRelations'

    const props = defineProps<{
    fields: any[]
    form: Record<string, any>
    editId: string | number | null | undefined
    }>()

    // 🔥 convertir a ref reactivo
    const editIdRef = toRef(props, 'editId')

    const { visibleFields, isDisabled, onFileChange } =
    useFormBuilder(props.form, editIdRef, props.fields)

    const { getOptions } = useRelations()

    const relationOptions = reactive<Record<string, any[]>>({})
    const loadingRelations = reactive<Record<string, boolean>>({})

    const form = props.form

    const loadRelation = async (field: any) => {
        loadingRelations[field.key] = true

        try {
            relationOptions[field.key] = await getOptions(field, form)
        } finally {
            loadingRelations[field.key] = false
        }
    }

    onMounted(() => {
        props.fields.forEach(field => {
            if (field.type === 'relation') {
            loadRelation(field)
            }
        })
    })
</script>

<template>
    <template v-for="f in visibleFields" :key="f.key">
        <UFormField :label="f.label" :name="f.key">

        <!-- INPUT -->
        <UInput
            v-if="['text','email','password'].includes(f.type || 'text')"
            v-model="form[f.key]"
            :type="f.type || 'text'"
            :placeholder="f.placeholder || `Ingrese ${f.label}`"
            :disabled="isDisabled(f)"
            class="w-full"
        />

        <!-- TEXTAREA -->
        <UTextarea
            v-else-if="f.type === 'textarea'"
            v-model="form[f.key]"
            class="w-full"
        />

        <!-- SELECT -->
        <USelect
            v-else-if="f.type === 'select'"
            v-model="form[f.key]"
            :items="f.options"
            :multiple="f.multiple"
            class="w-full"
        />

        <!-- RELATIONS -->
        <USelect
            v-else-if="f.type === 'relation'"
            v-model="form[f.key]"
            :items="relationOptions[f.key]"
            :loading="loadingRelations[f.key]"
            class="w-full"
        />

        <!-- DATE -->
        <UInput
            v-else-if="f.type === 'date'"
            type="date"
            v-model="form[f.key]"
            class="w-full"
        />

        <!-- TIME -->
        <UInput
            v-else-if="f.type === 'time'"
            type="time"
            v-model="form[f.key]"
            class="w-full"
        />

        <!-- CHECKBOX -->
        <UCheckbox
            v-else-if="f.type === 'checkbox'"
            v-model="form[f.key]"
            :label="f.label"
        />

        <!-- SWITCH -->
        <USwitch
            v-else-if="f.type === 'switch'"
            v-model="form[f.key]"
        />

        <!-- FILE -->
        <input
            v-else-if="f.type === 'file'"
            type="file"
            :accept="f.accept"
            :multiple="f.multiple"
            @change="onFileChange($event, f)"
            class="w-full text-sm"
        />

        </UFormField>
    </template>
</template>