export const useFormBuilder = (form: any, editId: any, fields: any[]) => {

    const visibleFields = computed(() => {
        return fields.filter((f: any) => {
        if (!editId.value && f.showOnCreate === false) return false
        if (editId.value && f.showOnEdit === false) return false
        return true
        })
    })

    const isDisabled = (f: any) => {
        return editId.value && f.disabledOnEdit
    }

    const onFileChange = (e: Event, field: any) => {
        const target = e.target as HTMLInputElement
        const files = target.files

        if (!files) return

        form[field.key] = field.multiple
        ? Array.from(files)
        : files[0]
    }

    const buildPayload = (values: any) => {
        const hasFile = Object.values(values).some(
        v => v instanceof File || Array.isArray(v)
        )

        if (!hasFile) return values

        const fd = new FormData()

        for (const key in values) {
        const val = values[key]

        if (Array.isArray(val)) {
            val.forEach(file => fd.append(key, file))
        } else {
            fd.append(key, val)
        }
        }

        return fd
    }

    return {
        visibleFields,
        isDisabled,
        onFileChange,
        buildPayload
    }
}