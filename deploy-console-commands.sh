#!/bin/bash
# Команды для выполнения в веб-консоли DigitalOcean
# Копируйте и вставляйте по одной команде

# 1. Обновление системы
apt-get update

# 2. Установка Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Установка Nginx
apt-get install -y nginx

# 4. Установка Git
apt-get install -y git

# 5. Клонирование репозитория
cd /var/www
git clone https://github.com/mobidoo-io/adbid-platform.git adbid
cd adbid

# 6. Установка зависимостей
npm install

# 7. Сборка проекта
npm run build

# 8. Создание конфигурации Nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    server_name 165.227.11.220 adbid.me www.adbid.me;
    
    root /var/www/adbid/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
EOF

# 9. Активация сайта
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 10. Установка прав
chown -R www-data:www-data /var/www/adbid
chmod -R 755 /var/www/adbid

# 11. Проверка и перезапуск Nginx
nginx -t
systemctl restart nginx

# 12. Проверка статуса
systemctl status nginx

echo "✅ Деплой завершен!"
echo "🔗 Сайт доступен по адресу: http://165.227.11.220"