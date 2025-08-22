/**
 * Google Ads Integration - Google ad accounts management
 */
class GoogleIntegration {
    constructor() {
        this.accounts = [];
        this.currentMCC = null;
        this.init();
    }
    
    init() {
        // Load saved accounts
        this.loadAccounts();
        
        // Initialize UI
        this.initUI();
        
        // Event handlers
        this.initEventHandlers();
        
        console.log('Google Integration initialized');
    }
    
    // Load accounts from localStorage
    loadAccounts() {
        this.accounts = Storage.get('google_ads_accounts', []);
        
        // If no accounts, add demo accounts
        if (this.accounts.length === 0) {
            this.accounts = [
                {
                    id: '123-456-7890',
                    name: 'Main Google Ads Account',
                    type: 'standard',
                    status: 'active',
                    currency: 'USD',
                    timezone: 'America/New_York',
                    spend: 23456.78,
                    campaigns: 18,
                    budget: 100,
                    connected: true,
                    lastSync: new Date().toISOString()
                },
                {
                    id: '234-567-8901',
                    name: 'E-commerce Account',
                    type: 'manager',
                    status: 'active',
                    currency: 'USD',
                    timezone: 'America/Los_Angeles',
                    spend: 45678.90,
                    campaigns: 32,
                    budget: 250,
                    connected: true,
                    lastSync: new Date().toISOString()
                }
            ];
            this.saveAccounts();
        }
    }
    
    // Save accounts
    saveAccounts() {
        Storage.set('google_ads_accounts', this.accounts);
    }
    
    // Initialize UI
    initUI() {
        // Display accounts list
        this.renderAccounts();
        
        // Add connect new account button
        this.addConnectButton();
    }
    
    // Add connect button
    addConnectButton() {
        const container = document.querySelector('.accounts-header, .header-right');
        if (container && !document.querySelector('.add-google-account-btn')) {
            const button = document.createElement('button');
            button.className = 'add-google-account-btn';
            button.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 20px;
                background: #FFD93D;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            `;
            button.innerHTML = `
                <span>+</span>
                <span>Add Google Ads Account</span>
            `;
            button.onclick = () => this.showConnectModal();
            
            // Insert button into header
            const header = document.querySelector('.header');
            if (header) {
                const headerRight = header.querySelector('.header-right') || document.createElement('div');
                headerRight.className = 'header-right';
                headerRight.appendChild(button);
                if (!header.querySelector('.header-right')) {
                    header.appendChild(headerRight);
                }
            }
        }
    }
    
