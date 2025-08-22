/**
 * Storage Service - localStorage management for Adbid
 */
const Storage = {
    // Prefix for all keys
    prefix: 'adbid_',
    
    // Storage keys
    keys: {
        USER: 'user',
        CAMPAIGNS: 'campaigns',
        AUDIENCES: 'audiences',
        CREATIVES: 'creatives',
        PIXELS: 'pixels',
        INTEGRATIONS: 'integrations',
        SETTINGS: 'settings',
        ANALYTICS: 'analytics',
        BILLING: 'billing',
        NOTIFICATIONS: 'notifications',
        DRAFT_CAMPAIGN: 'draft_campaign',
        META_ADS_ACCOUNTS: 'meta_ads_accounts'
    },
    
    // Save data
    set(key, value) {
        try {
            const fullKey = this.prefix + key;
            const data = JSON.stringify({
                value: value,
                timestamp: Date.now()
            });
            localStorage.setItem(fullKey, data);
            return true;
        } catch (error) {
            console.error('Storage.set error:', error);
            return false;
        }
    },
    
    // Get data
    get(key, defaultValue = null) {
        try {
            const fullKey = this.prefix + key;
            const data = localStorage.getItem(fullKey);
            if (!data) return defaultValue;
            
            const parsed = JSON.parse(data);
            return parsed.value || defaultValue;
        } catch (error) {
            console.error('Storage.get error:', error);
            return defaultValue;
        }
    },
    
    // Delete data
    remove(key) {
        try {
            const fullKey = this.prefix + key;
            localStorage.removeItem(fullKey);
            return true;
        } catch (error) {
            console.error('Storage.remove error:', error);
            return false;
        }
    },
    
    // Clear all application data
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Storage.clear error:', error);
            return false;
        }
    },
    
    // Check if key exists
    has(key) {
        const fullKey = this.prefix + key;
        return localStorage.getItem(fullKey) !== null;
    },
    
    // Add item to array
    addToArray(key, item) {
        const array = this.get(key, []);
        array.push(item);
        return this.set(key, array);
    },
    
    // Update item in array by ID
    updateInArray(key, itemId, updates) {
        const array = this.get(key, []);
        const index = array.findIndex(item => item.id === itemId);
        if (index !== -1) {
            array[index] = { ...array[index], ...updates };
            return this.set(key, array);
        }
        return false;
    },
    
    // Remove item from array by ID
    removeFromArray(key, itemId) {
        const array = this.get(key, []);
        const filtered = array.filter(item => item.id !== itemId);
        return this.set(key, filtered);
    },
    
    // Get storage size
    getSize() {
        let size = 0;
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                size += localStorage[key].length;
            }
        });
        return size;
    },
    
    // Export all data
    exportData() {
        const data = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                const cleanKey = key.replace(this.prefix, '');
                data[cleanKey] = this.get(cleanKey);
            }
        });
        return data;
    },
    
    // Import data
    importData(data) {
        try {
            Object.keys(data).forEach(key => {
                this.set(key, data[key]);
            });
            return true;
        } catch (error) {
            console.error('Storage.importData error:', error);
            return false;
        }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}