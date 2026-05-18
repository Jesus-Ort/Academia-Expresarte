<script setup lang="ts">
useHead({
    title: 'Estudiantes'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})
import { studentsCrud } from '~/crud/studentsCrud'
</script>

<template>
    <CrudResource :config="studentsCrud" />
</template>