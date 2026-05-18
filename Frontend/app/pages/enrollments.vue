<script setup lang="ts">
useHead({
    title: 'Clases'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})
import { enrollmentsCrud } from '~/crud/enrollmentsCrud'
</script>

<template>
    <CrudResource :config="enrollmentsCrud" />
</template>