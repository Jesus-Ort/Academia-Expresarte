export const useRelations = () => {

    const cache = reactive<Record<string, any[]>>({})

    const load = async (field: any, form: any) => {
        const url =
        typeof field.relation.resource === 'function'
            ? field.relation.resource(form)
            : field.relation.resource

        if (!url) return []

        if (cache[url]) return cache[url]

        const res = await $fetch(url)

        cache[url] = res.data ?? res

        return cache[url]
    }

    const getOptions = async (field: any, form: any) => {
        const data = await load(field, form)

        return data.map((item: any) => ({
        label: item[field.relation.label],
        value: item[field.relation.value]
        }))
    }

    return { getOptions }
}