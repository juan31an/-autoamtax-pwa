<template>
  <div class="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-50 max-w-md mx-auto">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900">Instalar AutoamTax Pro</h3>
        <p class="text-sm text-gray-600 mt-1">Accede rápidamente desde tu pantalla de inicio</p>
      </div>
      <div class="flex gap-2 ml-4">
        <button @click="$emit('dismiss')" class="px-4 py-2 text-gray-600 hover:text-gray-800">Después</button>
        <button @click="$emit('install')" class="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900">Instalar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  install: []
  dismiss: []
}>()
</script>