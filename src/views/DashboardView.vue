<template>
  <div class="space-y-6">
    <!-- Page header -->
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-600">
        Gestión de servicios de taxi adaptado para personas con discapacidad
      </p>
    </div>

    <!-- Stats overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-sm font-medium text-gray-500">Viajes Hoy</dt>
            <dd class="text-2xl font-semibold text-gray-900">12</dd>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-sm font-medium text-gray-500">Ingresos</dt>
            <dd class="text-2xl font-semibold text-gray-900">€480</dd>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-sm font-medium text-gray-500">Clientes</dt>
            <dd class="text-2xl font-semibold text-gray-900">89</dd>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <dt class="text-sm font-medium text-gray-500">Satisfacción</dt>
            <dd class="text-2xl font-semibold text-gray-900">98%</dd>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent trips -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Viajes Recientes</h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-800 font-medium">MG</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">María González</p>
                <p class="text-sm text-gray-500">Hospital → Residencia - 14:30</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">€25.00</p>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completado
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-purple-800 font-medium">CM</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">Carlos Martín</p>
                <p class="text-sm text-gray-500">Centro Médico → Domicilio - 16:45</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">€18.50</p>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                En curso
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-800 font-medium">AL</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">Ana López</p>
                <p class="text-sm text-gray-500">Fisioterapia → Plaza Mayor - 18:00</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">€22.00</p>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Programado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button class="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nuevo Viaje
        </button>
        <button class="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          Ver Clientes
        </button>
        <button class="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"></path>
          </svg>
          Reportes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple dashboard demo
</script>