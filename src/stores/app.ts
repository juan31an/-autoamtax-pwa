import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNetwork } from '@vueuse/core'
import type { BeforeInstallPromptEvent } from '@/types/pwa'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(true)
  const currentView = ref('dashboard')
  const isMobileMenuOpen = ref(false)
  const installPromptEvent = ref<BeforeInstallPromptEvent | null>(null)
  const hasBeenInstalled = ref(false)
  const notifications = ref<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: Date
    read: boolean
  }>>([])

  // Network status
  const { isOnline } = useNetwork()

  // Getters
  const canInstall = computed(() => !!installPromptEvent.value && !hasBeenInstalled.value)
  const unreadNotifications = computed(() => notifications.value.filter(n => !n.read))
  const isOffline = computed(() => !isOnline.value)

  // Actions
  const initialize = async () => {
    isLoading.value = true
    
    try {
      // Initialize PWA install prompt listener
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        installPromptEvent.value = e as BeforeInstallPromptEvent
      })

      // Check if app is already installed
      window.addEventListener('appinstalled', () => {
        hasBeenInstalled.value = true
        installPromptEvent.value = null
        showNotification({
          type: 'success',
          title: 'App Instalada',
          message: 'AutoamTax se ha instalado correctamente'
        })
      })

      // Listen for offline/online events
      window.addEventListener('online', () => {
        showNotification({
          type: 'success',
          title: 'Conexión Restaurada',
          message: 'Volviste a estar en línea'
        })
      })

      window.addEventListener('offline', () => {
        showNotification({
          type: 'warning',
          title: 'Sin Conexión',
          message: 'Trabajando en modo offline'
        })
      })

      // Simulate initialization delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error('App initialization error:', error)
    } finally {
      isLoading.value = false
    }
  }

  const installPWA = async () => {
    if (!installPromptEvent.value) return

    try {
      const result = await installPromptEvent.value.prompt()
      
      if (result.outcome === 'accepted') {
        hasBeenInstalled.value = true
        installPromptEvent.value = null
        showNotification({
          type: 'success',
          title: 'Instalación Exitosa',
          message: 'AutoamTax se ha añadido a tu pantalla de inicio'
        })
      }
    } catch (error) {
      console.error('PWA installation error:', error)
      showNotification({
        type: 'error',
        title: 'Error de Instalación',
        message: 'No se pudo instalar la aplicación'
      })
    }
  }

  const setCurrentView = (view: string) => {
    currentView.value = view
    closeMobileMenu()
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const showNotification = (notification: {
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
  }) => {
    const id = Date.now().toString()
    notifications.value.unshift({
      id,
      ...notification,
      timestamp: new Date(),
      read: false
    })

    // Auto-remove success and info notifications after 5 seconds
    if (notification.type === 'success' || notification.type === 'info') {
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    }
  }

  const markNotificationAsRead = (id: string) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAllNotifications = () => {
    notifications.value = []
  }

  // Device detection
  const isMobile = computed(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    return false
  })

  const isTouch = computed(() => {
    if (typeof window !== 'undefined') {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
    return false
  })

  const isCapacitor = computed(() => {
    return typeof window !== 'undefined' && 'Capacitor' in window
  })

  return {
    // State
    isLoading,
    currentView,
    isMobileMenuOpen,
    installPromptEvent,
    hasBeenInstalled,
    notifications,
    
    // Getters
    canInstall,
    unreadNotifications,
    isOffline,
    isOnline,
    isMobile,
    isTouch,
    isCapacitor,
    
    // Actions
    initialize,
    installPWA,
    setCurrentView,
    toggleMobileMenu,
    closeMobileMenu,
    showNotification,
    markNotificationAsRead,
    removeNotification,
    clearAllNotifications
  }
})