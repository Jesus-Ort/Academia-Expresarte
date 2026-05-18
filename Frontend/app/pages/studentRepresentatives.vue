<script setup lang="ts">
useHead({
    title: 'Representados'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})
import { studentRepresentativesCrud } from '~/crud/studentRepresentativesCrud'
</script>

<template>
    <CrudResource :config="studentRepresentativesCrud" />
</template>