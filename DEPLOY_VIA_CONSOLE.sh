#!/bin/bash
# ВЫПОЛНИТЕ ЭТИ КОМАНДЫ В DIGITAL OCEAN WEB CONSOLE
# ===================================================

# 1. Установка необходимых пакетов
apt update && apt install -y nginx wget unzip

# 2. Создание директорий
mkdir -p /var/www/adbid
cd /var/www/adbid

# 3. Скачивание проекта (замените URL на ваш)
# Вариант А: Если загрузите архив на файлообменник
# wget "ВАШ_URL_НА_АРХИВ" -O adbid.tar.gz
# tar -xzf adbid.tar.gz

# Вариант Б: Создание базовой страницы прямо на сервере
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdBid - Advertising Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
        .container {
            text-align: center;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .status {
            background: #4caf50;
            padding: 10px 30px;
            border-radius: 50px;
            display: inline-block;
            margin: 20px 0;
            font-weight: bold;
        }
        .info {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            padding: 15px 40px;
            margin: 10px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            transition: all 0.3s;
        }
        .btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 AdBid</h1>
        <p style="font-size: 1.5rem; margin-bottom: 20px;">Your Advertising Platform</p>
        <div class="status">✅ ONLINE</div>
        
        <div class="info">
            <h2>Platform Status</h2>
            <p>Server: Digital Ocean</p>
            <p>Domain: adbid.me</p>
            <p>IP: 165.227.11.220</p>
            <p>Status: Operational</p>
        </div>
        
        <div>
            <a href="/dashboard.html" class="btn">Dashboard</a>
            <a href="/Dashboard/index.html" class="btn">Admin Panel</a>
        </div>
        
        <div style="margin-top: 30px; opacity: 0.8;">
            <p>© 2024 AdBid. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
EOF

# 4. Настройка Nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name adbid.me www.adbid.me 165.227.11.220;
    
    root /var/www/adbid;
    index index.html dashboard.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    access_log /var/log/nginx/adbid_access.log;
    error_log /var/log/nginx/adbid_error.log;
}
EOF

# 5. Активация сайта
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 6. Установка прав
chown -R www-data:www-data /var/www/adbid

# 7. Перезапуск Nginx
nginx -t && systemctl reload nginx

# 8. Проверка
echo "========================================="
echo "✅ Деплой завершен!"
echo "🌐 Сайт доступен по адресу:"
echo "   http://adbid.me"
echo "   http://165.227.11.220"
echo "========================================="

# 9. Опционально: SSL сертификат
# apt install -y certbot python3-certbot-nginx
# certbot --nginx -d adbid.me -d www.adbid.me