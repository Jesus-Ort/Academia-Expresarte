<script setup lang="ts">
import { studentRepresentativesCrud } from '~/crud/studentRepresentativesCrud'
</script>

<template>
    <CrudResource :config="studentRepresentativesCrud" />
</template>