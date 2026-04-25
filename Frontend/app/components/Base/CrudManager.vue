<template>
  <BaseTable
    :data="data"
    :columns="columns"
    :loading="loadingTable"
  >
    <template #agregar>
      <UButton @click="openCreate">
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
    <template v-for="field in config.form.fields" :key="field.name">
      <UFormField :label="field.label" :name="field.name">

        <UInput
          v-if="field.type === 'text' || field.type === 'email'"
          v-model="form[field.name]"
          class="w-full"
          :type="field.type"
        />

      </UFormField>
    </template>
  </BaseFormModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  config: any
}>()

const open = ref(false)
const loadingTable = ref(false)
const loadingForm = ref(false)

const data = ref<any[]>([])
const editId = ref<number | null>(null)

const form = reactive({ ...props.config.form.initialState })

const modalTitle = computed(() =>
  editId.value ? `Editar ${props.config.title}` : `Crear ${props.config.title}`
)

const resetForm = () => {
  Object.assign(form, props.config.form.initialState)
  editId.value = null
}

const openCreate = () => {
  resetForm()
  open.value = true
}

const openEdit = (row: any) => {
  Object.assign(form, row)
  editId.value = row.id
  open.value = true
}

const fetchData = async () => {
  loadingTable.value = true

  try {
    const res = await $fetch(props.config.api.list)
    data.value = res
  } finally {
    loadingTable.value = false
  }
}

const handleSubmit = async (values: any) => {
  loadingForm.value = true

  try {
    if (editId.value) {
      await $fetch(props.config.api.update(editId.value), {
        method: 'PUT',
        body: values
      })
    } else {
      await $fetch(props.config.api.create, {
        method: 'POST',
        body: values
      })
    }

    open.value = false
    resetForm()
    await fetchData()

  } finally {
    loadingForm.value = false
  }
}

onMounted(fetchData)
</script>