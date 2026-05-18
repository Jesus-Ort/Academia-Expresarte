<script setup lang="ts">
useHead({
    title: 'Catedras'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})
import { subjectsCrud } from '~/crud/subjectsCrud'
</script>

<template>
    <CrudResource :config="subjectsCrud" />
</template>