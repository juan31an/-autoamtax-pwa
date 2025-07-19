<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Login o Dashboard -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-600">
      <div class="max-w-md w-full mx-4">
        <div class="bg-white rounded-lg shadow-xl p-8">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">AutoamTax Pro</h1>
            <p class="text-gray-600 mt-2">Sistema de Gestión de Transporte Accesible</p>
          </div>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="email"
                type="email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@test.com"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input 
                v-model="password"
                type="password" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123456"
              />
            </div>
            
            <button 
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Iniciar Sesión
            </button>
          </form>
          
          <div class="mt-6 p-4 bg-blue-50 rounded-md">
            <p class="text-sm text-blue-800">
              <strong>Demo:</strong> admin@test.com / 123456
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dashboard -->
    <div v-else class="min-h-screen">
      <!-- Header -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <h1 class="text-xl font-bold text-blue-800">AutoamTax Pro</h1>
            <button 
              @click="logout"
              class="text-gray-600 hover:text-gray-900"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-500 rounded-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Viajes Hoy</p>
                <p class="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-500 rounded-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Ingresos</p>
                <p class="text-2xl font-semibold text-gray-900">€480</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-500 rounded-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Clientes</p>
                <p class="text-2xl font-semibold text-gray-900">89</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-purple-500 rounded-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Satisfacción</p>
                <p class="text-2xl font-semibold text-gray-900">98%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Trips -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b">
            <h2 class="text-lg font-medium text-gray-900">Viajes Recientes</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-800 font-medium">MG</span>
                  </div>
                  <div>
                    <p class="font-medium">María González</p>
                    <p class="text-sm text-gray-500">Hospital → Residencia - 14:30</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-medium">€25.00</p>
                  <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Completado</span>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span class="text-purple-800 font-medium">CM</span>
                  </div>
                  <div>
                    <p class="font-medium">Carlos Martín</p>
                    <p class="text-sm text-gray-500">Centro Médico → Domicilio - 16:45</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-medium">€18.50</p>
                  <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">En curso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// State
const isAuthenticated = ref(false)
const email = ref('admin@test.com')
const password = ref('123456')

// Methods
const handleLogin = () => {
  if (email.value === 'admin@test.com' && password.value === '123456') {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
  } else {
    alert('Credenciales incorrectas')
  }
}

const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('isAuthenticated')
  email.value = 'admin@test.com'
  password.value = '123456'
}

// Initialize
onMounted(() => {
  const wasAuthenticated = localStorage.getItem('isAuthenticated')
  if (wasAuthenticated) {
    isAuthenticated.value = true
  }
})
</script>