    // Show connection modal
    showConnectModal() {
        const modalContent = `
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 24px; font-size: 18px; font-weight: 600;">Connect Google Ads Account</h3>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Connection Method</label>
                    <div style="display: grid; gap: 12px;">
                        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="google-method" value="oauth" checked onchange="googleIntegration.updateConnectionMethod('oauth')">
                            <div>
                                <div style="font-weight: 500;">Google OAuth</div>
                                <div style="font-size: 12px; color: #6b7280;">Connect via Google login (Recommended)</div>
                            </div>
                        </label>
                        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="google-method" value="mcc" onchange="googleIntegration.updateConnectionMethod('mcc')">
                            <div>
                                <div style="font-weight: 500;">MCC Account</div>
                                <div style="font-size: 12px; color: #6b7280;">Connect via Manager Account (MCC)</div>
                            </div>
                        </label>
                        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="google-method" value="manual" onchange="googleIntegration.updateConnectionMethod('manual')">
                            <div>
                                <div style="font-weight: 500;">Customer ID</div>
                                <div style="font-size: 12px; color: #6b7280;">Enter Customer ID manually</div>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div id="google-oauth-section">
                    <p style="margin-bottom: 16px; color: #6b7280;">You'll be redirected to Google to authorize access to your Google Ads accounts.</p>
                    <button onclick="googleIntegration.connectViaOAuth()" style="
                        width: 100%;
                        padding: 12px;
                        background: #4285F4;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        <span style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84c-.21 1.13-.86 2.08-1.83 2.71v2.26h2.96c1.73-1.59 2.73-3.94 2.73-6.62z" fill="white"/>
                                <path d="M9 18c2.47 0 4.54-.82 6.05-2.18l-2.96-2.26c-.82.55-1.86.87-3.09.87-2.38 0-4.39-1.61-5.11-3.77H.96v2.33C2.44 15.98 5.48 18 9 18z" fill="white"/>
                                <path d="M3.89 10.66c-.18-.55-.29-1.13-.29-1.73s.11-1.18.29-1.73V4.87H.96C.35 6.09 0 7.47 0 8.93s.35 2.84.96 4.06l2.93-2.33z" fill="white"/>
                                <path d="M9 3.57c1.34 0 2.55.46 3.5 1.37l2.63-2.63C13.54.82 11.47 0 9 0 5.48 0 2.44 2.02.96 5.01l2.93 2.33C4.61 5.18 6.62 3.57 9 3.57z" fill="white"/>
                            </svg>
                            Sign in with Google
                        </span>
                    </button>
                </div>
                
                <div id="google-mcc-section" style="display: none;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">MCC Account ID</label>
                        <input type="text" id="mcc-id" placeholder="123-456-7890" style="
                            width: 100%;
                            padding: 10px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                        ">
                    </div>
                    <button onclick="googleIntegration.connectViaMCC()" style="
                        width: 100%;
                        padding: 12px;
                        background: #4285F4;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Connect MCC Account</button>
                </div>
                
                <div id="google-manual-section" style="display: none;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Customer ID</label>
                        <input type="text" id="customer-id" placeholder="123-456-7890" style="
                            width: 100%;
                            padding: 10px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                        ">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Account Name</label>
                        <input type="text" id="account-name" placeholder="My Google Ads Account" style="
                            width: 100%;
                            padding: 10px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                        ">
                    </div>
                    <button onclick="googleIntegration.connectManually()" style="
                        width: 100%;
                        padding: 12px;
                        background: #FFD93D;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Add Account</button>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <h4 style="font-weight: 500; margin-bottom: 8px;">Need help?</h4>
                    <p style="font-size: 14px; color: #6b7280;">
                        <a href="#" style="color: #4285F4;">View setup guide</a> • 
                        <a href="#" style="color: #4285F4;">Find Customer ID</a> • 
                        <a href="#" style="color: #4285F4;">MCC setup</a>
                    </p>
                </div>
            </div>
        `;
        
        if (window.app) {
            window.app.showModal('Connect Google Ads Account', modalContent);
        }
    }
    
    // Update connection method
    updateConnectionMethod(method) {
        const oauthSection = document.getElementById('google-oauth-section');
        const mccSection = document.getElementById('google-mcc-section');
        const manualSection = document.getElementById('google-manual-section');
        
        if (method === 'oauth') {
            oauthSection.style.display = 'block';
            mccSection.style.display = 'none';
            manualSection.style.display = 'none';
        } else if (method === 'mcc') {
            oauthSection.style.display = 'none';
            mccSection.style.display = 'block';
            manualSection.style.display = 'none';
        } else {
            oauthSection.style.display = 'none';
            mccSection.style.display = 'none';
            manualSection.style.display = 'block';
        }
    }
    
    // Connect via OAuth
    connectViaOAuth() {
        if (window.app) {
            window.app.closeModal();
            window.app.showNotification('Redirecting to Google...', 'info');
        }
        
        // Simulate OAuth process
        setTimeout(() => {
            // Simulate getting accounts from Google
            const mockAccounts = [
                {
                    id: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                    name: 'New Google Ads Account',
                    type: 'standard',
                    currency: 'USD',
                    timezone: 'America/Chicago'
                },
                {
                    id: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                    name: 'Shopping Campaign Account',
                    type: 'standard',
                    currency: 'USD',
                    timezone: 'America/New_York'
                }
            ];
            
            this.showAccountSelector(mockAccounts);
        }, 2000);
    }
    
    // Connect via MCC
    connectViaMCC() {
        const mccId = document.getElementById('mcc-id').value;
        
        if (!mccId) {
            if (window.app) {
                window.app.showNotification('Please enter MCC Account ID', 'error');
            }
            return;
        }
        
        if (window.app) {
            window.app.closeModal();
            window.app.showNotification('Connecting to MCC account...', 'info');
        }
        
        // Simulate getting MCC sub-accounts
        setTimeout(() => {
            const mockSubAccounts = [
                {
                    id: mccId,
                    name: 'MCC Manager Account',
                    type: 'manager',
                    currency: 'USD',
                    timezone: 'America/New_York'
                },
                {
                    id: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                    name: 'Sub Account 1',
                    type: 'standard',
                    currency: 'USD',
                    timezone: 'America/New_York'
                },
                {
                    id: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                    name: 'Sub Account 2',
                    type: 'standard',
                    currency: 'EUR',
                    timezone: 'Europe/London'
                }
            ];
            
            this.showAccountSelector(mockSubAccounts);
        }, 2000);
    }
    
