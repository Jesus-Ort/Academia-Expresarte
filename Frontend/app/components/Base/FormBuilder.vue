<script setup lang="ts">
    import { useFormBuilder } from '~/composables/useFormBuilder';
    const props = defineProps<{
    fields: any[]
    form: Record<string, any>
    editId: string | null
    }>()

    // 🔥 convertir a ref reactivo
    const editIdRef = toRef(props, 'editId')

    const { visibleFields, isDisabled, onFileChange } =
    useFormBuilder(props.form, editIdRef, props.fields)
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
            :options="f.options"
            :multiple="f.multiple"
            class="w-full"
        />

        <!-- DATE -->
        <UInput
            v-else-if="f.type === 'date'"
            type="date"
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