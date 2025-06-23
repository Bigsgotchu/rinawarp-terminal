/**
 * RinaWarp Terminal - Phase 2 Status Checker
 * Quick diagnostic tool to check Phase 2 integration status
 */

console.log('\n🔍 RinaWarp Terminal Phase 2 Status Check');
console.log('==========================================\n');

// Check if we're in browser context
if (typeof window !== 'undefined') {
    console.log('✅ Running in browser context');
    
    // Check for Phase 2 global instance
    if (window.RinaWarpPhase2) {
        console.log('✅ Phase 2 global instance found');
        console.log(`   - Initialized: ${window.RinaWarpPhase2.isReady()}`);
        console.log(`   - Active: ${window.RinaWarpPhase2.isActive()}`);
        
        if (window.RinaWarpPhase2.getUIManager()) {
            console.log('✅ UI Manager available');
            console.log(`   - Current Mode: ${window.RinaWarpPhase2.getUIManager().getCurrentMode()}`);
        } else {
            console.log('❌ UI Manager not available');
        }
        
        const featureFlags = window.RinaWarpPhase2.getFeatureFlags();
        console.log('🎛️ Feature Flags:');
        featureFlags.forEach((value, key) => {
            console.log(`   - ${key}: ${value ? '✅' : '❌'}`);
        });
        
    } else {
        console.log('❌ Phase 2 global instance not found');
    }
    
    // Check for Phase 2 UI elements
    const phase2Container = document.querySelector('.phase2-ui-container');
    if (phase2Container) {
        console.log('✅ Phase 2 UI container found');
        console.log(`   - Visible: ${phase2Container.style.display !== 'none'}`);
        console.log(`   - Classes: ${phase2Container.className}`);
    } else {
        console.log('❌ Phase 2 UI container not found');
    }
    
    // Check for Phase 2 stylesheets
    const phase2CSS = document.querySelector('link[href*="phase2-ui.css"]');
    if (phase2CSS) {
        console.log('✅ Phase 2 CSS loaded');
    } else {
        console.log('❌ Phase 2 CSS not loaded');
    }
    
    // Check for Phase 2 scripts
    const phase2Script = document.querySelector('script[src*="phase2-integration.js"]');
    if (phase2Script) {
        console.log('✅ Phase 2 integration script found');
    } else {
        console.log('❌ Phase 2 integration script not found');
    }
    
} else {
    console.log('❌ Not running in browser context');
}

// Check Phase 2 events
if (typeof window !== 'undefined') {
    console.log('\n🎧 Setting up Phase 2 event listeners...');
    
    window.addEventListener('rinawarp-phase2-integration-ready', () => {
        console.log('🎉 Phase 2 Integration Ready Event Received!');
    });
    
    window.addEventListener('rinawarp-phase2-activated', () => {
        console.log('🚀 Phase 2 Activated Event Received!');
    });
    
    window.addEventListener('rinawarp-phase2-mode-changed', (e) => {
        console.log(`🔄 Phase 2 Mode Changed: ${e.detail[0]}`);
    });
}

console.log('\n📝 Status check complete. Open browser DevTools (F12) to see full output.');
console.log('💡 If Phase 2 is not active, try pressing Ctrl+Shift+P to open the command palette.');