    // Show account selector
    showAccountSelector(availableAccounts) {
        const modalContent = `
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">Select Google Ads Accounts to Connect</h3>
                <p style="margin-bottom: 20px; color: #6b7280;">Choose which accounts you want to manage in AdBid:</p>
                
                <div style="max-height: 400px; overflow-y: auto;">
                    ${availableAccounts.map(account => `
                        <label style="
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            padding: 16px;
                            margin-bottom: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            cursor: pointer;
                        ">
                            <input type="checkbox" value="${account.id}" checked>
                            <div style="flex: 1;">
                                <div style="font-weight: 500;">${account.name}</div>
                                <div style="font-size: 12px; color: #6b7280;">
                                    ${account.id} • ${account.type === 'manager' ? 'MCC' : 'Standard'} • ${account.currency} • ${account.timezone}
                                </div>
                            </div>
                            ${account.type === 'manager' ? '<span style="background: #fbbf24; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">MCC</span>' : ''}
                        </label>
                    `).join('')}
                </div>
                
                <button onclick="googleIntegration.confirmAccountSelection()" style="
                    width: 100%;
                    margin-top: 20px;
                    padding: 12px;
                    background: #FFD93D;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                ">Connect Selected Accounts</button>
            </div>
        `;
        
        if (window.app) {
            window.app.showModal('Select Google Ads Accounts', modalContent);
        }
    }
    
    // Confirm account selection
    confirmAccountSelection() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedIds = Array.from(checkboxes).map(cb => cb.value);
        
        // Add new accounts
        selectedIds.forEach(id => {
            if (!this.accounts.find(acc => acc.id === id)) {
                this.accounts.push({
                    id: id,
                    name: `Account ${id.slice(-4)}`,
                    type: id.includes('MCC') ? 'manager' : 'standard',
                    status: 'active',
                    currency: 'USD',
                    timezone: 'America/New_York',
                    spend: Math.random() * 10000,
                    campaigns: Math.floor(Math.random() * 20) + 1,
                    budget: Math.floor(Math.random() * 500) + 50,
                    connected: true,
                    lastSync: new Date().toISOString()
                });
            }
        });
        
        this.saveAccounts();
        this.renderAccounts();
        
