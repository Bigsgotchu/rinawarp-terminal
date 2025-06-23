/**
 * RinaWarp Terminal - Integration Init
 * Copyright (c) 2025 RinaWarp Technologies
 * 
 * This file is part of RinaWarp Terminal, an advanced open-source terminal emulator with
 * AI assistance, live collaboration, and enterprise-grade security features.
 * 
 * Licensed under the MIT License.
 * See LICENSE file for detailed terms and conditions.
 * 
 * Project repository: https://github.com/rinawarp/terminal
 */
// Import integration modules
import '../integration-layer/main-integration.js';


class RinaWarpInitializer {
    constructor() {
        this.isInitialized = false;
        this.integrationSystem = null;
    }

    
    async initialize() {
        if (this.isInitialized) {
            console.log('[RinaWarp] System already initialized');
            return this.integrationSystem;
        }

        try {
            console.log('[RinaWarp] Starting RinaWarp Terminal Integration System...');
            console.log('[RinaWarp] Version: 1.0.0');
            console.log('[RinaWarp] Copyright (c) 2025 RinaWarp Technologies');
            
            // Check if integration system is available
            if (typeof window.rinaWarpIntegration === 'undefined') {
                throw new Error('Integration system not loaded. Please ensure all modules are properly imported.');
            }

            // Initialize the integration system
            this.integrationSystem = window.rinaWarpIntegration;
            await this.integrationSystem.initialize();

            // Setup global event handlers
            this.setupGlobalEventHandlers();

            // Initialize terminal manager integration
            this.integrateWithTerminalManager();

            // Setup status monitoring
            this.setupStatusMonitoring();

            // Initialize Enhanced Beginner-Friendly UI
            await this.initializeBeginnerFriendlyUI();

            this.isInitialized = true;
            
            console.log('[RinaWarp] ✅ Integration system initialized successfully!');
            console.log('[RinaWarp] All features are now coordinated through the unified system.');
            
            // Display system status
            this.displaySystemStatus();
            
            return this.integrationSystem;
            
        } catch (error) {
            console.error('[RinaWarp] ❌ Failed to initialize integration system:', error);
            throw error;
        }
    }

    
    setupGlobalEventHandlers() {
        // Handle system errors
        window.addEventListener('error', (event) => {
            if (this.integrationSystem) {
                this.integrationSystem.hub.eventBus.emit('system:error', {
                    error: event.error,
                    filename: event.filename,
                    lineno: event.lineno,
                    timestamp: Date.now()
                });
            }
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            if (this.integrationSystem) {
                this.integrationSystem.hub.eventBus.emit('system:unhandled-rejection', {
                    reason: event.reason,
                    timestamp: Date.now()
                });
            }
        });

        // Handle window focus/blur for optimization
        window.addEventListener('focus', () => {
            if (this.integrationSystem) {
                this.integrationSystem.hub.eventBus.emit('system:focus');
            }
        });

        window.addEventListener('blur', () => {
            if (this.integrationSystem) {
                this.integrationSystem.hub.eventBus.emit('system:blur');
            }
        });
    }

    
    integrateWithTerminalManager() {
        // Check if TerminalManager exists
        if (typeof window.TerminalManager !== 'undefined') {
            console.log('[RinaWarp] Integrating with existing TerminalManager...');
            
            // Extend TerminalManager with integration capabilities
            const originalTerminalManager = window.TerminalManager;
            
            // Override createTerminal to emit integration events
            const originalCreateTerminal = originalTerminalManager.prototype.createTerminal;
            originalTerminalManager.prototype.createTerminal = function(...args) {
                const result = originalCreateTerminal.apply(this, args);
                
                // Emit terminal creation event
                if (window.rinaWarpIntegration) {
                    window.rinaWarpIntegration.hub.eventBus.emit('terminal:created', {
                        terminalId: this.terminals.size,
                        timestamp: Date.now()
                    });
                }
                
                return result;
            };
            
            console.log('[RinaWarp] ✅ TerminalManager integration complete');
        } else {
            console.log('[RinaWarp] ⚠️ TerminalManager not found, skipping integration');
        }
    }

    
    setupStatusMonitoring() {
        // Monitor system status every 30 seconds
        setInterval(() => {
            if (this.integrationSystem) {
                const status = this.integrationSystem.getSystemStatus();
                
                // Check for any issues
                if (status.hub.featureCount === 0) {
                    console.warn('[RinaWarp] ⚠️ No features registered in integration system');
                }
                
                // Emit status update event
                this.integrationSystem.hub.eventBus.emit('system:status-update', status);
            }
        }, 30000);
    }

    async initializeBeginnerFriendlyUI() {
        try {
            console.log('[RinaWarp] 🎯 Initializing Enhanced Beginner-Friendly UI...');
            
            // Dynamic import to avoid bundling issues
            const beginnerUIModule = await import('./beginner-friendly-ui.js');
            const BeginnerFriendlyUI = beginnerUIModule.BeginnerFriendlyUI;
            
            // Create and initialize the UI
            window.beginnerUI = new BeginnerFriendlyUI(window.terminalManager);
            
            // Register with integration system
            if (this.integrationSystem && this.integrationSystem.hub) {
                this.integrationSystem.hub.registerFeature('beginner-ui', {
                    name: 'Enhanced Beginner-Friendly UI',
                    version: '2.0.0',
                    status: 'active',
                    instance: window.beginnerUI
                });
            }
            
            console.log('[RinaWarp] 🎯 ✅ Enhanced Beginner-Friendly UI initialized successfully!');
            
        } catch (error) {
            console.warn('[RinaWarp] ⚠️ Could not load Enhanced Beginner-Friendly UI:', error.message);
            console.log('[RinaWarp] Continuing without enhanced UI features...');
        }
    }

    
    displaySystemStatus() {
        if (!this.integrationSystem) return;
        
        const status = this.integrationSystem.getSystemStatus();
        
        console.group('[RinaWarp] System Status');
        console.log('🔧 Integration Version:', status.integration.version);
        console.log('📊 Features Registered:', status.integration.featuresCount);
        console.log('🏗️ Hub Version:', status.hub.hubVersion);
        console.log('✅ Hub Initialized:', status.hub.isInitialized);
        
        if (status.features && Object.keys(status.features).length > 0) {
            console.log('📋 Feature Status:');
            for (const [name, featureStatus] of Object.entries(status.features)) {
                const icon = featureStatus.isActive ? '🟢' : '🔴';
                console.log(`  ${icon} ${name}: ${featureStatus.status}`);
            }
        }
        
        console.groupEnd();
    }

    
    getIntegrationSystem() {
        return this.integrationSystem;
    }

    
    async shutdown() {
        if (this.integrationSystem) {
            console.log('[RinaWarp] Shutting down integration system...');
            await this.integrationSystem.shutdown();
            this.isInitialized = false;
            console.log('[RinaWarp] ✅ Integration system shutdown complete');
        }
    }
}

// Create global initializer instance
const rinaWarpInitializer = new RinaWarpInitializer();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        rinaWarpInitializer.initialize().catch(error => {
            console.error('[RinaWarp] Auto-initialization failed:', error);
        });
    });
} else {
    // DOM already loaded, initialize immediately
    rinaWarpInitializer.initialize().catch(error => {
        console.error('[RinaWarp] Auto-initialization failed:', error);
    });
}

// Export for manual control
window.rinaWarpInitializer = rinaWarpInitializer;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RinaWarpInitializer, rinaWarpInitializer };
}

export { RinaWarpInitializer, rinaWarpInitializer };

