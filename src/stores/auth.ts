import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from '@/services/firebase'
import type { LoginCredentials, UserProfile } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const userProfile = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userId = computed(() => user.value?.uid)
  const userEmail = computed(() => user.value?.email)

  // Actions
  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      user.value = credential.user
      
      // Load user profile
      await loadUserProfile(credential.user.uid)
      
      return credential.user
    } catch (err: any) {
      error.value = getFirebaseErrorMessage(err.code)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      await signOut(auth)
      user.value = null
      userProfile.value = null
    } catch (err: any) {
      error.value = 'Error al cerrar sesión'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const checkAuthState = async (): Promise<void> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser
          await loadUserProfile(firebaseUser.uid)
        } else {
          user.value = null
          userProfile.value = null
        }
        unsubscribe()
        resolve()
      })
    })
  }

  const loadUserProfile = async (uid: string) => {
    try {
      // In a real app, this would fetch from Firestore
      // For now, create a basic profile
      userProfile.value = {
        id: uid,
        email: user.value?.email || '',
        name: user.value?.displayName || 'Usuario',
        role: 'partner', // partner, admin
        partner: {
          id: '1',
          name: user.value?.displayName || 'Socio 1',
          licenseNumber: 'TAX001',
          isActive: true
        }
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Helper function for Firebase error messages
  const getFirebaseErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuario deshabilitado',
      'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/invalid-credential': 'Credenciales inválidas'
    }
    
    return errorMessages[errorCode] || 'Error de autenticación'
  }

  return {
    // State
    user,
    userProfile,
    isLoading,
    error,
    
    // Getters
    isAuthenticated,
    userId,
    userEmail,
    
    // Actions
    login,
    logout,
    checkAuthState,
    loadUserProfile,
    clearError
  }
})