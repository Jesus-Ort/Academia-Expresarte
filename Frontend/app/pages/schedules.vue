<script setup lang="ts">
useHead({
    title: 'Horarios'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})
import { schedulesCrud } from '~/crud/schedulesCrud'
</script>

<template>
    <CrudResource :config="schedulesCrud" />
</template>