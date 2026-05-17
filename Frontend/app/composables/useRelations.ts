import { useApi } from '~/composables/useApi'

export const useRelations = () => {

    const { api } = useApi()

    const cache = reactive<Record<string, any[]>>({})

    const load = async (field: any, form: any) => {
        const url =
        typeof field.relation.resource === 'function'
            ? field.relation.resource(form)
            : field.relation.resource

        if (!url) return []

        if (cache[url]) return cache[url]

        const res = await api.get(url)

        cache[url] = res.data ?? res

        return cache[url]
    }

    const getRelationLabel = (field: any, item: any) => {
        if (typeof field.relation.label === 'function') {
            return field.relation.label(item)
        }

        return item[field.relation.label]
    }

    const getRelationValue = (field: any, item: any) => {
        if (typeof field.relation.value === 'function') {
            return field.relation.value(item)
        }

        return item[field.relation.value]
    }

    const getOptions = async (field: any, form: any) => {
        const data = await load(field, form)

        return data.map((item: any) => ({
        label: getRelationLabel(field, item),
        value: getRelationValue(field, item)
        }))
    }

    return { getOptions }
}