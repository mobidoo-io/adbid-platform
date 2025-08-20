#!/bin/bash

# ========================================
# БЫСТРЫЙ ДЕПЛОЙ AdBid через Kamal
# ========================================
# Все настройки уже готовы!

set -e

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🚀 Деплой AdBid на сервер            ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Конфигурация:${NC}"
echo "  Docker Hub: ohmytraff/adbid"
echo "  Server: 165.227.11.220"
echo "  Domain: https://adbid.me"
echo ""

# Проверка Kamal
echo -e "${YELLOW}📋 Проверка Kamal...${NC}"
if ! command -v kamal &> /dev/null; then
    echo -e "${RED}❌ Kamal не установлен${NC}"
    echo ""
    echo "Установите Kamal одним из способов:"
    echo -e "${YELLOW}brew install kamal${NC}"
    echo "или"
    echo -e "${YELLOW}gem install kamal${NC}"
    echo ""
    echo "После установки запустите этот скрипт снова."
    exit 1
fi
echo -e "${GREEN}✅ Kamal установлен${NC}"

# Загрузка переменных окружения
export $(cat .env | grep -v '^#' | xargs)

# Проверка SSH
echo -e "${YELLOW}📋 Проверка SSH доступа...${NC}"
if ssh -o ConnectTimeout=5 -o BatchMode=yes root@165.227.11.220 "echo 'OK'" &>/dev/null; then
    echo -e "${GREEN}✅ SSH доступ работает${NC}"
else
    echo -e "${YELLOW}⚠️  SSH доступ может не работать${NC}"
    echo "Попробуйте: ssh-copy-id root@165.227.11.220"
fi

# Выбор действия
echo ""
echo -e "${CYAN}Выберите действие:${NC}"
echo "1) Первый деплой (полная настройка)"
echo "2) Обновление (быстрый деплой)"
echo "3) Откат на предыдущую версию"
echo "4) Посмотреть логи"
echo "5) Проверить статус"
echo ""
read -p "Ваш выбор (1-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}🚀 Запускаю первичную настройку и деплой...${NC}"
        echo "Это может занять 5-10 минут"
        echo ""
        
        # Setup (настройка сервера)
        echo -e "${BLUE}Шаг 1/3: Настройка сервера...${NC}"
        kamal setup
        
        # Build and push
        echo -e "${BLUE}Шаг 2/3: Сборка Docker образа...${NC}"
        kamal build push
        
        # Deploy
        echo -e "${BLUE}Шаг 3/3: Деплой на сервер...${NC}"
        kamal deploy
        
        echo ""
        echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║   ✅ Деплой завершен успешно!          ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "Сайт доступен: ${CYAN}https://adbid.me${NC}"
        echo ""
        ;;
    
    2)
        echo ""
        echo -e "${YELLOW}🔄 Запускаю обновление...${NC}"
        kamal deploy
        echo ""
        echo -e "${GREEN}✅ Обновление завершено!${NC}"
        echo -e "Сайт: ${CYAN}https://adbid.me${NC}"
        ;;
    
    3)
        echo ""
        echo -e "${YELLOW}⏪ Откат на предыдущую версию...${NC}"
        kamal rollback
        echo ""
        echo -e "${GREEN}✅ Откат выполнен!${NC}"
        ;;
    
    4)
        echo ""
        echo -e "${YELLOW}📋 Логи приложения (Ctrl+C для выхода):${NC}"
        kamal app logs --follow
        ;;
    
    5)
        echo ""
        echo -e "${YELLOW}📊 Статус деплоя:${NC}"
        kamal app details
        echo ""
        kamal app version
        ;;
    
    *)
        echo -e "${RED}Неверный выбор${NC}"
        exit 1
        ;;
esac