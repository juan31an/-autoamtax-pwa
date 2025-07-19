<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="text-xl font-bold text-gray-900">AutoamTax Pro</h1>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <router-link
              to="/"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              Dashboard
            </router-link>
            <router-link
              to="/trips"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              Viajes
            </router-link>
            <router-link
              to="/partners"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              Socios
            </router-link>
            <router-link
              to="/accessibility"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600 bg-blue-50"
            >
              Accesibilidad
            </router-link>
          </nav>

          <!-- User menu -->
          <div class="flex items-center space-x-4">
            <button
              @click="logout"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  // For now, just reload the page to trigger the login screen
  window.location.reload()
}
</script>