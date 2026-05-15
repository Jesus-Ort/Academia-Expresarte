<template>
  <BaseTable
    :data="data"
    :columns="columns"
    :loading="loadingTable"
  >
    <template #agregar v-if="!config.disableCreate">
      <UButton
        color="primary"
        icon="i-heroicons-plus"
        @click="openCreate"
      >
        Agregar {{ config.title }}
      </UButton>
    </template>
  </BaseTable>

  <BaseFormModal
    v-model:open="open"
    :title="modalTitle"
    :state="form"
    :schema="config.schema"
    :loading="loadingForm"
    :submitText="submitLabel"
    @submit="handleSubmit"
  >
    <FormBuilder
      :fields="config.fields"
      :form="form"
      :editId="editId"
    />
  </BaseFormModal>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { useApi } from '~/composables/useApi';
import { useFormBuilder } from '~/composables/useFormBuilder'
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
import FormBuilder from './Base/FormBuilder.vue';

const { api } = useApi()

const props = defineProps<{
  config: any
}>()

const toast = useToast()

const resource = computed(() => {
  if (!props.config?.apiBase) {
    throw new Error('CrudResource: apiBase no definido')
  }
  return props.config.apiBase
})

const open = ref(false)

const loadingTable = ref(false)
const loadingForm = ref(false)

const data = ref<any[]>([])
const editId = ref<string | null>(null)

const form = reactive({})

const resetForm = () => {
  Object.assign(form, props.config.form.initial)
}

const { buildPayload } = useFormBuilder(form, editId, props.config.fields)

const modalTitle = computed(() =>
  editId.value
    ? `Editar ${props.config.title}`
    : `Crear ${props.config.title}`
)

const submitLabel = computed(() =>
  editId.value
    ? `Actualizar ${props.config.title}`
    : `Crear ${props.config.title}`
)

// ----------------------
// LOAD LIST
// ----------------------
const load = async () => {
  if (!resource.value.list) return
  loadingTable.value = true

  try {    
    const res = await api.get(resource.value.list)

    data.value = res.data ?? res
    
    toast.add({ title: 'Éxito', description: 'Lista cargada correctamente', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Error', description: err?.response?.data?.message || 'Error al cargar la lista', color: 'error' })
  } finally {
    loadingTable.value = false
  }
}

// ----------------------
// CREATE
// ----------------------
const openCreate = () => {
  if (props.config.disableCreate) return

  editId.value = null
  resetForm()
  open.value = true
}
// ----------------------
// EDIT
// ----------------------
const openEdit = (row: any) => {
  editId.value = row.id
  Object.assign(form, row)
  open.value = true
}

// ----------------------
// SUBMIT
// ----------------------
const handleSubmit = async (values: any) => {
  loadingForm.value = true

  try {
    const payload = buildPayload(values)

    if (!editId.value) {
      await api.post(resource.value.create, payload)
      toast.add({ title: 'Éxito', description: `${props.config.title} creado correctamente`, color: 'success' })
    } else {
      await api.patch(resource.value.update(editId.value), payload)
      toast.add({ title: 'Éxito', description: `${props.config.title} actualizado correctamente`, color: 'success' })
    }

    open.value = false
    await load()

  } catch (err: any) {
    toast.add({ title: 'Error', description: err?.response?.data?.message || `Error al guardar ${props.config.title}`, color: 'error' })
  } finally {
    loadingForm.value = false
  }
}

const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

// ----------------------
// COLUMNS AUTO (simple)
// ----------------------
const columns = computed(() => {
  const base = props.config.fields.map((f: any) => {

    if (f.display) {
      return {
        id: f.key,
        header: f.label,
        cell: ({ row }: any) =>
          getValue(row.original, f.display)
      }
    }

    return {
      accessorKey: f.key,
      header: f.label
    }
  })

  // Acciones
  base.push({
    id: 'actions',
    cell: ({ row }: { row: Row<any> }) => {
      return h('div', { class: 'flex justify-end gap-2' }, [
        h(UButton, {
          size: 'xs',
          variant: 'ghost',
          icon: 'i-lucide-pen',
          onClick: () => openEdit(row.original)
        }),
        h(UButton, {
          size: 'xs',
          variant: 'ghost',
          color: 'error',
          icon: 'i-lucide-trash',
          onClick: async () => {
            try {
              await api.delete(resource.value.delete(row.original.id))
              toast.add({ title: 'Éxito', description: `${props.config.title} eliminado correctamente`, color: 'success' })
              await load()
            } catch (err: any) {
              toast.add({ title: 'Error', description: err?.response?.data?.message || `Error al eliminar ${props.config.title}`, color: 'error' })
            }
          }
        })
      ])
    }
  })

  return base
})

onMounted(() => {
  resetForm()
  load()
})
</script>