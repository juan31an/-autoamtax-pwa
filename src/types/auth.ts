export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UserProfile {
  id: string
  email: string
  name: string
  role: 'partner' | 'admin' | 'driver'
  partner?: PartnerInfo
  preferences?: UserPreferences
  createdAt?: Date
  updatedAt?: Date
}

export interface PartnerInfo {
  id: string
  name: string
  licenseNumber: string
  isActive: boolean
  vehicleId?: string
  currentShift?: string
  stats?: PartnerStats
}

export interface PartnerStats {
  totalTrips: number
  totalRevenue: number
  averageRating: number
  completionRate: number
  activeHours: number
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'es' | 'en'
  notifications: {
    push: boolean
    email: boolean
    sms: boolean
  }
  accessibility: {
    highContrast: boolean
    largeText: boolean
    screenReader: boolean
    reduceMotion: boolean
  }
}

export interface AuthState {
  user: any | null
  userProfile: UserProfile | null
  isLoading: boolean
  error: string | null
}