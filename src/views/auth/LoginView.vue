<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-600 p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">AutoamTax Pro</h1>
        <p class="text-gray-600 mt-2">Sistema de Gestión de Transporte Accesible</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input 
            type="email" 
            v-model="form.email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="correo@ejemplo.com"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            v-model="form.password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          >
        </div>
        
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" v-model="form.rememberMe" class="rounded text-blue-600 focus:ring-blue-500">
            <span class="ml-2 text-sm text-gray-600">Recordarme</span>
          </label>
          <a href="#" class="text-sm text-blue-600 hover:text-blue-700">¿Olvidaste tu contraseña?</a>
        </div>
        
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-blue-800 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors disabled:opacity-50"
        >
          <span v-if="!isLoading">Iniciar Sesión</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Iniciando...
          </span>
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes cuenta? 
          <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Contacta al administrador</a>
        </p>
      </div>

      <!-- Demo credentials -->
      <div class="mt-6 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm font-medium text-blue-800 mb-2">Credenciales de demostración:</p>
        <p class="text-xs text-blue-600">Email: admin@test.com</p>
        <p class="text-xs text-blue-600">Contraseña: 123456</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Emits
const emit = defineEmits<{
  login: [credentials: { email: string; password: string }]
}>()

// State
const isLoading = ref(false)
const form = reactive({
  email: 'admin@test.com',
  password: '123456',
  rememberMe: false
})

// Methods
const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    // Emit login event
    emit('login', {
      email: form.email,
      password: form.password
    })
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    // Keep loading until parent handles the login
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}
</script>