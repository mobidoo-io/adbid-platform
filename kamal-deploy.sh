#!/bin/bash

# ========================================
# Kamal Deployment Script for AdBid
# ========================================
# Простой и удобный деплой через Kamal с проверками
# Использование: ./kamal-deploy.sh [command]

set -e  # Выход при ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# ========================================
# ФУНКЦИИ
# ========================================

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Проверка зависимостей
check_dependencies() {
    log "Проверка зависимостей..."
    
    # Проверка Ruby
    if ! command -v ruby &> /dev/null; then
        error "Ruby не установлен. Установите Ruby 2.7+ для работы Kamal"
    fi
    
    # Проверка Kamal
    if ! command -v kamal &> /dev/null; then
        warning "Kamal не установлен. Устанавливаю..."
        gem install kamal
        if [ $? -eq 0 ]; then
            success "Kamal установлен"
        else
            error "Не удалось установить Kamal"
        fi
    else
        KAMAL_VERSION=$(kamal version 2>/dev/null || echo "unknown")
        success "Kamal установлен (версия: $KAMAL_VERSION)"
    fi
    
    # Проверка Docker
    if ! command -v docker &> /dev/null; then
        error "Docker не установлен. Установите Docker для сборки образов"
    else
        success "Docker установлен"
    fi
}

# Проверка конфигурации
check_config() {
    log "Проверка конфигурации..."
    
    # Проверка .env файла
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            warning ".env файл не найден. Создаю из .env.example..."
            cp .env.example .env
            error "Пожалуйста, отредактируйте .env файл и добавьте ваши данные Docker Hub"
        else
            error ".env файл не найден. Создайте его из .env.example"
        fi
    fi
    
    # Загрузка переменных окружения
    if [ -f ".env" ]; then
        export $(cat .env | grep -v '^#' | xargs)
    fi
    
    # Проверка Docker Hub credentials
    if [ -z "$KAMAL_REGISTRY_USERNAME" ] || [ -z "$KAMAL_REGISTRY_PASSWORD" ]; then
        error "Docker Hub credentials не установлены в .env файле"
    fi
    
    # Проверка config/deploy.yml
    if [ ! -f "config/deploy.yml" ]; then
        error "config/deploy.yml не найден"
    fi
    
    # Проверка, что image name обновлен
    if grep -q "yourdockerhub/adbid" config/deploy.yml; then
        warning "Необходимо обновить image name в config/deploy.yml"
        warning "Замените 'yourdockerhub' на ваш Docker Hub username"
        read -p "Введите ваш Docker Hub username: " DOCKER_USERNAME
        if [ ! -z "$DOCKER_USERNAME" ]; then
            sed -i.bak "s/yourdockerhub/$DOCKER_USERNAME/g" config/deploy.yml
            success "config/deploy.yml обновлен"
        else
            error "Docker Hub username не может быть пустым"
        fi
    fi
    
    success "Конфигурация проверена"
}

# Инициализация Kamal
init_kamal() {
    log "Инициализация Kamal..."
    
    # Проверка SSH доступа
    log "Проверка SSH доступа к серверу..."
    SERVER_IP=$(grep -A2 "hosts:" config/deploy.yml | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | head -1)
    
    if [ -z "$SERVER_IP" ]; then
        error "Не удалось получить IP сервера из config/deploy.yml"
    fi
    
    if ssh -o ConnectTimeout=5 root@$SERVER_IP "echo 'SSH OK'" &>/dev/null; then
        success "SSH доступ к $SERVER_IP подтвержден"
    else
        error "Нет SSH доступа к серверу $SERVER_IP. Проверьте SSH ключи"
    fi
    
    success "Инициализация завершена"
}

# Установка на сервер
setup_server() {
    log "Подготовка сервера..."
    
    kamal setup
    
    if [ $? -eq 0 ]; then
        success "Сервер подготовлен"
    else
        error "Ошибка подготовки сервера"
    fi
}

# Деплой приложения
deploy_app() {
    log "Начинаю деплой приложения..."
    
    # Сборка образа
    log "Сборка Docker образа..."
    kamal build push
    
    if [ $? -ne 0 ]; then
        error "Ошибка сборки Docker образа"
    fi
    
    # Деплой
    log "Развертывание на сервере..."
    kamal deploy
    
    if [ $? -eq 0 ]; then
        success "Деплой завершен успешно!"
    else
        error "Ошибка деплоя"
    fi
}

