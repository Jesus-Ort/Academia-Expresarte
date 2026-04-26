<template>
  <UContainer class="max-w-2xl mx-auto mt-10 space-y-6">

    <h2 class="text-2xl font-semibold text-center">
      Configuración de cuenta
    </h2>

    <UCard>
      <div class="space-y-4">

        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium">Nombre de usuario</p>
            <p class="text-sm text-gray-500">
              Cambia el nombre de usuario de tu cuenta
            </p>
          </div>

          <UButton
            label="Cambiar nombre de usuario"
            color="warning"
            @click="openName = true"
          />
        </div>

        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium">Correo electrónico</p>
            <p class="text-sm text-gray-500">
              Cambia el correo de tu cuenta
            </p>
          </div>

          <UButton
            label="Cambiar correo"
            color="warning"
            @click="openEmail = true"
          />
        </div>

        <UDivider />

        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium">Contraseña</p>
            <p class="text-sm text-gray-500">
              Actualiza tu contraseña
            </p>
          </div>

          <UButton
            label="Cambiar contraseña"
            color="warning"
            @click="openPassword = true"
          />
        </div>

      </div>
    </UCard>

    <!-- Modales -->

    <UpdateUserNameModal
    v-model:open="openName"
    />

    <UpdateEmailModal
      v-model:open="openEmail"
    />

    <UpdatePasswordModal
      v-model:open="openPassword"
    />

  </UContainer>
</template>

<script setup lang="ts">
useHead({
    title: 'Configuración'
})
import auth from '../middlewares/auth'
definePageMeta({
  middleware: auth
})

import UpdateUserNameModal from '~/components/UpdateUserNameModal.vue'
import UpdateEmailModal from '~/components/UpdateEmailModal.vue'
import UpdatePasswordModal from '~/components/UpdatePasswordModal.vue'

const openName = ref(false)
const openEmail = ref(false)
const openPassword = ref(false)
const openSaving = ref(false)

</script>