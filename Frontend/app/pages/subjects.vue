<script setup lang="ts">
import { subjectsCrud } from '~/crud/subjectsCrud'
</script>

<template>
    <CrudResource :config="subjectsCrud" />
</template>