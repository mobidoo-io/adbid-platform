#!/bin/bash

# ========================================
# AdBid Automatic Deployment Script
# ========================================
# Автоматический деплой с проверками, бекапами и откатом
# Использование: ./auto-deploy.sh [options]
# Options:
#   --rollback    Откатить на предыдущую версию
#   --force       Пропустить проверки
#   --no-backup   Не создавать бекап
#   --ssl         Настроить SSL сертификат

set -e  # Выход при ошибке

# ========================================
# КОНФИГУРАЦИЯ
# ========================================
SERVER_IP="165.227.11.220"
SERVER_USER="root"
PROJECT_NAME="adbid"
DOMAIN="adbid.me"
DEPLOY_DIR="/var/www/adbid"
BACKUP_DIR="/var/www/backups"
MAX_BACKUPS=5  # Максимальное количество бекапов

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

# Логирование
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

# Проверка статуса последней команды
check_status() {
    if [ $? -eq 0 ]; then
        success "$1"
    else
        error "$2"
    fi
}

# Проверка необходимых инструментов
check_requirements() {
    log "Проверка зависимостей..."
    
    # Проверка Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js не установлен"
    fi
    
    # Проверка npm
    if ! command -v npm &> /dev/null; then
        error "npm не установлен"
    fi
    
    # Проверка SSH доступа
    log "Проверка SSH доступа к серверу..."
    if ssh -o ConnectTimeout=5 ${SERVER_USER}@${SERVER_IP} "echo 'SSH OK'" &>/dev/null; then
        success "SSH доступ подтвержден"
    else
        error "Нет SSH доступа к серверу ${SERVER_IP}"
    fi
}

# Сборка проекта
build_project() {
    log "Сборка проекта..."
    
    # Проверка package.json
    if [ ! -f "package.json" ]; then
        error "package.json не найден"
    fi
    
    # Установка зависимостей если нужно
    if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
        log "Установка зависимостей..."
        npm install
        check_status "Зависимости установлены" "Ошибка установки зависимостей"
    fi
    
    # Сборка
    log "Запуск сборки..."
    if npm run build; then
        success "Проект успешно собран"
    else
        # Попытка использовать vite напрямую
        warning "npm run build не сработал, пробуем vite..."
        npx vite build
        check_status "Проект собран через vite" "Ошибка сборки проекта"
    fi
    
    # Проверка результата сборки
    if [ -d "dist" ]; then
        FILE_COUNT=$(find dist -type f | wc -l)
        success "Собрано файлов: $FILE_COUNT"
    else
        error "Папка dist не создана"
    fi
}

