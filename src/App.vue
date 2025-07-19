<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" />
    
    <!-- App Content -->
    <template v-else>
      <!-- Login View -->
      <LoginView v-if="!isAuthenticated" @login="handleLogin" />
      
      <!-- Main App -->
      <MainLayout v-else>
        <RouterView />
      </MainLayout>
    </template>
    
    <!-- Global Components -->
    <Toast />
    <OfflineBanner v-if="!isOnline" />
    <InstallPrompt v-if="canInstall" @install="installPWA" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

// Components
import LoadingScreen from '@/components/ui/LoadingScreen.vue'
import LoginView from '@/views/auth/LoginView.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import Toast from '@/components/ui/Toast.vue'
import OfflineBanner from '@/components/ui/OfflineBanner.vue'
import InstallPrompt from '@/components/ui/InstallPrompt.vue'

// Simple state management
const isLoading = ref(true)
const isAuthenticated = ref(false)
const isOnline = ref(navigator.onLine)
const canInstall = ref(false)

// Methods
const handleLogin = async (credentials: { email: string; password: string }) => {
  try {
    console.log('Login attempt:', credentials.email)
    // Simple authentication logic
    if (credentials.email === 'admin@test.com' && credentials.password === '123456') {
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}

const installPWA = () => {
  console.log('PWA installation requested')
}

// Initialize app
onMounted(async () => {
  // Check if user was previously authenticated
  const wasAuthenticated = localStorage.getItem('isAuthenticated')
  if (wasAuthenticated) {
    isAuthenticated.value = true
  }
  
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<style>
/* Global accessibility styles */
*:focus-visible {
  @apply focus-visible;
}

/* Ensure minimum touch targets */
button, 
[role="button"], 
input, 
select, 
textarea {
  @apply touch-target;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --tw-text-opacity: 1;
    filter: contrast(2);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Safe area support */
.safe-area {
  @apply safe-area-padding;
}
</style>