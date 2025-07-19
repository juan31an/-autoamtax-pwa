// TaxiFleet Pro - Mobile Enhancements
// Progressive enhancement system that works on both web and mobile

class MobileEnhancements {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isTouch = this.detectTouch();
        this.isCapacitor = typeof window.Capacitor !== 'undefined';
        this.isOnline = navigator.onLine;
        
        this.init();
    }

    // Device Detection
    detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const screenWidth = window.innerWidth <= 768;
        
        return mobileRegex.test(userAgent.toLowerCase()) || screenWidth;
    }

    detectTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Initialization
    init() {
        this.addDeviceClasses();
        this.initializeEventListeners();
        this.setupPerformanceOptimizations();
        this.enhanceUI();
        this.setupGestures();
        this.initializeFeatures();
        
        console.log('Mobile Enhancements initialized:', {
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            isCapacitor: this.isCapacitor,
            userAgent: navigator.userAgent.substring(0, 50)
        });
    }

    // Add device-specific CSS classes
    addDeviceClasses() {
        const body = document.body;
        
        if (this.isMobile) body.classList.add('mobile-device');
        if (this.isTouch) body.classList.add('touch-device');
        if (this.isCapacitor) body.classList.add('capacitor-app');
        if (!this.isOnline) body.classList.add('offline-mode');
        
        // Add platform-specific classes
        if (this.isCapacitor && window.Capacitor.getPlatform) {
            const platform = window.Capacitor.getPlatform();
            body.classList.add(`platform-${platform}`);
        }
        
        // Add viewport classes
        this.updateViewportClasses();
        window.addEventListener('resize', () => this.updateViewportClasses());
    }

    updateViewportClasses() {
        const body = document.body;
        const width = window.innerWidth;
        
        body.classList.remove('viewport-xs', 'viewport-sm', 'viewport-md', 'viewport-lg', 'viewport-xl');
        
        if (width < 640) body.classList.add('viewport-xs');
        else if (width < 768) body.classList.add('viewport-sm');
        else if (width < 1024) body.classList.add('viewport-md');
        else if (width < 1280) body.classList.add('viewport-lg');
        else body.classList.add('viewport-xl');
    }

    // Enhanced Event Listeners
    initializeEventListeners() {
        // Network status monitoring
        window.addEventListener('online', () => {
            this.isOnline = true;
            document.body.classList.remove('offline-mode');
            this.handleNetworkChange(true);
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            document.body.classList.add('offline-mode');
            this.handleNetworkChange(false);
        });

        // Orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 500);
        });

        // Visibility changes (app lifecycle)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handleAppBackground();
            } else {
                this.handleAppForeground();
            }
        });

        // Touch events for better mobile interaction
        if (this.isTouch) {
            this.setupTouchEvents();
        }
    }

    handleNetworkChange(isOnline) {
        const banner = document.getElementById('offline-banner');
        const syncStatus = document.getElementById('sync-status');
        
        if (isOnline) {
            banner?.classList.add('hidden');
            if (syncStatus) {
                syncStatus.innerHTML = '<div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div><span>Sincronizado</span>';
            }
            this.showToast('Conexión restaurada', 'success');
            this.syncPendingData();
        } else {
            banner?.classList.remove('hidden');
            if (syncStatus) {
                syncStatus.innerHTML = '<div class="w-2 h-2 bg-red-500 rounded-full mr-2"></div><span>Sin conexión</span>';
            }
            this.showToast('Modo offline activado', 'warning');
        }
    }

    handleOrientationChange() {
        // Force layout recalculation
        const event = new Event('resize');
        window.dispatchEvent(event);
        
        // Update viewport classes
        this.updateViewportClasses();
        
        // Refresh maps if visible
        if (window.map && typeof window.map.invalidateSize === 'function') {
            window.map.invalidateSize();
        }
    }

    handleAppBackground() {
        // Pause expensive operations
        this.pauseAnimations();
        this.reducePerformance();
        
        console.log('App moved to background');
    }

    handleAppForeground() {
        // Resume operations
        this.resumeAnimations();
        this.restorePerformance();
        this.refreshData();
        
        console.log('App moved to foreground');
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy loading for images
        this.setupLazyLoading();
        
        // Intersection Observer for animations
        this.setupIntersectionObserver();
        
        // Debounced scroll events
        this.setupScrollOptimizations();
        
        // Memory management
        this.setupMemoryManagement();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            animatedElements.forEach(el => animationObserver.observe(el));
        }
    }

    setupScrollOptimizations() {
        let scrollTimeout;
        let isScrolling = false;
        
        const handleScroll = () => {
            if (!isScrolling) {
                document.body.classList.add('is-scrolling');
                isScrolling = true;
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
                isScrolling = false;
            }, 150);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupMemoryManagement() {
        // Clean up unused DOM elements
        setInterval(() => {
            if (document.hidden) {
                this.cleanupUnusedElements();
            }
        }, 30000); // Every 30 seconds when hidden
    }

    cleanupUnusedElements() {
        // Remove hidden charts to free memory
        const hiddenCharts = document.querySelectorAll('.hidden canvas');
        hiddenCharts.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }

    // UI Enhancements
    enhanceUI() {
        this.addTouchFeedback();
        this.improveFormInputs();
        this.enhanceButtons();
        this.addLoadingStates();
        this.setupModalEnhancements();
    }

    addTouchFeedback() {
        const interactiveElements = document.querySelectorAll(
            'button, .nav-item, .quick-action-btn, .card, [data-touch-feedback]'
        );
        
        interactiveElements.forEach(element => {
            if (this.isTouch) {
                element.addEventListener('touchstart', (e) => {
                    element.classList.add('touch-active');
                    this.triggerHapticFeedback('light');
                }, { passive: true });
                
                element.addEventListener('touchend', (e) => {
                    setTimeout(() => {
                        element.classList.remove('touch-active');
                    }, 150);
                }, { passive: true });
                
                element.addEventListener('touchcancel', (e) => {
                    element.classList.remove('touch-active');
                }, { passive: true });
            }
        });
    }

    improveFormInputs() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add mobile-specific attributes
            if (this.isMobile) {
                if (input.type === 'email') {
                    input.setAttribute('autocomplete', 'email');
                    input.setAttribute('inputmode', 'email');
                }
                
                if (input.type === 'tel') {
                    input.setAttribute('inputmode', 'tel');
                }
                
                if (input.type === 'number') {
                    input.setAttribute('inputmode', 'decimal');
                }
                
                if (input.type === 'search') {
                    input.setAttribute('inputmode', 'search');
                }
            }
            
            // Enhanced focus handling
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('input-focused');
                this.scrollToElementIfNeeded(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('input-focused');
            });
        });
    }

    scrollToElementIfNeeded(element) {
        if (this.isMobile) {
            setTimeout(() => {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300); // Wait for keyboard animation
        }
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('button:not(.enhanced)');
        
        buttons.forEach(button => {
            button.classList.add('enhanced');
            
            // Add ripple effect
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            
            // Improve accessibility
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                const icon = button.querySelector('svg');
                if (icon) {
                    button.setAttribute('aria-label', 'Botón');
                }
            }
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.classList.add('ripple');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addLoadingStates() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    this.showButtonLoading(submitButton);
                }
            });
        });
    }

    showButtonLoading(button) {
        const originalText = button.textContent;
        button.disabled = true;
        button.innerHTML = `
            <div class="inline-flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Procesando...
            </div>
        `;
        
        // Reset after 5 seconds as fallback
        setTimeout(() => {
            button.disabled = false;
            button.textContent = originalText;
        }, 5000);
    }

    setupModalEnhancements() {
        const modals = document.querySelectorAll('.modal, [role="dialog"]');
        
        modals.forEach(modal => {
            // Prevent background scroll
            modal.addEventListener('show', () => {
                document.body.style.overflow = 'hidden';
            });
            
            modal.addEventListener('hide', () => {
                document.body.style.overflow = '';
            });
            
            // Close on background tap
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    // Gesture Support
    setupGestures() {
        if (!this.isTouch) return;
        
        this.setupSwipeGestures();
        this.setupPinchGestures();
        this.setupPullToRefresh();
    }

    setupSwipeGestures() {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar) {
            let startX = 0;
            let startY = 0;
            let currentX = 0;
            let currentY = 0;
            let isSwipeStarted = false;
            
            sidebar.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isSwipeStarted = true;
            }, { passive: true });
            
            sidebar.addEventListener('touchmove', (e) => {
                if (!isSwipeStarted) return;
                
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
                
                const deltaX = currentX - startX;
                const deltaY = Math.abs(currentY - startY);
                
                // Horizontal swipe
                if (Math.abs(deltaX) > deltaY && deltaX < -50) {
                    this.closeSidebar();
                    isSwipeStarted = false;
                }
            }, { passive: true });
            
            sidebar.addEventListener('touchend', () => {
                isSwipeStarted = false;
            }, { passive: true });
        }
        
        // Swipe to open sidebar from edge
        document.addEventListener('touchstart', (e) => {
            if (e.touches[0].clientX < 20) {
                this.setupEdgeSwipe(e);
            }
        }, { passive: true });
    }

    setupEdgeSwipe(startEvent) {
        const startX = startEvent.touches[0].clientX;
        
        const handleMove = (e) => {
            const currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            
            if (deltaX > 50) {
                this.openSidebar();
                document.removeEventListener('touchmove', handleMove);
            }
        };
        
        document.addEventListener('touchmove', handleMove, { passive: true });
        
        setTimeout(() => {
            document.removeEventListener('touchmove', handleMove);
        }, 500);
    }

    setupPinchGestures() {
        // For future map zoom functionality
        let initialDistance = 0;
        let currentDistance = 0;
        
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = this.getDistance(e.touches[0], e.touches[1]);
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                
                // Trigger zoom event for maps
                if (window.map && Math.abs(scale - 1) > 0.1) {
                    this.handleMapZoom(scale);
                }
            }
        }, { passive: true });
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let isPulling = false;
        let pullThreshold = 100;
        
        const refreshElement = document.createElement('div');
        refreshElement.className = 'pull-to-refresh hidden';
        refreshElement.innerHTML = `
            <div class="flex items-center justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
                <span>Actualizando...</span>
            </div>
        `;
        document.body.prepend(refreshElement);
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!isPulling) return;
            
            currentY = e.touches[0].clientY;
            const pullDistance = currentY - startY;
            
            if (pullDistance > 0 && pullDistance < pullThreshold) {
                refreshElement.style.transform = `translateY(${pullDistance - 50}px)`;
                refreshElement.classList.remove('hidden');
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            if (isPulling) {
                const pullDistance = currentY - startY;
                
                if (pullDistance > pullThreshold) {
                    this.performRefresh();
                } else {
                    refreshElement.classList.add('hidden');
                    refreshElement.style.transform = 'translateY(-50px)';
                }
                
                isPulling = false;
            }
        }, { passive: true });
    }

    // Feature Integrations
    initializeFeatures() {
        this.setupCapacitorFeatures();
        this.setupWebFallbacks();
        this.setupProgressiveEnhancement();
    }

    setupCapacitorFeatures() {
        if (!this.isCapacitor) return;
        
        // Use native features when available
        if (window.CapacitorBridge) {
            console.log('Capacitor Bridge detected, using native features');
            
            // Override web implementations with native ones
            this.overrideWithNative();
        }
    }

    overrideWithNative() {
        // Override toast messages
        const originalShowToast = window.showToast;
        window.showToast = (message, type = 'info') => {
            if (window.CapacitorBridge) {
                window.CapacitorBridge.showToast(message);
            } else if (originalShowToast) {
                originalShowToast(message, type);
            }
        };
        
        // Override haptic feedback
        window.triggerHapticFeedback = (type = 'light') => {
            if (window.CapacitorBridge) {
                window.CapacitorBridge.hapticImpact(type);
            }
        };
    }

    setupWebFallbacks() {
        // Ensure web versions still work
        if (!window.showToast) {
            window.showToast = (message, type = 'info') => {
                this.showWebToast(message, type);
            };
        }
        
        if (!window.triggerHapticFeedback) {
            window.triggerHapticFeedback = () => {
                // No-op for web
            };
        }
    }

    setupProgressiveEnhancement() {
        // Add features based on capability
        if ('serviceWorker' in navigator) {
            this.setupServiceWorker();
        }
        
        if ('geolocation' in navigator) {
            this.enhanceGeolocation();
        }
        
        if ('mediaDevices' in navigator) {
            this.setupMediaCapture();
        }
    }

    // Utility Methods
    triggerHapticFeedback(type = 'light') {
        if (window.CapacitorBridge) {
            window.CapacitorBridge.hapticImpact(type);
        }
    }

    showToast(message, type = 'info') {
        if (window.CapacitorBridge) {
            window.CapacitorBridge.showToast(message);
        } else {
            this.showWebToast(message, type);
        }
    }

    showWebToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${this.getToastClass(type)}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    getToastClass(type) {
        const classes = {
            'success': 'bg-green-600 text-white',
            'error': 'bg-red-600 text-white',
            'warning': 'bg-yellow-600 text-white',
            'info': 'bg-blue-600 text-white'
        };
        return classes[type] || classes['info'];
    }

    openSidebar() {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar && overlay) {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    performRefresh() {
        // Implement refresh logic
        console.log('Performing refresh...');
        this.showToast('Actualizando datos...', 'info');
        
        // Simulate refresh
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    syncPendingData() {
        // Implement data sync logic
        console.log('Syncing pending data...');
    }

    refreshData() {
        // Refresh current view data
        console.log('Refreshing data...');
    }

    pauseAnimations() {
        document.body.classList.add('reduce-motion');
    }

    resumeAnimations() {
        document.body.classList.remove('reduce-motion');
    }

    reducePerformance() {
        // Reduce performance for background operation
        document.body.classList.add('low-performance');
    }

    restorePerformance() {
        document.body.classList.remove('low-performance');
    }

    handleMapZoom(scale) {
        // Handle map zoom for pinch gestures
        console.log('Map zoom:', scale);
    }

    setupServiceWorker() {
        // Service worker setup
        console.log('Setting up service worker...');
    }

    enhanceGeolocation() {
        // Enhanced geolocation features
        console.log('Enhancing geolocation...');
    }

    setupMediaCapture() {
        // Media capture enhancements
        console.log('Setting up media capture...');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.MobileEnhancements = new MobileEnhancements();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileEnhancements;
}