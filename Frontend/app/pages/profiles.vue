<script setup lang="ts">
useHead({
    title: 'Representantes'
})
import auth from '../middlewares/auth'
definePageMeta({
    middleware: auth
})

import { usersCrud } from '~/crud/usersCrud'

</script>

<template>
    <CrudResource :config="usersCrud" />
</template>