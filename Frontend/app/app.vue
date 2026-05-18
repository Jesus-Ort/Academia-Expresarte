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
    { property: 'og:description', content: 'Expresarte es una academia de música dedicada a la formación artística de niños, jóvenes y adultos, ofreciendo clases de instrumentos, canto y desarrollo musical en un ambiente creativo y profesional.' },
    {
      name: 'keywords',
      content:
        'academia de música, clases de música, canto, piano, guitarra, batería, violín, formación musical, escuela de música'
    },
    {
      name: 'author',
      content: 'Expresarte'
    },
    // Open Graph (Facebook, WhatsApp, Discord)
    {
      property: 'og:title',
      content: 'Expresarte Academia de Música'
    },

    {
      property: 'og:description',
      content:
        'Formación musical para niños, jóvenes y adultos con clases de instrumentos, canto y desarrollo artístico.'
    },
    { property: 'og:type', content: 'website' },
    { name: 'theme-color', content: '#0f172a' },

    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },

    {
      name: 'twitter:title',
      content: 'Expresarte Academia de Música'
    },

    {
      name: 'twitter:description',
      content:
        'Aprende música en un ambiente creativo y profesional con clases para todas las edades.'
    },

    {
      name: 'twitter:image',
      content: '/preview.png'
    },

    // iOS PWA
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },

    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    },

    {
      name: 'apple-mobile-web-app-title',
      content: 'Expresarte'
    }
  ],

  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'manifest', href: '/site.webmanifest' },
    
    {
      rel: 'apple-touch-icon',
      href: '/icon-192.png'
    },

    {
      rel: 'manifest',
      href: '/site.webmanifest'
    }
  ],
  
})
</script>