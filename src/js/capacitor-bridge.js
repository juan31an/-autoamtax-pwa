// Capacitor Bridge for TaxiFleet Pro
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Toast } from '@capacitor/toast';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';

class CapacitorBridge {
    constructor() {
        this.isNative = Capacitor.isNativePlatform();
        this.initialize();
    }

    async initialize() {
        if (this.isNative) {
            await this.initializeNativeFeatures();
        }
        console.log(`TaxiFleet Pro initialized - Platform: ${this.isNative ? 'Native' : 'Web'}`);
    }

    async initializeNativeFeatures() {
        try {
            // Initialize Status Bar
            await StatusBar.setStyle({ style: Style.Light });
            await StatusBar.setBackgroundColor({ color: '#0f766e' });
            await StatusBar.setOverlaysWebView({ overlay: false });

            // Handle Splash Screen
            setTimeout(async () => {
                await SplashScreen.hide();
            }, 2000);

            // Handle App State Changes
            App.addListener('appStateChange', ({ isActive }) => {
                console.log('App state changed. Active:', isActive);
                if (isActive) {
                    this.onAppActive();
                } else {
                    this.onAppInactive();
                }
            });

            // Handle Back Button
            App.addListener('backButton', ({ canGoBack }) => {
                if (canGoBack) {
                    window.history.back();
                } else {
                    this.showExitConfirmation();
                }
            });

            // Handle Keyboard
            Keyboard.addListener('keyboardWillShow', (info) => {
                document.body.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
                document.body.classList.add('keyboard-open');
            });

            Keyboard.addListener('keyboardWillHide', () => {
                document.body.style.setProperty('--keyboard-height', '0px');
                document.body.classList.remove('keyboard-open');
            });

        } catch (error) {
            console.error('Error initializing native features:', error);
        }
    }

    // Network Management
    async getNetworkStatus() {
        if (this.isNative) {
            return await Network.getStatus();
        }
        return { connected: navigator.onLine };
    }

    addNetworkListener(callback) {
        if (this.isNative) {
            return Network.addListener('networkStatusChange', callback);
        } else {
            const handler = () => callback({ connected: navigator.onLine });
            window.addEventListener('online', handler);
            window.addEventListener('offline', handler);
            return { remove: () => {
                window.removeEventListener('online', handler);
                window.removeEventListener('offline', handler);
            }};
        }
    }

    // Geolocation Enhancement
    async getCurrentPosition(options = {}) {
        const defaultOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        if (this.isNative) {
            try {
                const position = await Geolocation.getCurrentPosition({
                    ...defaultOptions,
                    ...options
                });
                return position;
            } catch (error) {
                console.error('Native geolocation error:', error);
                throw error;
            }
        } else {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    { ...defaultOptions, ...options }
                );
            });
        }
    }

    async watchPosition(callback, options = {}) {
        if (this.isNative) {
            return await Geolocation.watchPosition(options, callback);
        } else {
            return navigator.geolocation.watchPosition(callback, null, options);
        }
    }

    // Camera Enhancement
    async captureImage(options = {}) {
        const defaultOptions = {
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera
        };

        if (this.isNative) {
            try {
                await this.hapticImpact('light');
                const image = await Camera.getPhoto({
                    ...defaultOptions,
                    ...options
                });
                return image;
            } catch (error) {
                console.error('Camera error:', error);
                throw error;
            }
        } else {
            // Web fallback
            return new Promise((resolve, reject) => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                
                input.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve({
                            base64String: e.target.result.split(',')[1],
                            webPath: e.target.result
                        });
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    } else {
                        reject(new Error('No file selected'));
                    }
                });
                
                input.click();
            });
        }
    }

    // Toast Messages
    async showToast(message, duration = 'short', position = 'bottom') {
        if (this.isNative) {
            await Toast.show({
                text: message,
                duration: duration,
                position: position
            });
        } else {
            // Web fallback
            this.showWebToast(message, duration);
        }
    }

    showWebToast(message, duration) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            setTimeout(() => toast.remove(), 300);
        }, duration === 'long' ? 3500 : 2000);
    }

    // Haptic Feedback
    async hapticImpact(style = 'medium') {
        if (this.isNative) {
            const impactStyle = {
                'light': ImpactStyle.Light,
                'medium': ImpactStyle.Medium,
                'heavy': ImpactStyle.Heavy
            }[style] || ImpactStyle.Medium;
            
            await Haptics.impact({ style: impactStyle });
        }
    }

    async hapticNotification(type = 'success') {
        if (this.isNative) {
            await Haptics.notification({ type });
        }
    }

    // Storage Management
    async setItem(key, value) {
        if (this.isNative) {
            await Preferences.set({
                key: key,
                value: JSON.stringify(value)
            });
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    async getItem(key) {
        if (this.isNative) {
            const { value } = await Preferences.get({ key });
            return value ? JSON.parse(value) : null;
        } else {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        }
    }

    async removeItem(key) {
        if (this.isNative) {
            await Preferences.remove({ key });
        } else {
            localStorage.removeItem(key);
        }
    }

    // App Lifecycle
    onAppActive() {
        document.body.classList.remove('app-inactive');
        document.body.classList.add('app-active');
        
        // Refresh data when app becomes active
        if (typeof window.refreshAppData === 'function') {
            window.refreshAppData();
        }
    }

    onAppInactive() {
        document.body.classList.remove('app-active');
        document.body.classList.add('app-inactive');
        
        // Save current state
        if (typeof window.saveAppState === 'function') {
            window.saveAppState();
        }
    }

    async showExitConfirmation() {
        const shouldExit = confirm('¿Deseas salir de TaxiFleet Pro?');
        if (shouldExit) {
            await App.exitApp();
        }
    }

    // Utility Methods
    addTouchFeedback(element) {
        if (!element) return;
        
        element.addEventListener('touchstart', () => {
            this.hapticImpact('light');
            element.style.transform = 'scale(0.95)';
            element.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', () => {
            element.style.transform = 'scale(1)';
        });
    }

    // Initialize touch feedback for all interactive elements
    initializeTouchFeedback() {
        const interactiveElements = document.querySelectorAll('button, .nav-item, .quick-action-btn, [data-touch-feedback]');
        interactiveElements.forEach(element => {
            this.addTouchFeedback(element);
        });
    }
}

// Create global instance
window.CapacitorBridge = new CapacitorBridge();

// Export for module usage
export default CapacitorBridge;