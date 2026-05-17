<script setup lang="ts">
import { enrollmentsCrud } from '~/crud/enrollmentsCrud'
</script>

<template>
    <CrudResource :config="enrollmentsCrud" />
</template>