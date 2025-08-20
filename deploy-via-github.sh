#!/bin/bash

# ========================================
# Деплой AdBid через GitHub
# ========================================
# Загружаем на GitHub, потом скачиваем на сервер

set -e

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   📦 Деплой AdBid через GitHub         ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

# Проверка git
if ! git status &>/dev/null; then
    echo -e "${YELLOW}Инициализация git репозитория...${NC}"
    git init
    git add .
    git commit -m "Initial commit"
fi

# Сборка проекта
echo -e "${YELLOW}📦 Сборка проекта...${NC}"
npm install
npm run build || npx vite build

echo -e "${GREEN}✅ Проект собран${NC}"

# Коммит изменений
echo -e "${YELLOW}📤 Подготовка к загрузке на GitHub...${NC}"
git add .
git commit -m "Deploy to server $(date +'%Y-%m-%d %H:%M')" || true

# Проверка remote
if ! git remote | grep -q origin; then
    echo ""
    echo -e "${YELLOW}GitHub репозиторий не настроен!${NC}"
    echo ""
    echo "1. Создайте новый репозиторий на GitHub:"
    echo "   https://github.com/new"
    echo ""
    echo "2. Добавьте remote:"
    echo -e "   ${CYAN}git remote add origin https://github.com/YOUR_USERNAME/adbid.git${NC}"
    echo ""
    echo "3. Запустите скрипт снова"
    exit 1
fi

# Push на GitHub
echo -e "${YELLOW}📤 Загрузка на GitHub...${NC}"
git push -u origin main 2>/dev/null || git push -u origin master

GITHUB_URL=$(git remote get-url origin | sed 's/\.git$//')
echo -e "${GREEN}✅ Загружено на GitHub${NC}"
echo "   $GITHUB_URL"

# Генерация команд для сервера
echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}Теперь выполните на сервере:${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""
echo "1. Откройте DigitalOcean Console:"
echo "   https://cloud.digitalocean.com/droplets"
echo "   → Ваш droplet (165.227.11.220)"
echo "   → Access → Launch Droplet Console"
echo ""
echo "2. Скопируйте и выполните эти команды:"
echo ""
echo -e "${YELLOW}━━━━━ НАЧАЛО КОМАНД ━━━━━${NC}"
cat << 'COMMANDS'
# Установка необходимых пакетов
apt update && apt install -y git nginx

# Переход в директорию
cd /var/www

# Клонирование репозитория (замените YOUR_USERNAME)
rm -rf adbid.backup
mv adbid adbid.backup 2>/dev/null || true
git clone https://github.com/YOUR_USERNAME/adbid.git

# Переход в проект
cd adbid

# Установка зависимостей и сборка (если нужно)
# npm install && npm run build

# Настройка nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    server_name adbid.me www.adbid.me 165.227.11.220;
    root /var/www/adbid/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 30d;
    }
}
EOF

# Активация сайта
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Установка прав
chown -R www-data:www-data /var/www/adbid

# Перезапуск nginx
nginx -t && systemctl restart nginx

# Настройка SSL (опционально)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d adbid.me -d www.adbid.me --non-interactive --agree-tos -m admin@adbid.me

echo "✅ Деплой завершен!"
echo "Сайт доступен: http://adbid.me"
COMMANDS
echo -e "${YELLOW}━━━━━ КОНЕЦ КОМАНД ━━━━━${NC}"
echo ""
echo -e "${GREEN}После выполнения команд сайт будет доступен по адресу:${NC}"
echo -e "${CYAN}http://adbid.me${NC}"
echo ""

# Сохранение инструкций
cat > DEPLOY_COMMANDS.txt << 'EOF'
=== КОМАНДЫ ДЛЯ СЕРВЕРА ===

1. Откройте DigitalOcean Console
2. Выполните:

apt update && apt install -y git nginx
cd /var/www
rm -rf adbid.backup
mv adbid adbid.backup 2>/dev/null || true
git clone [YOUR_GITHUB_REPO_URL] adbid
cd adbid

cat > /etc/nginx/sites-available/adbid << 'NGINX'
server {
    listen 80;
    server_name adbid.me www.adbid.me 165.227.11.220;
    root /var/www/adbid/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
chown -R www-data:www-data /var/www/adbid
nginx -t && systemctl restart nginx

# SSL (опционально):
certbot --nginx -d adbid.me -d www.adbid.me --non-interactive --agree-tos -m admin@adbid.me
EOF

echo -e "${GREEN}📝 Команды сохранены в файл: DEPLOY_COMMANDS.txt${NC}"