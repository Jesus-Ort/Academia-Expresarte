export type FieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'textarea'
    | 'select'
    | 'date'
    | 'checkbox'
    | 'switch'
    | 'file'

export type FieldOption = {
    label: string
    value: any
    }

    export type FieldConfig = {
    key: string
    label: string
    type?: FieldType

    placeholder?: string
    options?: FieldOption[]

    required?: boolean

    showOnCreate?: boolean
    showOnEdit?: boolean
    disabledOnEdit?: boolean

    multiple?: boolean
    accept?: string
}