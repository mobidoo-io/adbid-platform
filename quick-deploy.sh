#!/bin/bash

# ========================================
# Быстрый деплой AdBid без Kamal
# ========================================

set -e

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

SERVER_IP="165.227.11.220"
DOMAIN="adbid.me"

echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🚀 Быстрый деплой AdBid              ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

# Проверка SSH
echo -e "${YELLOW}Проверка SSH доступа...${NC}"
if ssh -o ConnectTimeout=3 -o BatchMode=yes -o StrictHostKeyChecking=no root@$SERVER_IP "echo 'OK'" &>/dev/null; then
    echo -e "${GREEN}✅ SSH доступ работает${NC}"
    echo ""
    
    # Запуск деплоя
    echo -e "${CYAN}Запускаю деплой...${NC}"
    ./auto-deploy.sh --force
    
else
    echo -e "${RED}❌ SSH доступ не настроен${NC}"
    echo ""
    echo -e "${YELLOW}Ваш SSH ключ:${NC}"
    echo "=============================="
    cat ~/.ssh/id_rsa.pub
    echo "=============================="
    echo ""
    echo -e "${CYAN}Что нужно сделать:${NC}"
    echo ""
    echo "1️⃣  Откройте DigitalOcean: https://cloud.digitalocean.com"
    echo "2️⃣  Найдите ваш Droplet (IP: $SERVER_IP)"
    echo "3️⃣  Нажмите 'Access' → 'Launch Droplet Console'"
    echo "4️⃣  В консоли выполните эти команды:"
    echo ""
    echo -e "${YELLOW}mkdir -p ~/.ssh${NC}"
    echo -e "${YELLOW}cat >> ~/.ssh/authorized_keys << 'EOF'${NC}"
    cat ~/.ssh/id_rsa.pub
    echo -e "${YELLOW}EOF${NC}"
    echo -e "${YELLOW}chmod 600 ~/.ssh/authorized_keys${NC}"
    echo ""
    echo "5️⃣  После этого запустите этот скрипт снова: ${GREEN}./quick-deploy.sh${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${CYAN}Альтернативный способ (с паролем):${NC}"
    echo "Попробуйте добавить ключ автоматически:"
    echo ""
    echo -e "${YELLOW}ssh-copy-id root@$SERVER_IP${NC}"
    echo "(потребуется ввести пароль root)"
    echo ""
    
    read -p "Попробовать добавить ключ сейчас? (y/n): " try_ssh
    if [ "$try_ssh" = "y" ]; then
        ssh-copy-id root@$SERVER_IP
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Ключ добавлен! Запускаю деплой...${NC}"
            ./auto-deploy.sh --force
        fi
    fi
fi