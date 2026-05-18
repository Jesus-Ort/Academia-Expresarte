<script setup lang="ts">
useHead({
    title: 'Profesores'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})
import { teachersCrud } from '~/crud/teachersCrud'
</script>

<template>
    <CrudResource :config="teachersCrud" />
</template>