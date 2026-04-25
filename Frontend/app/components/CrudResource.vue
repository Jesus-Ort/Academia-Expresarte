<template>
  <BaseTable
    :data="data"
    :columns="columns"
    :loading="loadingTable"
  >
    <template #agregar>
      <UButton
        color="primary"
        icon="i-heroicons-plus"
        @click="openCreate"
      >
        Nuevo {{ config.title }}
      </UButton>
    </template>
  </BaseTable>

  <BaseFormModal
    v-model:open="open"
    :title="modalTitle"
    :state="form"
    :schema="config.schema"
    :loading="loadingForm"
    submit-text="Guardar"
    @submit="handleSubmit"
  >
    <template v-for="f in config.fields" :key="f.key">
      <UFormField :label="f.label" :name="f.key">
        <UInput v-model="form[f.key]" class="w-full" />
      </UFormField>
    </template>
  </BaseFormModal>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { useApi } from '~/composables/useApi';

const { api } = useApi()

const props = defineProps<{
  config: any
}>()

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

const form = reactive({ ...props.config.form.initial })

const modalTitle = computed(() =>
  editId.value
    ? `Editar ${props.config.title}`
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
  } finally {
    loadingTable.value = false
  }
}

// ----------------------
// CREATE
// ----------------------
const openCreate = () => {
  editId.value = null
  Object.assign(form, props.config.form.initial)
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
    if (!editId.value) {
      await api.post(resource.value.create, values)
    } else {
      await api.put(resource.value.update(editId.value), values)
    }

    open.value = false
    await load()

  } finally {
    loadingForm.value = false
  }
}

// ----------------------
// COLUMNS AUTO (simple)
// ----------------------
const columns = computed(() => {
  const base = props.config.fields.map((f: any) => ({
    accessorKey: f.key,
    header: f.label
  }))

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
            await api.delete(resource.value.delete(row.original.id))
            await load()
          }
        })
      ])
    }
  })

  return base
})

onMounted(load)
</script>