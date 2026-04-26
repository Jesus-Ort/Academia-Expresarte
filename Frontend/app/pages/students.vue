<script setup lang="ts">
import { studentsCrud } from '~/crud/studentsCrud'
</script>

<template>
    <CrudResource :config="studentsCrud" />
</template>