# Создание деплой пакета
create_package() {
    log "Создание деплой пакета..."
    
    # Очистка временных файлов
    rm -rf deploy_temp deploy.tar.gz
    mkdir -p deploy_temp
    
    # Копирование файлов
    log "Копирование файлов..."
    
    # Копируем dist если есть
    if [ -d "dist" ]; then
        cp -r dist/* deploy_temp/
    fi
    
    # Копируем HTML файлы
    find . -maxdepth 1 -name "*.html" -exec cp {} deploy_temp/ \; 2>/dev/null || true
    
    # Копируем Dashboard если есть
    if [ -d "Dashboard" ]; then
        cp -r Dashboard deploy_temp/
    fi
    
    # Копируем assets если есть
    if [ -d "assets" ]; then
        cp -r assets deploy_temp/
    fi
    
    # Создание версионного файла
    echo "{
        \"version\": \"$(date +'%Y%m%d-%H%M%S')\",
        \"deployed\": \"$(date +'%Y-%m-%d %H:%M:%S')\",
        \"git_commit\": \"$(git rev-parse HEAD 2>/dev/null || echo 'no-git')\"
    }" > deploy_temp/version.json
    
    # Создание архива
    tar -czf deploy.tar.gz -C deploy_temp .
    ARCHIVE_SIZE=$(du -h deploy.tar.gz | cut -f1)
    success "Деплой пакет создан (размер: $ARCHIVE_SIZE)"
    
    # Очистка
    rm -rf deploy_temp
}

# Развертывание на сервере
deploy_to_server() {
    log "Загрузка на сервер..."
    
    # Загрузка архива
    scp -q deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/
    check_status "Архив загружен" "Ошибка загрузки архива"
    
    # Загрузка nginx конфига
    if [ -f "nginx.conf" ]; then
        scp -q nginx.conf ${SERVER_USER}@${SERVER_IP}:/tmp/
        success "Nginx конфиг загружен"
    fi
    
    log "Развертывание на сервере..."
    
    # Выполнение деплоя на сервере
    ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
    set -e
    
    # Функции для сервера
    log_server() {
        echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
    }
    
    # Создание директорий
    mkdir -p /var/www/adbid
    mkdir -p /var/www/backups
    cd /var/www/adbid
    
    # Бекап текущей версии
    if [ -d "current" ]; then
        log_server "Создание бекапа..."
        BACKUP_NAME="backup-$(date +'%Y%m%d-%H%M%S')"
        cp -r current /var/www/backups/${BACKUP_NAME}
        
        # Удаление старых бекапов (оставляем только последние 5)
        cd /var/www/backups
        ls -t | tail -n +6 | xargs -r rm -rf
        cd /var/www/adbid
        
        log_server "Бекап создан: ${BACKUP_NAME}"
    fi
    
    # Развертывание новой версии
    log_server "Развертывание новой версии..."
    rm -rf new_deploy
    mkdir new_deploy
    tar -xzf /tmp/deploy.tar.gz -C new_deploy/
    
    # Проверка развертывания
    if [ -f "new_deploy/index.html" ] || [ -f "new_deploy/dashboard.html" ]; then
        # Переключение на новую версию
        rm -rf old_current
        if [ -d "current" ]; then
            mv current old_current
        fi
        mv new_deploy current
        
        # Установка прав
        chown -R www-data:www-data /var/www/adbid
        chmod -R 755 /var/www/adbid
        
        log_server "Новая версия развернута"
    else
        log_server "ОШИБКА: index.html или dashboard.html не найдены"
        rm -rf new_deploy
        exit 1
    fi
    
    # Настройка nginx если нужно
    if [ -f "/tmp/nginx.conf" ]; then
        log_server "Обновление конфигурации nginx..."
        cp /tmp/nginx.conf /etc/nginx/sites-available/adbid
        ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
        
        # Проверка конфигурации
        if nginx -t 2>/dev/null; then
            systemctl reload nginx
            log_server "Nginx перезагружен"
        else
            log_server "ОШИБКА: Некорректная конфигурация nginx"
            # Откат
            if [ -d "old_current" ]; then
                rm -rf current
                mv old_current current
            fi
            exit 1
        fi
    fi
    
    # Очистка
    rm -rf old_current
    rm -f /tmp/deploy.tar.gz
    rm -f /tmp/nginx.conf
    
    # Проверка доступности
    if curl -f -s -o /dev/null "http://localhost"; then
        log_server "✅ Сайт доступен локально"
    else
        log_server "⚠️  Сайт может быть недоступен"
    fi
    
    # Вывод версии
    if [ -f "current/version.json" ]; then
        log_server "Развернута версия:"
        cat current/version.json
    fi
ENDSSH
    
    check_status "Развертывание завершено" "Ошибка развертывания"
}

# Проверка сайта
check_site() {
    log "Проверка доступности сайта..."
    
    # Проверка HTTP
    if curl -f -s -o /dev/null "http://${DOMAIN}"; then
        success "Сайт доступен по HTTP: http://${DOMAIN}"
    elif curl -f -s -o /dev/null "http://${SERVER_IP}"; then
        warning "Сайт доступен по IP: http://${SERVER_IP}"
        warning "Но не доступен по домену ${DOMAIN}"
    else
        error "Сайт недоступен!"
    fi
    
    # Проверка HTTPS
    if curl -f -s -o /dev/null "https://${DOMAIN}"; then
        success "SSL работает: https://${DOMAIN}"
    fi
}

# Откат на предыдущую версию
rollback() {
    log "Откат на предыдущую версию..."
    
    ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
    set -e
    
    cd /var/www/backups
    LAST_BACKUP=$(ls -t | head -n 1)
    
    if [ -z "$LAST_BACKUP" ]; then
        echo "❌ Нет доступных бекапов для отката"
        exit 1
    fi
    
    echo "Откат на версию: $LAST_BACKUP"
    
    cd /var/www/adbid
    rm -rf rollback_temp
    mv current rollback_temp
    cp -r /var/www/backups/$LAST_BACKUP current
    
    # Перезагрузка nginx
    systemctl reload nginx
    
    echo "✅ Откат выполнен успешно"
    
    # Сохраняем откаченную версию как failed
    mv rollback_temp /var/www/backups/failed-$(date +'%Y%m%d-%H%M%S')
ENDSSH
    
    check_status "Откат выполнен" "Ошибка отката"
}

# Настройка SSL
setup_ssl() {
    log "Настройка SSL сертификата..."
    
    ssh ${SERVER_USER}@${SERVER_IP} << ENDSSH
    set -e
    
    # Установка certbot если нужно
    if ! command -v certbot &> /dev/null; then
        apt update
        apt install -y certbot python3-certbot-nginx
    fi
    
    # Получение сертификата
    certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m admin@${DOMAIN}
    
    # Настройка автообновления
    (crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet") | crontab -
    
    echo "✅ SSL сертификат настроен"
ENDSSH
    
    check_status "SSL настроен" "Ошибка настройки SSL"
}

# Показать статус
show_status() {
    log "Получение статуса сервера..."
    
    ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
    echo "===== СТАТУС СЕРВЕРА ====="
    echo ""
    echo "📁 Текущая версия:"
    if [ -f "/var/www/adbid/current/version.json" ]; then
        cat /var/www/adbid/current/version.json
    else
        echo "Информация о версии недоступна"
    fi
    echo ""
    echo "📦 Доступные бекапы:"
    ls -lh /var/www/backups 2>/dev/null | tail -n +2 || echo "Нет бекапов"
    echo ""
    echo "🌐 Nginx статус:"
    systemctl status nginx --no-pager | head -n 3
    echo ""
    echo "💾 Использование диска:"
    df -h | grep -E "^/dev|^Filesystem"
    echo ""
    echo "🔒 SSL сертификат:"
    if [ -f "/etc/letsencrypt/live/*/fullchain.pem" ]; then
        echo "SSL настроен"
        certbot certificates 2>/dev/null | grep -E "Domains:|Expiry Date:" || true
    else
        echo "SSL не настроен"
    fi
ENDSSH
}

