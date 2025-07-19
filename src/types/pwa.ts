export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export interface PWAInstallPrompt {
  canInstall: boolean
  install: () => Promise<void>
  isInstalled: boolean
}

export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: any
  actions?: NotificationAction[]
  silent?: boolean
}

export interface PushSubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export interface ServiceWorkerMessage {
  type: 'SKIP_WAITING' | 'GET_VERSION' | 'CLEAR_CACHE' | 'SYNC_DATA'
  payload?: any
}

export interface CacheStrategy {
  name: string
  pattern: RegExp | string
  handler: 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate' | 'NetworkOnly' | 'CacheOnly'
  options?: {
    cacheName?: string
    expiration?: {
      maxEntries?: number
      maxAgeSeconds?: number
    }
    cacheKeyWillBeUsed?: (request: Request) => Promise<string> | string
    networkTimeoutSeconds?: number
  }
}

export interface PWAConfig {
  name: string
  shortName: string
  description: string
  themeColor: string
  backgroundColor: string
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  orientation: 'portrait' | 'landscape' | 'any'
  scope: string
  startUrl: string
  icons: PWAIcon[]
  categories: string[]
}

export interface PWAIcon {
  src: string
  sizes: string
  type: string
  purpose?: 'any' | 'maskable' | 'monochrome'
}

export interface OfflineData {
  trips: any[]
  shifts: any[]
  partners: any[]
  lastSync: Date
}