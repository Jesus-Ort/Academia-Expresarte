<script setup lang="ts">
import { usersCrud } from '~/crud/usersCrud'
</script>

<template>
    <CrudResource :config="usersCrud" />
</template>