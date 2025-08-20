/**
 * Campaign Wizard - управление мастером создания кампаний
 */
class CampaignWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.campaignData = {};
        this.init();
    }
    
    init() {
        // Загрузка сохраненного черновика
        this.loadDraft();
        
        // Определение текущего шага по URL
        this.detectCurrentStep();
        
        // Инициализация UI для текущего шага
        this.initStepUI();
        
        // Обработчики навигации
        this.initNavigation();
        
        // Автосохранение
        this.initAutoSave();
        
        console.log(`Campaign Wizard initialized - Step ${this.currentStep}`);
    }
    
    // Определение текущего шага
    detectCurrentStep() {
        const path = window.location.pathname;
        if (path.includes('new-campaign')) this.currentStep = 1;
        else if (path.includes('step2')) this.currentStep = 2;
        else if (path.includes('step3')) this.currentStep = 3;
        else if (path.includes('step4')) this.currentStep = 4;
        else if (path.includes('step5')) this.currentStep = 5;
    }
    
    // Загрузка черновика
    loadDraft() {
        this.campaignData = Storage.get(Storage.keys.DRAFT_CAMPAIGN, {});
        console.log('Draft loaded:', this.campaignData);
    }
    
    // Сохранение черновика
    saveDraft() {
        Storage.set(Storage.keys.DRAFT_CAMPAIGN, this.campaignData);
        console.log('Draft saved:', this.campaignData);
    }
    
    // Инициализация UI для шага
    initStepUI() {
        // Обновление прогресс-бара
        this.updateProgressBar();
        
        // Заполнение полей из черновика
        this.populateFields();
        
        // Специфичная инициализация для каждого шага
        switch(this.currentStep) {
            case 1:
                this.initStep1();
                break;
            case 2:
                this.initStep2();
                break;
            case 3:
                this.initStep3();
                break;
            case 4:
                this.initStep4();
                break;
            case 5:
                this.initStep5();
                break;
        }
    }
    
    // Шаг 1: Основная информация
    initStep1() {
        // Заполнение типов кампаний
        const objectiveCards = document.querySelectorAll('.objective-card');
        objectiveCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Снять выделение со всех
                objectiveCards.forEach(c => c.classList.remove('selected'));
                // Выделить текущую
                card.classList.add('selected');
                
                // Сохранить выбор
                const objective = card.dataset.objective || card.querySelector('h3')?.textContent;
                this.campaignData.objective = objective;
                this.saveDraft();
                
                // Показать кнопку продолжения
                const continueBtn = document.querySelector('.continue-btn');
                if (continueBtn) {
                    continueBtn.disabled = false;
                    continueBtn.style.opacity = '1';
                }
            });
        });
        
        // Обработка имени кампании
        const nameInput = document.querySelector('input[name="campaignName"], #campaignName');
        if (nameInput) {
            nameInput.value = this.campaignData.campaignName || '';
            nameInput.addEventListener('input', (e) => {
                this.campaignData.campaignName = e.target.value;
                this.saveDraft();
            });
        }
    }
    
    // Шаг 2: Таргетинг
    initStep2() {
        // Платформы
        const platformBtns = document.querySelectorAll('.platform-btn');
        platformBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                platformBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.campaignData.platform = btn.dataset.platform || btn.textContent.trim();
                this.saveDraft();
            });
        });
        
        // Аудитории
        const audienceSelect = document.querySelector('select[name="audience"]');
        if (audienceSelect) {
            // Заполнение списка аудиторий
            const audiences = Storage.get(Storage.keys.AUDIENCES, MockData.audiences);
            audienceSelect.innerHTML = '<option value="">Select audience</option>';
            audiences.forEach(aud => {
                const option = document.createElement('option');
                option.value = aud.id;
                option.textContent = `${aud.name} (${aud.size.toLocaleString()} users)`;
                audienceSelect.appendChild(option);
            });
            
            audienceSelect.value = this.campaignData.audience || '';
            audienceSelect.addEventListener('change', (e) => {
                this.campaignData.audience = e.target.value;
                this.saveDraft();
            });
        }
        
        // Локации
        this.initLocationSelector();
        
        // Демографические данные
        this.initDemographics();
    }
    
    // Инициализация выбора локаций
    initLocationSelector() {
        const locationInput = document.querySelector('input[name="locations"]');
        if (locationInput) {
            locationInput.addEventListener('focus', () => {
                this.showLocationModal();
            });
        }
    }
    
    // Модальное окно выбора локаций
    showLocationModal() {
        const locations = MockData.dropdownOptions.locations;
        const selected = this.campaignData.locations || [];
        
        let content = '<div style="max-height: 400px; overflow-y: auto;">';
        locations.forEach(loc => {
            const isChecked = selected.includes(loc.value) ? 'checked' : '';
            content += `
                <label style="display: block; padding: 8px; cursor: pointer;">
                    <input type="checkbox" value="${loc.value}" ${isChecked} 
                           onchange="wizard.toggleLocation('${loc.value}')">
                    ${loc.label}
                </label>
            `;
        });
        content += '</div>';
        
        if (window.app) {
            window.app.showModal('Select Locations', content);
        }
    }
    
    // Переключение локации
    toggleLocation(locationId) {
        if (!this.campaignData.locations) {
            this.campaignData.locations = [];
        }
        
        const index = this.campaignData.locations.indexOf(locationId);
        if (index > -1) {
            this.campaignData.locations.splice(index, 1);
        } else {
            this.campaignData.locations.push(locationId);
        }
        
        this.saveDraft();
        this.updateLocationDisplay();
    }
    
    // Обновление отображения локаций
    updateLocationDisplay() {
        const input = document.querySelector('input[name="locations"]');
        if (input && this.campaignData.locations) {
            const labels = this.campaignData.locations.map(id => {
                const loc = MockData.dropdownOptions.locations.find(l => l.value === id);
                return loc ? loc.label : id;
            });
            input.value = labels.join(', ');
        }
    }
    
    // Инициализация демографических настроек
    initDemographics() {
        // Возраст
        const ageInputs = document.querySelectorAll('input[name="ageMin"], input[name="ageMax"]');
        ageInputs.forEach(input => {
            input.value = this.campaignData[input.name] || '';
            input.addEventListener('input', (e) => {
                this.campaignData[e.target.name] = e.target.value;
                this.saveDraft();
            });
        });
        
        // Пол
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(radio => {
            if (this.campaignData.gender === radio.value) {
                radio.checked = true;
            }
            radio.addEventListener('change', (e) => {
                this.campaignData.gender = e.target.value;
                this.saveDraft();
            });
        });
    }
    
    // Шаг 3: Креативы
    initStep3() {
        // Загрузка креативов
        const uploadBtn = document.querySelector('.upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                this.handleCreativeUpload();
            });
        }
        
        // Отображение загруженных креативов
        this.displayCreatives();
        
        // Drag & Drop
        this.initDragDrop();
    }
    
    // Обработка загрузки креативов
    handleCreativeUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*,video/*';
        
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            if (!this.campaignData.creatives) {
                this.campaignData.creatives = [];
            }
            
            files.forEach(file => {
                const creative = {
                    id: MockData.generateId('cre'),
                    name: file.name,
                    type: file.type.startsWith('video') ? 'video' : 'image',
                    size: file.size,
                    url: URL.createObjectURL(file),
                    uploaded: new Date().toISOString()
                };
                
                this.campaignData.creatives.push(creative);
            });
            
            this.saveDraft();
            this.displayCreatives();
            
            if (window.app) {
                window.app.showNotification(`${files.length} creative(s) uploaded`, 'success');
            }
        };
        
        input.click();
    }
    
    // Отображение креативов
    displayCreatives() {
        const container = document.querySelector('.creatives-grid, .creatives-container');
        if (!container) return;
        
        const creatives = this.campaignData.creatives || [];
        
        if (creatives.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #6b7280;">
                    <div style="font-size: 48px; margin-bottom: 16px;">📁</div>
                    <p>No creatives uploaded yet</p>
                    <p style="font-size: 14px;">Click "Upload" or drag files here</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = creatives.map(creative => `
            <div class="creative-card" style="
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                padding: 16px;
                text-align: center;
            ">
                <div style="font-size: 48px; margin-bottom: 8px;">
                    ${creative.type === 'video' ? '🎬' : '🖼️'}
                </div>
                <p style="font-weight: 500; margin-bottom: 4px;">${creative.name}</p>
                <p style="font-size: 12px; color: #6b7280;">
                    ${(creative.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button onclick="wizard.removeCreative('${creative.id}')" style="
                    margin-top: 8px;
                    padding: 4px 12px;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                ">Remove</button>
            </div>
        `).join('');
    }
    
    // Удаление креатива
    removeCreative(creativeId) {
        if (this.campaignData.creatives) {
            this.campaignData.creatives = this.campaignData.creatives.filter(c => c.id !== creativeId);
            this.saveDraft();
            this.displayCreatives();
        }
    }
    
    // Инициализация Drag & Drop
    initDragDrop() {
        const dropZone = document.querySelector('.upload-area, .creatives-container');
        if (!dropZone) return;
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.background = '#f0f9ff';
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.background = '';
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.background = '';
            
            const files = Array.from(e.dataTransfer.files);
            // Симуляция обработки файлов
            const input = document.createElement('input');
            input.type = 'file';
            input.files = e.dataTransfer.files;
            input.onchange = () => this.handleCreativeUpload();
            input.onchange({ target: input });
        });
    }
    
    // Шаг 4: Бюджет и расписание
    initStep4() {
        // Бюджет
        const budgetInput = document.querySelector('input[name="budget"], #budget');
        if (budgetInput) {
            budgetInput.value = this.campaignData.budget || '';
            budgetInput.addEventListener('input', (e) => {
                this.campaignData.budget = e.target.value;
                this.updateBudgetPreview();
                this.saveDraft();
            });
        }
        
        // Тип бюджета
        const budgetTypeRadios = document.querySelectorAll('input[name="budgetType"]');
        budgetTypeRadios.forEach(radio => {
            if (this.campaignData.budgetType === radio.value) {
                radio.checked = true;
            }
            radio.addEventListener('change', (e) => {
                this.campaignData.budgetType = e.target.value;
                this.saveDraft();
            });
        });
        
        // Даты
        const startDate = document.querySelector('input[name="startDate"]');
        const endDate = document.querySelector('input[name="endDate"]');
        
        if (startDate) {
            startDate.value = this.campaignData.startDate || '';
            startDate.addEventListener('change', (e) => {
                this.campaignData.startDate = e.target.value;
                this.updateSchedulePreview();
                this.saveDraft();
            });
        }
        
        if (endDate) {
            endDate.value = this.campaignData.endDate || '';
            endDate.addEventListener('change', (e) => {
                this.campaignData.endDate = e.target.value;
                this.updateSchedulePreview();
                this.saveDraft();
            });
        }
        
        // Стратегия ставок
        const bidStrategySelect = document.querySelector('select[name="bidStrategy"]');
        if (bidStrategySelect) {
            bidStrategySelect.value = this.campaignData.bidStrategy || '';
            bidStrategySelect.addEventListener('change', (e) => {
                this.campaignData.bidStrategy = e.target.value;
                this.saveDraft();
            });
        }
    }
    
    // Обновление превью бюджета
    updateBudgetPreview() {
        const preview = document.querySelector('.budget-preview');
        if (preview && this.campaignData.budget) {
            const daily = parseFloat(this.campaignData.budget) / 30;
            preview.innerHTML = `
                <p>Daily budget: $${daily.toFixed(2)}</p>
                <p>Monthly total: $${this.campaignData.budget}</p>
            `;
        }
    }
    
    // Обновление превью расписания
    updateSchedulePreview() {
        const preview = document.querySelector('.schedule-preview');
        if (preview && this.campaignData.startDate && this.campaignData.endDate) {
            const start = new Date(this.campaignData.startDate);
            const end = new Date(this.campaignData.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            
            preview.innerHTML = `
                <p>Campaign duration: ${days} days</p>
                <p>Start: ${start.toLocaleDateString()}</p>
                <p>End: ${end.toLocaleDateString()}</p>
            `;
        }
    }
    
    // Шаг 5: Проверка и запуск
    initStep5() {
        // Отображение сводки
        this.displaySummary();
        
        // Кнопка запуска
        const launchBtn = document.querySelector('.launch-btn');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                this.launchCampaign();
            });
        }
    }
    
    // Отображение сводки кампании
    displaySummary() {
        const container = document.querySelector('.summary-container, .review-section');
        if (!container) return;
        
        const summary = `
            <div style="background: white; border-radius: 12px; padding: 24px;">
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 20px;">Campaign Summary</h3>
                
                <div style="display: grid; gap: 16px;">
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Campaign Name</label>
                        <p style="font-weight: 500;">${this.campaignData.campaignName || 'Untitled Campaign'}</p>
                    </div>
                    
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Objective</label>
                        <p style="font-weight: 500;">${this.campaignData.objective || 'Not selected'}</p>
                    </div>
                    
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Platform</label>
                        <p style="font-weight: 500;">${this.campaignData.platform || 'Not selected'}</p>
                    </div>
                    
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Budget</label>
                        <p style="font-weight: 500;">$${this.campaignData.budget || '0'}</p>
                    </div>
                    
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Schedule</label>
                        <p style="font-weight: 500;">
                            ${this.campaignData.startDate || 'Not set'} - ${this.campaignData.endDate || 'Not set'}
                        </p>
                    </div>
                    
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Audience</label>
                        <p style="font-weight: 500;">${this.campaignData.audience || 'Not selected'}</p>
                    </div>
                    
                    <div>
                        <label style="font-size: 12px; color: #6b7280;">Creatives</label>
                        <p style="font-weight: 500;">
                            ${this.campaignData.creatives ? this.campaignData.creatives.length : 0} uploaded
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = summary;
    }
    
    // Запуск кампании
    launchCampaign() {
        // Валидация
        if (!this.validateCampaign()) {
            return;
        }
        
        // Создание кампании
        const campaign = {
            id: MockData.generateId('camp'),
            ...this.campaignData,
            status: 'active',
            created: new Date().toISOString(),
            spent: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0,
            roas: 0
        };
        
        // Сохранение кампании
        Storage.addToArray(Storage.keys.CAMPAIGNS, campaign);
        
        // Очистка черновика
        Storage.remove(Storage.keys.DRAFT_CAMPAIGN);
        
        // Уведомление
        if (window.app) {
            window.app.showNotification('Campaign launched successfully!', 'success');
        }
        
        // Редирект на dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
    
    // Валидация кампании
    validateCampaign() {
        const required = ['campaignName', 'objective', 'platform', 'budget'];
        const missing = [];
        
        required.forEach(field => {
            if (!this.campaignData[field]) {
                missing.push(field);
            }
        });
        
        if (missing.length > 0) {
            if (window.app) {
                window.app.showNotification(`Please fill required fields: ${missing.join(', ')}`, 'error');
            }
            return false;
        }
        
        return true;
    }
    
    // Обновление прогресс-бара
    updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar, .step-progress');
        if (progressBar) {
            const progress = (this.currentStep / this.totalSteps) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Обновление индикаторов шагов
        const steps = document.querySelectorAll('.step-indicator, .step');
        steps.forEach((step, index) => {
            if (index < this.currentStep) {
                step.classList.add('completed');
            } else if (index === this.currentStep - 1) {
                step.classList.add('active');
            }
        });
    }
    
    // Заполнение полей из черновика
    populateFields() {
        // Заполнение всех input полей
        Object.keys(this.campaignData).forEach(key => {
            const input = document.querySelector(`input[name="${key}"], #${key}`);
            if (input) {
                input.value = this.campaignData[key];
            }
            
            const select = document.querySelector(`select[name="${key}"], #${key}`);
            if (select) {
                select.value = this.campaignData[key];
            }
            
            const textarea = document.querySelector(`textarea[name="${key}"], #${key}`);
            if (textarea) {
                textarea.value = this.campaignData[key];
            }
        });
    }
    
    // Инициализация навигации
    initNavigation() {
        // Кнопка "Назад"
        const backBtn = document.querySelector('.back-btn, .btn-back');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.goToPreviousStep();
            });
        }
        
        // Кнопка "Далее"
        const nextBtn = document.querySelector('.next-btn, .btn-next, .continue-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.goToNextStep();
            });
        }
        
        // Навигация по шагам
        const stepLinks = document.querySelectorAll('.step-link');
        stepLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const step = parseInt(link.dataset.step);
                if (step) {
                    this.goToStep(step);
                }
            });
        });
    }
    
    // Переход на предыдущий шаг
    goToPreviousStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }
    
    // Переход на следующий шаг
    goToNextStep() {
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }
    
    // Переход на конкретный шаг
    goToStep(step) {
        const urls = {
            1: 'new-campaign.html',
            2: 'campaign-step2.html',
            3: 'campaign-step3.html',
            4: 'campaign-step4.html',
            5: 'campaign-step5.html'
        };
        
        if (urls[step]) {
            window.location.href = urls[step];
        }
    }
    
    // Инициализация автосохранения
    initAutoSave() {
        // Сохранение при изменении любого поля
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea, select')) {
                clearTimeout(this.autoSaveTimeout);
                this.autoSaveTimeout = setTimeout(() => {
                    this.collectFormData();
                    this.saveDraft();
                    console.log('Auto-saved');
                }, 1000);
            }
        });
    }
    
    // Сбор данных из всех форм
    collectFormData() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                this.campaignData[key] = value;
            });
        });
    }
}

// Инициализация мастера создания кампаний
let wizard;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        wizard = new CampaignWizard();
        window.wizard = wizard;
    });
} else {
    wizard = new CampaignWizard();
    window.wizard = wizard;
}