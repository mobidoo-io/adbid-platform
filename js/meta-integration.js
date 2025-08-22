/**
 * Meta Ads Integration - Meta ad accounts management
 */
class MetaIntegration {
    constructor() {
        this.accounts = [];
        this.businessManager = null;
        this.init();
    }
    
    init() {
        // Load saved accounts
        this.loadAccounts();
        
        // Initialize UI
        this.initUI();
        
        // Event handlers
        this.initEventHandlers();
        
        console.log('Meta Integration initialized');
    }
    
    // Load accounts from localStorage
    loadAccounts() {
        this.accounts = Storage.get(Storage.keys.META_ADS_ACCOUNTS, []);
        
        // If no accounts, add demo accounts
        if (this.accounts.length === 0) {
            this.accounts = [
                {
                    id: 'act_123456789',
                    name: 'Main Business Account',
                    status: 'active',
                    currency: 'USD',
                    timezone: 'America/New_York',
                    spend: 15234.56,
                    campaigns: 12,
                    connected: true,
                    lastSync: new Date().toISOString()
                },
                {
                    id: 'act_987654321',
                    name: 'Secondary Account',
                    status: 'active',
                    currency: 'EUR',
                    timezone: 'Europe/London',
                    spend: 8923.12,
                    campaigns: 8,
                    connected: true,
                    lastSync: new Date().toISOString()
                }
            ];
            this.saveAccounts();
        }
    }
    
    // Save accounts
    saveAccounts() {
        Storage.set(Storage.keys.META_ADS_ACCOUNTS, this.accounts);
    }
    
    // Инициализация UI
    initUI() {
        // Display accounts list
        this.renderAccounts();
        
        // Add connect new account button
        this.addConnectButton();
    }
    
