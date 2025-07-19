<template>
  <div class="fixed inset-0 bg-gradient-to-br from-blue-800 to-blue-600 text-white flex items-center justify-center z-50">
    <div class="text-center">
      <div class="w-20 h-20 mx-auto mb-6">
        <svg class="animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h1 class="text-3xl font-bold mb-2">AutoamTax Pro</h1>
      <p class="text-blue-100 text-lg">Cargando sistema de gestión...</p>
      <div class="mt-6">
        <div class="w-64 bg-blue-700 rounded-full h-2 mx-auto">
          <div class="bg-white h-2 rounded-full animate-pulse" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="text-sm text-blue-200 mt-2">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const progress = ref(0)
const message = ref('Inicializando...')

const messages = [
  'Inicializando...',
  'Cargando componentes...',
  'Configurando servicios...',
  'Preparando interfaz...',
  'Casi listo...'
]

onMounted(() => {
  let messageIndex = 0
  let currentProgress = 0
  
  const interval = setInterval(() => {
    currentProgress += Math.random() * 25
    progress.value = Math.min(currentProgress, 95)
    
    if (messageIndex < messages.length - 1 && progress.value > (messageIndex + 1) * 20) {
      messageIndex++
      message.value = messages[messageIndex]
    }
    
    if (progress.value >= 95) {
      clearInterval(interval)
      progress.value = 100
      message.value = '¡Listo!'
    }
  }, 500)
})
</script>