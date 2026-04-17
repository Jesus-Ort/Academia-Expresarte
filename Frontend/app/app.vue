<template>
  <UApp>
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} | Expresarte` : 'Expresarte Academia',

  meta: [
    { name: 'description', content: 'Expresarte descripción.' },

    { property: 'og:title', content: 'Expresarte' },
    { property: 'og:description', content: 'Expresarte descripción (resumen).' },
    { property: 'og:type', content: 'website' },

    { name: 'theme-color', content: '#0f172a' }
  ],

  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],
  
})
</script>