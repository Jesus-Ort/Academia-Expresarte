<script setup lang="ts">
import { teacherSubjectsCrud } from '~/crud/teacherSubjectsCrud'
</script>

<template>
    <CrudResource :config="teacherSubjectsCrud" />
</template>