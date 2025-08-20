/**
 * Main Application Controller для Adbid Dashboard
 */
class AdbidApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'overview';
        this.notifications = [];
        this.init();
    }
    
    // Инициализация приложения
    init() {
        // Загрузка данных из localStorage или создание новых
        this.loadInitialData();
        
        // Инициализация обработчиков событий
        this.initEventHandlers();
        
        // Заполнение dropdown списков
        this.populateDropdowns();
        
        // Обновление UI
        this.updateUI();
        
        // Показать уведомление о готовности
        this.showNotification('Dashboard loaded successfully', 'success');
        
        console.log('✅ Adbid App initialized');
    }
    
    // Загрузка начальных данных
    loadInitialData() {
        // Загрузка пользователя
        this.currentUser = Storage.get(Storage.keys.USER, MockData.user);
        Storage.set(Storage.keys.USER, this.currentUser);
        
        // Загрузка или создание кампаний
        if (!Storage.has(Storage.keys.CAMPAIGNS)) {
            Storage.set(Storage.keys.CAMPAIGNS, MockData.campaigns);
        }
        
        // Загрузка других данных
        if (!Storage.has(Storage.keys.AUDIENCES)) {
            Storage.set(Storage.keys.AUDIENCES, MockData.audiences);
        }
        
        if (!Storage.has(Storage.keys.CREATIVES)) {
            Storage.set(Storage.keys.CREATIVES, MockData.creatives);
        }
        
        if (!Storage.has(Storage.keys.PIXELS)) {
            Storage.set(Storage.keys.PIXELS, MockData.pixels);
        }
        
        if (!Storage.has(Storage.keys.INTEGRATIONS)) {
            Storage.set(Storage.keys.INTEGRATIONS, MockData.integrations);
        }
        
        if (!Storage.has(Storage.keys.BILLING)) {
            Storage.set(Storage.keys.BILLING, MockData.billing);
        }
        
        if (!Storage.has(Storage.keys.SETTINGS)) {
            Storage.set(Storage.keys.SETTINGS, MockData.platformSettings);
        }
    }
    
    // Инициализация обработчиков событий
    initEventHandlers() {
        // Обработчик для всех кнопок
        document.querySelectorAll('button').forEach(button => {
            if (!button.hasAttribute('data-initialized')) {
                button.setAttribute('data-initialized', 'true');
                button.addEventListener('click', (e) => this.handleButtonClick(e));
            }
        });
        
        // Обработчик для форм
        document.querySelectorAll('form').forEach(form => {
            if (!form.hasAttribute('data-initialized')) {
                form.setAttribute('data-initialized', 'true');
                form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            }
        });
        
        // Обработчик для dropdown
        document.querySelectorAll('select').forEach(select => {
            if (!select.hasAttribute('data-initialized')) {
                select.setAttribute('data-initialized', 'true');
                select.addEventListener('change', (e) => this.handleSelectChange(e));
            }
        });
        
        // Обработчик для input полей
        document.querySelectorAll('input, textarea').forEach(input => {
            if (!input.hasAttribute('data-initialized')) {
                input.setAttribute('data-initialized', 'true');
                input.addEventListener('input', (e) => this.handleInputChange(e));
            }
        });
    }
    
    // Заполнение dropdown списков
    populateDropdowns() {
        // Заполнение objectives
        const objectivesSelect = document.querySelectorAll('select[name="objective"], select#objective');
        objectivesSelect.forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.objectives);
        });
        
        // Заполнение platforms
        const platformsSelect = document.querySelectorAll('select[name="platform"], select#platform');
        platformsSelect.forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.platforms);
        });
        
        // Заполнение bid strategies
        const bidSelect = document.querySelectorAll('select[name="bidStrategy"], select#bidStrategy');
        bidSelect.forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.bidStrategies);
        });
        
        // Заполнение audiences
        const audienceSelect = document.querySelectorAll('select[name="audience"], select#audience');
        audienceSelect.forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.audiences);
        });
        
        // Заполнение locations
        const locationSelect = document.querySelectorAll('select[name="location"], select#location');
        locationSelect.forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.locations);
        });
        
        // Заполнение других селектов
        this.populateOtherSelects();
    }
    
    // Вспомогательный метод для заполнения select
    populateSelect(select, options) {
        if (!select || select.hasAttribute('data-populated')) return;
        
        // Сохраняем первый option если это placeholder
        const firstOption = select.querySelector('option');
        const hasPlaceholder = firstOption && (firstOption.value === '' || firstOption.disabled);
        
        // Очищаем select
        select.innerHTML = '';
        
        // Возвращаем placeholder если был
        if (hasPlaceholder) {
            select.appendChild(firstOption);
        }
        
        // Добавляем опции
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });
        
        select.setAttribute('data-populated', 'true');
    }
    
    // Заполнение других селектов
    populateOtherSelects() {
        // Age ranges
        document.querySelectorAll('select[name="ageRange"], select#ageRange').forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.ageRanges);
        });
        
        // Genders
        document.querySelectorAll('select[name="gender"], select#gender').forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.genders);
        });
        
        // Devices
        document.querySelectorAll('select[name="device"], select#device').forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.devices);
        });
        
        // Placements
        document.querySelectorAll('select[name="placement"], select#placement').forEach(select => {
            this.populateSelect(select, MockData.dropdownOptions.placements);
        });
    }
    
    // Обработчик кликов по кнопкам
    handleButtonClick(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        const text = button.textContent.toLowerCase();
        const classList = button.className.toLowerCase();
        
        // Сохранение
        if (text.includes('save') || text.includes('apply')) {
            this.handleSave(button);
        }
        // Создание
        else if (text.includes('create') || text.includes('new') || text.includes('add')) {
            this.handleCreate(button);
        }
        // Подключение
        else if (text.includes('connect')) {
            this.handleConnect(button);
        }
        // Удаление
        else if (text.includes('delete') || text.includes('remove')) {
            this.handleDelete(button);
        }
        // Отмена
        else if (text.includes('cancel')) {
            this.handleCancel(button);
        }
        // Экспорт
        else if (text.includes('export') || text.includes('download')) {
            this.handleExport(button);
        }
        // Импорт
        else if (text.includes('import') || text.includes('upload')) {
            this.handleImport(button);
        }
        // Другие действия
        else {
            this.handleGenericAction(button);
        }
    }
    
    // Обработчик сохранения
    handleSave(button) {
        const form = button.closest('form');
        if (form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Saving data:', data);
            
            // Сохранение в localStorage
            const section = this.getCurrentSection();
            if (section === 'settings') {
                Storage.set(Storage.keys.SETTINGS, data);
                this.showNotification('Settings saved successfully', 'success');
            } else if (section === 'creation' || section === 'campaigns') {
                const campaign = {
                    id: MockData.generateId('camp'),
                    ...data,
                    status: 'draft',
                    created: new Date().toISOString()
                };
                Storage.addToArray(Storage.keys.CAMPAIGNS, campaign);
                this.showNotification('Campaign saved as draft', 'success');
            }
        } else {
            this.showNotification('Changes saved', 'success');
        }
    }
    
    // Обработчик создания
    handleCreate(button) {
        const context = button.closest('[data-context]')?.dataset.context || '';
        
        if (context === 'campaign' || button.textContent.includes('Campaign')) {
            window.location.href = 'new-campaign.html';
        } else if (context === 'audience') {
            this.showModal('Create Audience', this.getAudienceForm());
        } else if (context === 'creative') {
            this.showModal('Upload Creative', this.getCreativeForm());
        } else {
            this.showNotification('Creating new item...', 'info');
        }
    }
    
    // Обработчик подключения
    handleConnect(button) {
        const platform = button.closest('[data-platform]')?.dataset.platform || 
                        button.textContent.replace('Connect', '').trim();
        
        this.showModal(`Connect ${platform}`, `
            <div style="text-align: center; padding: 20px;">
                <p style="margin-bottom: 20px;">You will be redirected to ${platform} to authorize the connection.</p>
                <button onclick="app.simulateOAuth('${platform}')" style="
                    background: #FFD93D;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                ">Authorize ${platform}</button>
            </div>
        `);
    }
    
    // Симуляция OAuth
    simulateOAuth(platform) {
        this.closeModal();
        this.showNotification(`Connecting to ${platform}...`, 'info');
        
        setTimeout(() => {
            // Обновление статуса интеграции
            const integrations = Storage.get(Storage.keys.INTEGRATIONS, []);
            const integration = integrations.find(i => i.platform.includes(platform));
            if (integration) {
                integration.status = 'connected';
                integration.lastSync = new Date().toISOString();
                Storage.set(Storage.keys.INTEGRATIONS, integrations);
            }
            
            this.showNotification(`Successfully connected to ${platform}`, 'success');
            this.updateIntegrationUI(platform);
        }, 2000);
    }
    
    // Обработчик удаления
    handleDelete(button) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.showNotification('Item deleted', 'success');
        }
    }
    
    // Обработчик отмены
    handleCancel(button) {
        const form = button.closest('form');
        if (form) {
            form.reset();
        }
        this.showNotification('Changes discarded', 'info');
    }
    
    // Обработчик экспорта
    handleExport(button) {
        const data = Storage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `adbid_export_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully', 'success');
    }
    
    // Обработчик импорта
    handleImport(button) {
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
                        Storage.importData(data);
                        this.showNotification('Data imported successfully', 'success');
                        location.reload();
                    } catch (error) {
                        this.showNotification('Error importing data', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
    
    // Общий обработчик действий
    handleGenericAction(button) {
        console.log('Button clicked:', button.textContent);
        this.showNotification(`Action: ${button.textContent}`, 'info');
    }
    
    // Обработчик отправки форм
    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', data);
        this.showNotification('Form submitted successfully', 'success');
        
        // Сохранение данных формы
        const formId = form.id || form.name;
        if (formId) {
            Storage.set(`form_${formId}`, data);
        }
    }
    
    // Обработчик изменения select
    handleSelectChange(e) {
        const select = e.target;
        console.log(`Select changed: ${select.name} = ${select.value}`);
        
        // Сохранение состояния
        const formData = this.getFormData(select.closest('form'));
        if (formData) {
            Storage.set(Storage.keys.DRAFT_CAMPAIGN, formData);
        }
    }
    
    // Обработчик изменения input
    handleInputChange(e) {
        const input = e.target;
        
        // Автосохранение черновика
        if (input.closest('form')) {
            const formData = this.getFormData(input.closest('form'));
            if (formData) {
                Storage.set(Storage.keys.DRAFT_CAMPAIGN, formData);
            }
        }
    }
    
    // Получение данных формы
    getFormData(form) {
        if (!form) return null;
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    }
    
    // Показать уведомление
    showNotification(message, type = 'info') {
        // Создание элемента уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Удаление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Показать модальное окно
    showModal(title, content) {
        // Удаление существующего модального окна
        this.closeModal();
        
        // Создание модального окна
        const modal = document.createElement('div');
        modal.id = 'app-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 20px; font-weight: 600;">${title}</h2>
                <button onclick="app.closeModal()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6b7280;
                ">×</button>
            </div>
            <div>${content}</div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Закрытие по клику на фон
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
    
    // Закрыть модальное окно
    closeModal() {
        const modal = document.getElementById('app-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    // Получить форму аудитории
    getAudienceForm() {
        return `
            <form id="audience-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Audience Name</label>
                    <input type="text" name="name" required style="
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Type</label>
                    <select name="type" required style="
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                        <option value="custom">Custom Audience</option>
                        <option value="lookalike">Lookalike Audience</option>
                        <option value="retargeting">Retargeting</option>
                    </select>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Source</label>
                    <select name="source" required style="
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                        <option value="crm">CRM Data</option>
                        <option value="pixel">Pixel Events</option>
                        <option value="engagement">Engagement</option>
                    </select>
                </div>
                <button type="submit" style="
                    background: #FFD93D;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                ">Create Audience</button>
            </form>
        `;
    }
    
    // Получить форму креатива
    getCreativeForm() {
        return `
            <form id="creative-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Creative Name</label>
                    <input type="text" name="name" required style="
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Type</label>
                    <select name="type" required style="
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="carousel">Carousel</option>
                    </select>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Upload File</label>
                    <input type="file" name="file" required style="
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                    ">
                </div>
                <button type="submit" style="
                    background: #FFD93D;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                ">Upload Creative</button>
            </form>
        `;
    }
    
    // Получить текущую секцию
    getCurrentSection() {
        const activeSection = document.querySelector('.dashboard-section.active');
        if (activeSection) {
            return activeSection.id.replace('-section', '');
        }
        return 'overview';
    }
    
    // Обновить UI интеграции
    updateIntegrationUI(platform) {
        // Обновление карточки интеграции
        const cards = document.querySelectorAll('.platform-card');
        cards.forEach(card => {
            if (card.textContent.includes(platform)) {
                card.classList.add('connected');
                const btn = card.querySelector('.connect-btn');
                if (btn) {
                    btn.textContent = 'Connected ✓';
                    btn.classList.add('connected');
                }
            }
        });
    }
    
    // Обновление UI
    updateUI() {
        // Обновление информации о пользователе
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = this.currentUser.name;
        });
        
        const userAvatarElements = document.querySelectorAll('.user-avatar');
        userAvatarElements.forEach(el => {
            el.textContent = this.currentUser.avatar;
        });
        
        // Обновление статистики
        this.updateStats();
        
        // Обновление таблиц
        this.updateTables();
    }
    
    // Обновление статистики
    updateStats() {
        const campaigns = Storage.get(Storage.keys.CAMPAIGNS, []);
        const activeCampaigns = campaigns.filter(c => c.status === 'active');
        const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
        const avgRoas = activeCampaigns.length > 0 
            ? (activeCampaigns.reduce((sum, c) => sum + c.roas, 0) / activeCampaigns.length).toFixed(1)
            : 0;
        const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
        
        // Обновление значений
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues[0]) statValues[0].textContent = `$${totalSpend.toLocaleString()}`;
        if (statValues[1]) statValues[1].textContent = activeCampaigns.length;
        if (statValues[2]) statValues[2].textContent = `${avgRoas}x`;
        if (statValues[3]) statValues[3].textContent = totalConversions.toLocaleString();
    }
    
    // Обновление таблиц
    updateTables() {
        const campaigns = Storage.get(Storage.keys.CAMPAIGNS, []);
        const tbody = document.querySelector('.campaigns-table tbody');
        
        if (tbody && campaigns.length > 0) {
            tbody.innerHTML = campaigns.map(campaign => `
                <tr>
                    <td>
                        <div class="campaign-name">
                            <span>${campaign.name}</span>
                        </div>
                    </td>
                    <td>
                        <span class="campaign-status ${campaign.status}">
                            <span class="status-dot"></span>
                            ${campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                    </td>
                    <td>$${campaign.budget.toLocaleString()}</td>
                    <td>$${campaign.spent.toLocaleString()}</td>
                    <td>${campaign.roas}x</td>
                    <td>
                        <button class="filter-btn" onclick="app.viewCampaign('${campaign.id}')">View</button>
                    </td>
                </tr>
            `).join('');
        }
    }
    
    // Просмотр кампании
    viewCampaign(campaignId) {
        const campaign = Storage.get(Storage.keys.CAMPAIGNS, []).find(c => c.id === campaignId);
        if (campaign) {
            this.showModal('Campaign Details', `
                <div>
                    <h3>${campaign.name}</h3>
                    <p>Status: ${campaign.status}</p>
                    <p>Budget: $${campaign.budget.toLocaleString()}</p>
                    <p>Spent: $${campaign.spent.toLocaleString()}</p>
                    <p>ROAS: ${campaign.roas}x</p>
                    <p>Platform: ${campaign.platform}</p>
                    <p>Objective: ${campaign.objective}</p>
                </div>
            `);
        }
    }
}

// Инициализация приложения при загрузке страницы
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new AdbidApp();
        window.app = app; // Делаем доступным глобально
    });
} else {
    app = new AdbidApp();
    window.app = app;
}

// Добавление стилей для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
`;
document.head.appendChild(style);