        if (window.app) {
            window.app.closeModal();
            window.app.showNotification(`Successfully connected ${selectedIds.length} account(s)`, 'success');
        }
    }
    
    // Manual connection
    connectManually() {
        const customerId = document.getElementById('customer-id').value;
        const accountName = document.getElementById('account-name').value;
        
        if (!customerId || !accountName) {
            if (window.app) {
                window.app.showNotification('Please fill in all fields', 'error');
            }
            return;
        }
        
        // Add new account
        const newAccount = {
            id: customerId,
            name: accountName,
            type: 'standard',
            status: 'active',
            currency: 'USD',
            timezone: 'America/New_York',
            spend: 0,
            campaigns: 0,
            budget: 0,
            connected: true,
            lastSync: new Date().toISOString()
        };
        
        this.accounts.push(newAccount);
        this.saveAccounts();
        this.renderAccounts();
        
        if (window.app) {
            window.app.closeModal();
            window.app.showNotification('Account connected successfully', 'success');
        }
    }
    
    // Display accounts
    renderAccounts() {
        const container = document.querySelector('.accounts-list, .accounts-grid, .table-container tbody');
        if (!container) return;
        
        if (this.accounts.length === 0) {
            container.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 60px 20px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
                        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">No Google Ads Accounts Connected</h3>
                        <p style="color: #6b7280; margin-bottom: 24px;">Connect your Google Ads accounts to start managing campaigns</p>
                        <button onclick="googleIntegration.showConnectModal()" style="
                            padding: 12px 24px;
                            background: #FFD93D;
                            border: none;
                            border-radius: 8px;
                            font-weight: 600;
                            cursor: pointer;
                        ">Connect First Account</button>
                    </td>
                </tr>
            `;
            return;
        }
        
        // For Google Ads table
        if (container.tagName === 'TBODY') {
            container.innerHTML = this.accounts.map(account => `
                <tr>
                    <td style="padding: 16px;">
                        <input type="checkbox" style="width: 20px; height: 20px;">
                    </td>
                    <td style="padding: 16px;">
                        <div style="font-weight: 500;">${account.name}</div>
                        <div style="font-size: 12px; color: #6b7280;">${account.id}</div>
                    </td>
                    <td style="padding: 16px;">
                        ${account.type === 'manager' ? 
                            '<span style="background: #fbbf24; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px;">MCC</span>' : 
                            '<span style="background: #e5e7eb; color: #374151; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Standard</span>'
                        }
                    </td>
                    <td style="padding: 16px;">
                        <span style="
                            background: ${account.status === 'active' ? '#d1fae5' : '#fee2e2'};
                            color: ${account.status === 'active' ? '#065f46' : '#991b1b'};
                            padding: 4px 12px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: 600;
                        ">${account.status}</span>
                    </td>
                    <td style="padding: 16px;">
                        <div>$${account.spend.toLocaleString()}</div>
                        <div style="font-size: 12px; color: #6b7280;">Last 30 days</div>
                    </td>
                    <td style="padding: 16px;">
                        <div style="display: flex; gap: 8px;">
                            <button onclick="googleIntegration.syncAccount('${account.id}')" style="
                                padding: 6px 12px;
                                background: white;
                                border: 1px solid #d1d5db;
                                border-radius: 6px;
                                font-size: 13px;
                                cursor: pointer;
                            ">Sync</button>
                            <button onclick="googleIntegration.manageAccount('${account.id}')" style="
                                padding: 6px 12px;
                                background: #4285F4;
                                color: white;
                                border: none;
                                border-radius: 6px;
                                font-size: 13px;
                                cursor: pointer;
                            ">Manage</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }
    
    // Sync account
    syncAccount(accountId) {
        const account = this.accounts.find(acc => acc.id === accountId);
        if (account) {
            if (window.app) {
                window.app.showNotification(`Syncing ${account.name}...`, 'info');
            }
            
            // Simulate sync
            setTimeout(() => {
                account.lastSync = new Date().toISOString();
                account.spend = account.spend + Math.random() * 1000;
                account.campaigns = Math.floor(Math.random() * 30) + 1;
                this.saveAccounts();
                this.renderAccounts();
                
                if (window.app) {
                    window.app.showNotification(`${account.name} synced successfully`, 'success');
                }
            }, 2000);
        }
    }
    
    // Manage account
    manageAccount(accountId) {
        const account = this.accounts.find(acc => acc.id === accountId);
        if (account && window.app) {
            window.app.showModal(`Manage ${account.name}`, `
                <div style="padding: 20px;">
                    <h4>Account Details</h4>
                    <p>Customer ID: ${account.id}</p>
                    <p>Type: ${account.type === 'manager' ? 'MCC' : 'Standard'}</p>
                    <p>Status: ${account.status}</p>
                    <p>Currency: ${account.currency}</p>
                    <p>Timezone: ${account.timezone}</p>
                    <p>Daily Budget: $${account.budget}</p>
                    <p>Last Sync: ${new Date(account.lastSync).toLocaleString()}</p>
                    <br>
                    <button onclick="googleIntegration.removeAccount('${accountId}')" style="
                        padding: 10px 20px;
                        background: #ef4444;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Disconnect Account</button>
                </div>
            `);
        }
    }
    
    // Remove account
    removeAccount(accountId) {
        if (confirm('Are you sure you want to disconnect this account?')) {
            this.accounts = this.accounts.filter(acc => acc.id !== accountId);
            this.saveAccounts();
            this.renderAccounts();
            
            if (window.app) {
                window.app.closeModal();
                window.app.showNotification('Account disconnected', 'success');
            }
        }
    }
    
    // Initialize event handlers
    initEventHandlers() {
        // Handler for existing elements on page
        document.addEventListener('DOMContentLoaded', () => {
            // If this is Google Ads page
            if (window.location.pathname.includes('google-ads')) {
                this.renderAccounts();
            }
        });
    }
}

// Initialize Google Integration
let googleIntegration;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        googleIntegration = new GoogleIntegration();
        window.googleIntegration = googleIntegration;
    });
} else {
    googleIntegration = new GoogleIntegration();
    window.googleIntegration = googleIntegration;
}