# Быстрый деплой (без сборки)
quick_deploy() {
    log "Быстрый деплой (без пересборки образа)..."
    
    kamal redeploy
    
    if [ $? -eq 0 ]; then
        success "Быстрый деплой завершен!"
    else
        error "Ошибка быстрого деплоя"
    fi
}

# Откат на предыдущую версию
rollback() {
    log "Откат на предыдущую версию..."
    
    kamal rollback
    
    if [ $? -eq 0 ]; then
        success "Откат выполнен успешно"
    else
        error "Ошибка отката"
    fi
}

# Просмотр логов
show_logs() {
    log "Показываю логи приложения..."
    kamal app logs --follow
}

# Статус приложения
show_status() {
    log "Статус приложения..."
    
    echo ""
    echo "===== ИНФОРМАЦИЯ О ДЕПЛОЕ ====="
    kamal app details
    
    echo ""
    echo "===== TRAEFIK СТАТУС ====="
    kamal traefik details
    
    echo ""
    echo "===== ВЕРСИЯ НА СЕРВЕРЕ ====="
    kamal app version
}

# Очистка старых образов
cleanup() {
    log "Очистка старых Docker образов на сервере..."
    
    kamal prune
    
    if [ $? -eq 0 ]; then
        success "Очистка завершена"
    else
        warning "Проблемы при очистке"
    fi
}

# Интерактивная консоль
console() {
    log "Открываю интерактивную консоль в контейнере..."
    kamal app exec -i bash
}

# Полное удаление с сервера
remove_all() {
    warning "Это удалит все контейнеры и данные Kamal с сервера!"
    read -p "Вы уверены? (yes/no): " CONFIRM
    
    if [ "$CONFIRM" = "yes" ]; then
        kamal remove
        success "Все компоненты удалены с сервера"
    else
        log "Отменено"
    fi
}

# Помощь
show_help() {
    echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║      Kamal Deployment Tool for AdBid   ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo "Использование: $0 [command]"
    echo ""
    echo "Команды:"
    echo "  init      - Проверка и инициализация конфигурации"
    echo "  setup     - Первоначальная настройка сервера"
    echo "  deploy    - Полный деплой (сборка + развертывание)"
    echo "  quick     - Быстрый деплой (без пересборки)"
    echo "  rollback  - Откат на предыдущую версию"
    echo "  logs      - Просмотр логов приложения"
    echo "  status    - Показать статус деплоя"
    echo "  console   - Открыть консоль в контейнере"
    echo "  cleanup   - Очистить старые Docker образы"
    echo "  remove    - Удалить все с сервера"
    echo "  help      - Показать эту справку"
    echo ""
    echo "Примеры:"
    echo "  $0 init       # Проверить конфигурацию"
    echo "  $0 setup      # Настроить сервер (первый раз)"
    echo "  $0 deploy     # Задеплоить приложение"
    echo "  $0 logs       # Посмотреть логи"
    echo ""
}

# ========================================
# ОСНОВНАЯ ЛОГИКА
# ========================================

# Обработка команд
case "${1:-help}" in
    init)
        check_dependencies
        check_config
        init_kamal
        echo ""
        success "Готово к деплою! Используйте: $0 setup (для первого раза) или $0 deploy"
        ;;
    setup)
        check_dependencies
        check_config
        init_kamal
        setup_server
        echo ""
        success "Сервер настроен! Теперь используйте: $0 deploy"
        ;;
    deploy)
        check_dependencies
        check_config
        deploy_app
        echo ""
        echo -e "${GREEN}🎉 Деплой завершен!${NC}"
        echo -e "Сайт доступен по адресу: ${CYAN}https://adbid.me${NC}"
        ;;
    quick)
        quick_deploy
        ;;
    rollback)
        rollback
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    console)
        console
        ;;
    cleanup)
        cleanup
        ;;
    remove)
        remove_all
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Неизвестная команда: $1"
        show_help
        ;;
esac