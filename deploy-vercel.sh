#!/bin/bash

# ========================================
# Супер быстрый деплой через Vercel
# ========================================

set -e

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   🚀 Деплой через Vercel (30 секунд)   ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

# Проверка Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Устанавливаю Vercel CLI...${NC}"
    npm i -g vercel
fi

# Проверка сборки
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}Собираю проект...${NC}"
    npm run build || npx vite build
fi

echo -e "${GREEN}Запускаю деплой...${NC}"
echo ""
echo "Просто нажимайте Enter на все вопросы!"
echo ""

# Деплой
vercel --prod

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ ГОТОВО! Сайт развернут!           ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "Чтобы подключить домен adbid.me:"
echo "1. Откройте https://vercel.com/dashboard"
echo "2. Выберите проект → Settings → Domains"
echo "3. Добавьте adbid.me"
echo ""