<script setup lang="ts">
import { teachersCrud } from '~/crud/teachersCrud'
</script>

<template>
    <CrudResource :config="teachersCrud" />
</template>