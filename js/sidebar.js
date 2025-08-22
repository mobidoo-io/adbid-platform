/**
 * Campaign Sidebar Component
 * Fixed version - no duplicates
 */

(function() {
    'use strict';
    
    // CRITICAL: Check if sidebar exists FIRST before doing ANYTHING
    const existingSidebar = document.querySelector('aside.sidebar');
    if (existingSidebar) {
        console.log('Sidebar already exists, skipping initialization');
        return; // Exit immediately
    }
    
    // Also check global flag
    if (window.__sidebarInitialized === true) {
        console.log('Sidebar already initialized globally, skipping');
        return; // Exit immediately
    }
    
    // Set flag immediately to prevent race conditions
    window.__sidebarInitialized = true;
    
    // Get current page from URL
    function getCurrentStep() {
        const path = window.location.pathname;
        if (path.includes('new-campaign')) return 1;
        if (path.includes('step2')) return 2;
        if (path.includes('step3')) return 3;
        if (path.includes('step4')) return 4;
        if (path.includes('step5')) return 5;
        return 1;
    }

    // Generate sidebar HTML
    function generateSidebarHTML() {
        const currentStep = getCurrentStep();
        
        return `
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon">⚡</div>
                    <span>AdBid</span>
                </div>
            </div>
            
            <nav class="sidebar-nav">
                <div class="nav-section">
                    <div class="nav-section-title">Main</div>
                    <a href="dashboard.html" class="nav-item">
                        <span class="nav-item-icon">📊</span>
                        <span>Overview</span>
                    </a>
                    <a href="campaigns.html" class="nav-item">
                        <span class="nav-item-icon">🚀</span>
                        <span>Campaigns</span>
                        <span class="nav-badge">12</span>
                    </a>
                    <a href="new-campaign.html" class="nav-item ${currentStep >= 1 && currentStep <= 5 ? 'active' : ''}">
                        <span class="nav-item-icon">➕</span>
                        <span>Create Campaign</span>
                    </a>
                    <a href="analytics.html" class="nav-item">
                        <span class="nav-item-icon">📈</span>
                        <span>Analytics</span>
                    </a>
                </div>
                
                
                <div class="nav-section">
                    <div class="nav-section-title">Assets</div>
                    <a href="audiences.html" class="nav-item">
                        <span class="nav-item-icon">👥</span>
                        <span>Audiences</span>
                    </a>
                    <a href="creatives.html" class="nav-item">
                        <span class="nav-item-icon">🎨</span>
                        <span>Creatives</span>
                    </a>
                    <a href="pixels.html" class="nav-item">
                        <span class="nav-item-icon">📍</span>
                        <span>Pixels & Events</span>
                    </a>
                </div>
                
                <div class="nav-section">
                    <div class="nav-section-title">Integrations</div>
                    <a href="platforms.html" class="nav-item">
                        <span class="nav-item-icon">🔌</span>
                        <span>Platforms</span>
                    </a>
                    <a href="meta-ads.html" class="nav-item">
                        <span class="nav-item-icon">📘</span>
                        <span>Meta Ads</span>
                    </a>
                </div>
                
                <div class="nav-section">
                    <div class="nav-section-title">Admin</div>
                    <a href="billing.html" class="nav-item">
                        <span class="nav-item-icon">💳</span>
                        <span>Billing</span>
                    </a>
                    <a href="settings.html" class="nav-item">
                        <span class="nav-item-icon">⚙️</span>
                        <span>Settings</span>
                    </a>
                </div>
            </nav>
        </aside>
        `;
    }

    // Insert sidebar into page
    function initSidebar() {
        // CRITICAL: Remove any existing navigation sidebars first (but not right-sidebar)
        const existingSidebars = document.querySelectorAll('aside.sidebar');
        existingSidebars.forEach(sidebar => {
            console.log('Removing existing navigation sidebar');
            sidebar.remove();
        });
        
        // Find dashboard-layout
        const dashboardLayout = document.querySelector('.dashboard-layout');
        
        if (dashboardLayout) {
            // Create sidebar element
            const temp = document.createElement('div');
            temp.innerHTML = generateSidebarHTML();
            const sidebarElement = temp.firstElementChild;
            
            // Add unique ID to prevent duplicates
            sidebarElement.id = 'main-sidebar-' + Date.now();
            
            // Insert as first child of dashboard-layout
            dashboardLayout.insertBefore(sidebarElement, dashboardLayout.firstChild);
            console.log('Sidebar inserted with ID:', sidebarElement.id);
        } else {
            console.log('No dashboard-layout found');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        // DOM already loaded
        initSidebar();
    }
})();

// Quick action functions (keep them in global scope)
window.saveDraft = function() {
        const campaignData = window.wizard?.campaignData || {};
        localStorage.setItem('adbid_draft_campaign', JSON.stringify(campaignData));
        alert('Campaign draft saved successfully!');
    }

    window.loadTemplate = function() {
        alert('Template library coming soon!');
    }

    window.duplicateLastCampaign = function() {
        const campaigns = JSON.parse(localStorage.getItem('adbid_campaigns') || '[]');
        if (campaigns.length > 0) {
            const lastCampaign = campaigns[campaigns.length - 1];
            alert(`Duplicating campaign: ${lastCampaign.name}`);
            // Load campaign data
            if (window.wizard) {
                window.wizard.campaignData = {...lastCampaign};
                window.wizard.populateFields();
            }
        } else {
            alert('No campaigns to duplicate');
        }
    }

    window.loadCampaign = function(id) {
        alert(`Loading campaign ${id}...`);
    }

    window.importCampaign = function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        if (window.wizard) {
                            window.wizard.campaignData = data;
                            window.wizard.populateFields();
                        }
                        alert('Campaign imported successfully!');
                    } catch (error) {
                        alert('Invalid file format');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    window.exportCampaign = function() {
        const campaignData = window.wizard?.campaignData || {};
        const dataStr = JSON.stringify(campaignData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'campaign-export.json');
        linkElement.click();
    }

window.openGuide = function() {
    window.open('https://help.adbid.com/campaign-creation', '_blank');
}