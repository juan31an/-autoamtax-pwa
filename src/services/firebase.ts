import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, type Firestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

// Firebase configuration - MOVE TO ENVIRONMENT VARIABLES IN PRODUCTION
const firebaseConfig = {
  apiKey: "AIzaSyC674yHNNcczuBuplMfBcBaCa8-i5RAhg0",
  authDomain: "taxiapp-8bf37.firebaseapp.com",
  projectId: "taxiapp-8bf37",
  storageBucket: "taxiapp-8bf37.firebasestorage.app",
  messagingSenderId: "50867451701",
  appId: "1:50867451701:web:ce0198d6ff3dd761fb3e7c",
  measurementId: "G-9220J3JWMM"
}

// Initialize Firebase
let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

const initializeFirebase = async (): Promise<void> => {
  try {
    // Initialize Firebase app
    app = initializeApp(firebaseConfig)
    
    // Initialize services
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
    
    // Connect to emulators in development
    if (import.meta.env.DEV) {
      try {
        // Only connect if not already connected
        if (!auth.config.emulator) {
          connectAuthEmulator(auth, 'http://localhost:9099')
        }
        if (!db._settings?.host?.includes('localhost')) {
          connectFirestoreEmulator(db, 'localhost', 8080)
        }
      } catch (error) {
        // Emulator connection errors are not critical in development
        console.warn('Firebase emulator connection failed:', error)
      }
    }
    
    console.log('Firebase initialized successfully')
  } catch (error) {
    console.error('Firebase initialization error:', error)
    throw new Error('Failed to initialize Firebase')
  }
}

// Enhanced error handling for Firebase operations
export class FirebaseError extends Error {
  constructor(
    public code: string,
    message: string,
    public originalError?: any
  ) {
    super(message)
    this.name = 'FirebaseError'
  }
}

export const handleFirebaseError = (error: any): FirebaseError => {
  const errorMessages: Record<string, string> = {
    // Auth errors
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-email': 'Email inválido',
    'auth/user-disabled': 'Usuario deshabilitado',
    'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde',
    'auth/network-request-failed': 'Error de conexión',
    'auth/invalid-credential': 'Credenciales inválidas',
    
    // Firestore errors
    'permission-denied': 'Permisos insuficientes',
    'not-found': 'Documento no encontrado',
    'already-exists': 'El documento ya existe',
    'resource-exhausted': 'Cuota excedida. Inténtalo más tarde',
    'failed-precondition': 'Operación no permitida',
    'aborted': 'Operación cancelada',
    'out-of-range': 'Valor fuera de rango',
    'unimplemented': 'Operación no implementada',
    'internal': 'Error interno del servidor',
    'unavailable': 'Servicio no disponible',
    'data-loss': 'Pérdida de datos',
    'unauthenticated': 'No autenticado'
  }
  
  const message = errorMessages[error.code] || error.message || 'Error desconocido'
  return new FirebaseError(error.code, message, error)
}

// Connection status monitoring
export const monitorFirebaseConnection = () => {
  // This would implement real-time connection monitoring
  // For now, we'll use a simple approach
  return {
    isConnected: true,
    lastConnectionTime: new Date()
  }
}

// Retry mechanism for Firebase operations
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      // Don't retry on authentication errors
      if (error?.code?.startsWith('auth/')) {
        throw error
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      }
    }
  }
  
  throw lastError
}

export { initializeFirebase, app, auth, db, storage }