    // Add connect button
    addConnectButton() {
        const container = document.querySelector('.accounts-header, .header-right');
        if (container && !document.querySelector('.add-account-btn')) {
            const button = document.createElement('button');
            button.className = 'add-account-btn';
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
                <span>Add Ad Account</span>
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
                <h3 style="margin-bottom: 24px; font-size: 18px; font-weight: 600;">Connect Meta Ad Account</h3>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Connection Method</label>
                    <div style="display: grid; gap: 12px;">
                        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="method" value="oauth" checked onchange="metaIntegration.updateConnectionMethod('oauth')">
                            <div>
                                <div style="font-weight: 500;">Facebook OAuth</div>
                                <div style="font-size: 12px; color: #6b7280;">Connect via Facebook login (Recommended)</div>
                            </div>
                        </label>
                        <label style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="method" value="manual" onchange="metaIntegration.updateConnectionMethod('manual')">
                            <div>
                                <div style="font-weight: 500;">Manual Entry</div>
                                <div style="font-size: 12px; color: #6b7280;">Enter account ID and access token manually</div>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div id="oauth-section">
                    <p style="margin-bottom: 16px; color: #6b7280;">You'll be redirected to Facebook to authorize access to your ad accounts.</p>
                    <button onclick="metaIntegration.connectViaOAuth()" style="
                        width: 100%;
                        padding: 12px;
                        background: #0081FB;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Connect with Facebook</button>
                </div>
                
                <div id="manual-section" style="display: none;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Account ID</label>
                        <input type="text" id="account-id" placeholder="act_123456789" style="
                            width: 100%;
                            padding: 10px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                        ">
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Access Token</label>
                        <input type="password" id="access-token" placeholder="Your access token" style="
                            width: 100%;
                            padding: 10px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                        ">
                    </div>
                    <button onclick="metaIntegration.connectManually()" style="
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
                        <a href="#" style="color: #0081FB;">View setup guide</a> • 
                        <a href="#" style="color: #0081FB;">Get access token</a>
                    </p>
                </div>
            </div>
        `;
        
        if (window.app) {
            window.app.showModal('Connect Meta Ad Account', modalContent);
        }
    }
    
    // Update connection method
    updateConnectionMethod(method) {
        const oauthSection = document.getElementById('oauth-section');
        const manualSection = document.getElementById('manual-section');
        
        if (method === 'oauth') {
            oauthSection.style.display = 'block';
            manualSection.style.display = 'none';
        } else {
            oauthSection.style.display = 'none';
            manualSection.style.display = 'block';
        }
    }
    
    // Connect via OAuth
    connectViaOAuth() {
        if (window.app) {
            window.app.closeModal();
            window.app.showNotification('Redirecting to Facebook...', 'info');
        }
        
        // Simulate OAuth process
        setTimeout(() => {
            // Simulate getting accounts from Facebook
            const mockAccounts = [
                {
                    id: `act_${Date.now()}`,
                    name: 'New Business Account',
                    currency: 'USD',
                    timezone: 'America/Los_Angeles'
                },
                {
                    id: `act_${Date.now() + 1}`,
                    name: 'E-commerce Account',
                    currency: 'USD',
                    timezone: 'America/New_York'
                }
            ];
            
            this.showAccountSelector(mockAccounts);
        }, 2000);
    }
    
    // Show account selector
    showAccountSelector(availableAccounts) {
        const modalContent = `
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">Select Ad Accounts to Connect</h3>
                <p style="margin-bottom: 20px; color: #6b7280;">Choose which ad accounts you want to manage in AdBid:</p>
                
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
                                    ${account.id} • ${account.currency} • ${account.timezone}
                                </div>
                            </div>
                        </label>
                    `).join('')}
                </div>
                
                <button onclick="metaIntegration.confirmAccountSelection()" style="
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
            window.app.showModal('Select Ad Accounts', modalContent);
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
                    name: `Account ${id.slice(-6)}`,
                    status: 'active',
                    currency: 'USD',
                    timezone: 'America/New_York',
                    spend: 0,
                    campaigns: 0,
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
        const accountId = document.getElementById('account-id').value;
        const accessToken = document.getElementById('access-token').value;
        
        if (!accountId || !accessToken) {
            if (window.app) {
                window.app.showNotification('Please fill in all fields', 'error');
            }
            return;
        }
        
        // Add new account
        const newAccount = {
            id: accountId,
            name: `Account ${accountId.slice(-6)}`,
            status: 'active',
            currency: 'USD',
            timezone: 'America/New_York',
            spend: 0,
            campaigns: 0,
            connected: true,
            accessToken: btoa(accessToken), // Simple encoding for demo
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
        const container = document.querySelector('.accounts-list, .accounts-grid');
        if (!container) return;
        
        if (this.accounts.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
                    <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">No Ad Accounts Connected</h3>
                    <p style="color: #6b7280; margin-bottom: 24px;">Connect your Meta ad accounts to start managing campaigns</p>
                    <button onclick="metaIntegration.showConnectModal()" style="
                        padding: 12px 24px;
                        background: #FFD93D;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Connect First Account</button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.accounts.map(account => `
            <div class="account-card" style="
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 16px;
            ">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                            ${account.name}
                        </h3>
                        <p style="font-size: 14px; color: #6b7280; margin-bottom: 16px;">
                            ${account.id} • ${account.currency} • ${account.timezone}
                        </p>
                        <div style="display: flex; gap: 24px;">
                            <div>
                                <div style="font-size: 12px; color: #6b7280;">Spend</div>
                                <div style="font-size: 20px; font-weight: 600;">$${account.spend.toLocaleString()}</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #6b7280;">Campaigns</div>
                                <div style="font-size: 20px; font-weight: 600;">${account.campaigns}</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #6b7280;">Status</div>
                                <div style="
                                    display: inline-block;
                                    padding: 4px 12px;
                                    background: ${account.status === 'active' ? '#d1fae5' : '#fee2e2'};
                                    color: ${account.status === 'active' ? '#065f46' : '#991b1b'};
                                    border-radius: 20px;
                                    font-size: 12px;
                                    font-weight: 600;
                                    margin-top: 4px;
                                ">${account.status}</div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="metaIntegration.syncAccount('${account.id}')" style="
                            padding: 8px 16px;
                            background: white;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                            font-size: 14px;
                            cursor: pointer;
                        ">Sync</button>
                        <button onclick="metaIntegration.manageAccount('${account.id}')" style="
                            padding: 8px 16px;
                            background: #8B5CF6;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            font-size: 14px;
                            cursor: pointer;
                        ">Manage</button>
                        <button onclick="metaIntegration.removeAccount('${account.id}')" style="
                            padding: 8px;
                            background: white;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                            cursor: pointer;
                            color: #ef4444;
                        ">×</button>
                    </div>
                </div>
            </div>
        `).join('');
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
                account.campaigns = Math.floor(Math.random() * 20) + 1;
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
        if (account) {
            if (window.app) {
                window.app.showModal(`Manage ${account.name}`, `
                    <div style="padding: 20px;">
                        <h4>Account Settings</h4>
                        <p>Account ID: ${account.id}</p>
                        <p>Status: ${account.status}</p>
                        <p>Last Sync: ${new Date(account.lastSync).toLocaleString()}</p>
                        <br>
                        <button onclick="metaIntegration.editAccount('${accountId}')" style="
                            padding: 10px 20px;
                            background: #FFD93D;
                            border: none;
                            border-radius: 6px;
                            font-weight: 600;
                            cursor: pointer;
                        ">Edit Settings</button>
                    </div>
                `);
            }
        }
    }
    
    // Remove account
    removeAccount(accountId) {
        if (confirm('Are you sure you want to disconnect this account?')) {
            this.accounts = this.accounts.filter(acc => acc.id !== accountId);
            this.saveAccounts();
            this.renderAccounts();
            
            if (window.app) {
                window.app.showNotification('Account disconnected', 'success');
            }
        }
    }
    
    // Edit account
    editAccount(accountId) {
        const account = this.accounts.find(acc => acc.id === accountId);
        if (!account) return;
        
        const modalContent = `
            <div style="padding: 20px;">
                <h3 style="margin-bottom: 20px;">Edit Account Settings</h3>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Account Name</label>
                    <input type="text" id="edit-name" value="${account.name}" style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Currency</label>
                    <select id="edit-currency" style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                        <option value="USD" ${account.currency === 'USD' ? 'selected' : ''}>USD</option>
                        <option value="EUR" ${account.currency === 'EUR' ? 'selected' : ''}>EUR</option>
                        <option value="GBP" ${account.currency === 'GBP' ? 'selected' : ''}>GBP</option>
                    </select>
                </div>
                <button onclick="metaIntegration.saveAccountSettings('${accountId}')" style="
                    width: 100%;
                    padding: 12px;
                    background: #FFD93D;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                ">Save Changes</button>
            </div>
        `;
        
        if (window.app) {
            window.app.showModal('Edit Account', modalContent);
        }
    }
    
    // Save account settings
    saveAccountSettings(accountId) {
        const account = this.accounts.find(acc => acc.id === accountId);
        if (account) {
            account.name = document.getElementById('edit-name').value;
            account.currency = document.getElementById('edit-currency').value;
            
            this.saveAccounts();
            this.renderAccounts();
            
            if (window.app) {
                window.app.closeModal();
                window.app.showNotification('Account settings updated', 'success');
            }
        }
    }
    
    // Initialize event handlers
    initEventHandlers() {
        // Handler for "Show all ad accounts" button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('show-all-btn')) {
                e.preventDefault();
                this.showAllAccounts();
            }
        });
    }
    
    // Show all accounts
    showAllAccounts() {
        // Add hidden accounts for demonstration
        const hiddenAccounts = [
            {
                id: 'act_hidden_001',
                name: 'Restricted Account',
                status: 'restricted',
                currency: 'USD',
                timezone: 'America/Chicago',
                spend: 0,
                campaigns: 0,
                connected: false,
                reason: 'Policy violation',
                lastSync: null
            }
        ];
        
        this.showAccountSelector(hiddenAccounts);
    }
}

// Initialize Meta Integration
let metaIntegration;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        metaIntegration = new MetaIntegration();
        window.metaIntegration = metaIntegration;
    });
} else {
    metaIntegration = new MetaIntegration();
    window.metaIntegration = metaIntegration;
}