# ========================================
# ОСНОВНАЯ ЛОГИКА
# ========================================

# Баннер
echo -e "${CYAN}"
echo "╔════════════════════════════════════════╗"
echo "║     AdBid Automatic Deployment Tool    ║"
echo "║         Version 2.0 - Enhanced         ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Обработка параметров
FORCE_DEPLOY=false
NO_BACKUP=false
DO_ROLLBACK=false
DO_SSL=false
SHOW_STATUS=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --force)
            FORCE_DEPLOY=true
            shift
            ;;
        --no-backup)
            NO_BACKUP=true
            shift
            ;;
        --rollback)
            DO_ROLLBACK=true
            shift
            ;;
        --ssl)
            DO_SSL=true
            shift
            ;;
        --status)
            SHOW_STATUS=true
            shift
            ;;
        --help)
            echo "Использование: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --force       Пропустить проверки"
            echo "  --no-backup   Не создавать бекап"
            echo "  --rollback    Откатить на предыдущую версию"
            echo "  --ssl         Настроить SSL сертификат"
            echo "  --status      Показать статус сервера"
            echo "  --help        Показать эту справку"
            exit 0
            ;;
        *)
            error "Неизвестный параметр: $1"
            ;;
    esac
done

# Выполнение операций
if [ "$SHOW_STATUS" = true ]; then
    show_status
    exit 0
fi

if [ "$DO_ROLLBACK" = true ]; then
    rollback
    check_site
    exit 0
fi

if [ "$DO_SSL" = true ]; then
    setup_ssl
    exit 0
fi

# Обычный деплой
log "Начало деплоя на ${SERVER_IP} (${DOMAIN})"
echo "======================================"

# Проверки
if [ "$FORCE_DEPLOY" = false ]; then
    check_requirements
fi

# Основные шаги деплоя
build_project
create_package
deploy_to_server
check_site

# Очистка
rm -f deploy.tar.gz

# Итоговая информация
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   🎉 ДЕПЛОЙ УСПЕШНО ЗАВЕРШЕН! 🎉      ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}📌 Информация:${NC}"
echo -e "  • Сайт: ${GREEN}http://${DOMAIN}${NC}"
echo -e "  • IP: ${GREEN}http://${SERVER_IP}${NC}"
echo ""
echo -e "${CYAN}📝 Полезные команды:${NC}"
echo -e "  • Статус: ${YELLOW}./auto-deploy.sh --status${NC}"
echo -e "  • Откат: ${YELLOW}./auto-deploy.sh --rollback${NC}"
echo -e "  • SSL: ${YELLOW}./auto-deploy.sh --ssl${NC}"
echo -e "  • Логи: ${YELLOW}ssh root@${SERVER_IP} 'tail -f /var/log/nginx/adbid_error.log'${NC}"
echo ""

# Сохранение информации о деплое
echo "{
    \"last_deploy\": \"$(date +'%Y-%m-%d %H:%M:%S')\",
    \"server\": \"${SERVER_IP}\",
    \"domain\": \"${DOMAIN}\",
    \"status\": \"success\"
}" > .last_deploy.json

log "Деплой завершен!"