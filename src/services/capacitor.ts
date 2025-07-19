import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
import { Keyboard } from '@capacitor/keyboard'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Toast } from '@capacitor/toast'
import { Preferences } from '@capacitor/preferences'

export const initializeCapacitor = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Running in web mode - Capacitor features limited')
    return
  }

  try {
    // Initialize Status Bar
    await StatusBar.setStyle({ style: Style.Light })
    await StatusBar.setBackgroundColor({ color: '#1E40AF' })
    await StatusBar.setOverlaysWebView({ overlay: false })

    // Handle Splash Screen
    setTimeout(async () => {
      await SplashScreen.hide()
    }, 2000)

    // Handle App State Changes
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Active:', isActive)
      // Emit custom event for app stores to handle
      window.dispatchEvent(new CustomEvent('app-state-change', { 
        detail: { isActive } 
      }))
    })

    // Handle Back Button
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back()
      } else {
        // Show exit confirmation
        window.dispatchEvent(new CustomEvent('app-exit-requested'))
      }
    })

    // Handle Keyboard
    Keyboard.addListener('keyboardWillShow', (info) => {
      document.documentElement.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`)
      document.body.classList.add('keyboard-open')
    })

    Keyboard.addListener('keyboardWillHide', () => {
      document.documentElement.style.setProperty('--keyboard-height', '0px')
      document.body.classList.remove('keyboard-open')
    })

    console.log('Capacitor initialized successfully')
  } catch (error) {
    console.error('Error initializing Capacitor:', error)
  }
}

// Haptic feedback service
export const hapticService = {
  async light() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light })
    }
  },
  
  async medium() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Medium })
    }
  },
  
  async heavy() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Heavy })
    }
  },
  
  async success() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: 'SUCCESS' })
    }
  },
  
  async warning() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: 'WARNING' })
    }
  },
  
  async error() {
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: 'ERROR' })
    }
  }
}

// Toast service
export const toastService = {
  async show(message: string, duration: 'short' | 'long' = 'short') {
    if (Capacitor.isNativePlatform()) {
      await Toast.show({
        text: message,
        duration: duration,
        position: 'bottom'
      })
    } else {
      // Web fallback - emit event for web toast component
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message, duration }
      }))
    }
  }
}

// Preferences service (secure storage)
export const preferencesService = {
  async set(key: string, value: any) {
    try {
      await Preferences.set({
        key,
        value: JSON.stringify(value)
      })
    } catch (error) {
      console.error('Error setting preference:', error)
    }
  },
  
  async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const { value } = await Preferences.get({ key })
      return value ? JSON.parse(value) : defaultValue || null
    } catch (error) {
      console.error('Error getting preference:', error)
      return defaultValue || null
    }
  },
  
  async remove(key: string) {
    try {
      await Preferences.remove({ key })
    } catch (error) {
      console.error('Error removing preference:', error)
    }
  },
  
  async clear() {
    try {
      await Preferences.clear()
    } catch (error) {
      console.error('Error clearing preferences:', error)
    }
  }
}

// App info service
export const appInfoService = {
  getPlatform(): string {
    return Capacitor.getPlatform()
  },
  
  isNative(): boolean {
    return Capacitor.isNativePlatform()
  },
  
  isWeb(): boolean {
    return Capacitor.getPlatform() === 'web'
  },
  
  isAndroid(): boolean {
    return Capacitor.getPlatform() === 'android'
  },
  
  isIOS(): boolean {
    return Capacitor.getPlatform() === 'ios'
  }
}

// Device orientation helper
export const orientationService = {
  addOrientationListener(callback: (orientation: string) => void) {
    const handleOrientationChange = () => {
      const orientation = window.screen?.orientation?.type || 
                         (window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
      callback(orientation)
    }
    
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)
    
    // Call immediately
    handleOrientationChange()
    
    // Return cleanup function
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }
}

// Safe area helper
export const safeAreaService = {
  updateSafeAreas() {
    if (Capacitor.isNativePlatform()) {
      // Get safe area insets and update CSS custom properties
      const safeAreaTop = getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-top)') || '0px'
      const safeAreaBottom = getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-bottom)') || '0px'
      const safeAreaLeft = getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-left)') || '0px'
      const safeAreaRight = getComputedStyle(document.documentElement)
        .getPropertyValue('env(safe-area-inset-right)') || '0px'
      
      document.documentElement.style.setProperty('--safe-area-top', safeAreaTop)
      document.documentElement.style.setProperty('--safe-area-bottom', safeAreaBottom)
      document.documentElement.style.setProperty('--safe-area-left', safeAreaLeft)
      document.documentElement.style.setProperty('--safe-area-right', safeAreaRight)
    }
  }
}