/**
 * Mock Data Service - тестовые данные для Adbid
 */
const MockData = {
    // Пользователь
    user: {
        id: 'user_001',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'JD',
        role: 'admin',
        company: 'Example Corp',
        timezone: 'UTC-5',
        notifications: true,
        twoFactor: false
    },
    
    // Кампании
    campaigns: [
        {
            id: 'camp_001',
            name: 'Summer Sale 2025',
            status: 'active',
            budget: 10000,
            spent: 8234,
            roas: 3.8,
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            platform: 'Meta',
            objective: 'conversions',
            impressions: 245670,
            clicks: 3456,
            conversions: 234
        },
        {
            id: 'camp_002',
            name: 'App Install Campaign',
            status: 'active',
            budget: 5000,
            spent: 3421,
            roas: 4.2,
            startDate: '2025-07-15',
            endDate: '2025-09-15',
            platform: 'Google',
            objective: 'app_installs',
            impressions: 189234,
            clicks: 2341,
            conversions: 567
        },
        {
            id: 'camp_003',
            name: 'Holiday Promotion',
            status: 'draft',
            budget: 15000,
            spent: 0,
            roas: 0,
            startDate: '2025-12-01',
            endDate: '2025-12-31',
            platform: 'TikTok',
            objective: 'brand_awareness',
            impressions: 0,
            clicks: 0,
            conversions: 0
        }
    ],
    
    // Аудитории
    audiences: [
        {
            id: 'aud_001',
            name: 'High-Value Customers',
            size: 125000,
            type: 'custom',
            source: 'crm',
            status: 'ready',
            created: '2025-01-15',
            lastUpdated: '2025-08-18'
        },
        {
            id: 'aud_002',
            name: 'Cart Abandoners',
            size: 45000,
            type: 'retargeting',
            source: 'pixel',
            status: 'ready',
            created: '2025-02-01',
            lastUpdated: '2025-08-19'
        },
        {
            id: 'aud_003',
            name: 'Lookalike - Purchasers',
            size: 2500000,
            type: 'lookalike',
            source: 'seed_audience',
            status: 'processing',
            created: '2025-08-20',
            lastUpdated: '2025-08-20'
        }
    ],
    
    // Креативы
    creatives: [
        {
            id: 'cre_001',
            name: 'Summer Banner 1',
            type: 'image',
            format: '1080x1080',
            status: 'approved',
            thumbnail: '🖼️',
            campaigns: ['camp_001'],
            performance: 'high',
            ctr: 2.3
        },
        {
            id: 'cre_002',
            name: 'App Demo Video',
            type: 'video',
            format: '9:16',
            status: 'approved',
            thumbnail: '🎬',
            campaigns: ['camp_002'],
            performance: 'medium',
            ctr: 1.8
        },
        {
            id: 'cre_003',
            name: 'Holiday Carousel',
            type: 'carousel',
            format: 'multi',
            status: 'draft',
            thumbnail: '🎠',
            campaigns: ['camp_003'],
            performance: 'n/a',
            ctr: 0
        }
    ],
    
    // Пиксели и события
    pixels: [
        {
            id: 'pix_001',
            name: 'Main Website Pixel',
            platform: 'Meta',
            status: 'active',
            events: ['PageView', 'Purchase', 'AddToCart', 'InitiateCheckout'],
            lastFired: '2 minutes ago',
            totalEvents: 458932
        },
        {
            id: 'pix_002',
            name: 'Google Analytics',
            platform: 'Google',
            status: 'active',
            events: ['page_view', 'conversion', 'add_to_cart'],
            lastFired: '5 minutes ago',
            totalEvents: 892341
        }
    ],
    
    // Интеграции
    integrations: [
        {
            id: 'int_001',
            platform: 'Meta Ads',
            status: 'connected',
            accounts: 3,
            lastSync: '2025-08-20T10:30:00Z'
        },
        {
            id: 'int_002',
            platform: 'Google Ads',
            status: 'disconnected',
            accounts: 0,
            lastSync: null
        },
        {
            id: 'int_003',
            platform: 'TikTok Ads',
            status: 'disconnected',
            accounts: 0,
            lastSync: null
        }
    ],
    
    // Биллинг
    billing: {
        currentPlan: 'Professional',
        monthlySpend: 299,
        nextBilling: '2025-09-01',
        paymentMethod: {
            type: 'card',
            last4: '4242',
            brand: 'Visa'
        },
        invoices: [
            {
                id: 'inv_001',
                date: '2025-08-01',
                amount: 299,
                status: 'paid',
                pdf: '#'
            },
            {
                id: 'inv_002',
                date: '2025-07-01',
                amount: 299,
                status: 'paid',
                pdf: '#'
            }
        ]
    },
    
    // Настройки платформ
    platformSettings: {
        meta: {
            defaultBudget: 1000,
            defaultBidStrategy: 'lowest_cost',
            autoOptimize: true,
            reportingWindow: '7_days'
        },
        google: {
            defaultBudget: 500,
            defaultBidStrategy: 'maximize_conversions',
            enhancedCpc: true,
            conversionWindow: 30
        },
        tiktok: {
            defaultBudget: 750,
            defaultBidStrategy: 'cost_cap',
            creativeOptimization: true,
            attributionWindow: '7_days_click'
        }
    },
    
    // Dropdown опции
    dropdownOptions: {
        objectives: [
            { value: 'conversions', label: 'Conversions' },
            { value: 'traffic', label: 'Traffic' },
            { value: 'app_installs', label: 'App Installs' },
            { value: 'brand_awareness', label: 'Brand Awareness' },
            { value: 'reach', label: 'Reach' },
            { value: 'engagement', label: 'Engagement' },
            { value: 'lead_generation', label: 'Lead Generation' },
            { value: 'video_views', label: 'Video Views' }
        ],
        platforms: [
            { value: 'meta', label: 'Meta Ads' },
            { value: 'google', label: 'Google Ads' },
            { value: 'tiktok', label: 'TikTok Ads' },
            { value: 'snapchat', label: 'Snapchat Ads' },
            { value: 'youtube', label: 'YouTube Ads' }
        ],
        bidStrategies: [
            { value: 'lowest_cost', label: 'Lowest Cost' },
            { value: 'cost_cap', label: 'Cost Cap' },
            { value: 'bid_cap', label: 'Bid Cap' },
            { value: 'target_cost', label: 'Target Cost' },
            { value: 'maximize_conversions', label: 'Maximize Conversions' }
        ],
        audiences: [
            { value: 'all', label: 'All Users' },
            { value: 'custom', label: 'Custom Audience' },
            { value: 'lookalike', label: 'Lookalike Audience' },
            { value: 'retargeting', label: 'Retargeting' },
            { value: 'interest', label: 'Interest-based' }
        ],
        locations: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'au', label: 'Australia' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
            { value: 'es', label: 'Spain' },
            { value: 'it', label: 'Italy' }
        ],
        ageRanges: [
            { value: '18-24', label: '18-24' },
            { value: '25-34', label: '25-34' },
            { value: '35-44', label: '35-44' },
            { value: '45-54', label: '45-54' },
            { value: '55-64', label: '55-64' },
            { value: '65+', label: '65+' }
        ],
        genders: [
            { value: 'all', label: 'All Genders' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
        ],
        devices: [
            { value: 'all', label: 'All Devices' },
            { value: 'mobile', label: 'Mobile' },
            { value: 'desktop', label: 'Desktop' },
            { value: 'tablet', label: 'Tablet' }
        ],
        placements: [
            { value: 'automatic', label: 'Automatic Placements' },
            { value: 'feed', label: 'Feed' },
            { value: 'stories', label: 'Stories' },
            { value: 'reels', label: 'Reels' },
            { value: 'search', label: 'Search' },
            { value: 'display', label: 'Display Network' }
        ]
    },
    
    // Генерация ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
};

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockData;
}