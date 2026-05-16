<script setup lang="ts">
import { schedulesCrud } from '~/crud/schedulesCrud'
</script>

<template>
    <CrudResource :config="schedulesCrud" />
</template>