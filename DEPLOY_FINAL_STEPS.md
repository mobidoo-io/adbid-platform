# 🚀 Финальные шаги деплоя AdBid Platform

## Статус выполнения:
✅ Код загружен на GitHub: https://github.com/mobidoo-io/adbid-platform
✅ Проект собран локально (папка dist готова)
✅ Droplet готов: 165.227.11.220
⏳ Требуется SSH доступ к серверу

## Что нужно сделать:

### Вариант 1: Добавить SSH ключ на сервер

1. Скопируйте ваш публичный ключ:
```bash
cat ~/.ssh/id_rsa.pub
```

2. Подключитесь к серверу через веб-консоль DigitalOcean или с паролем:
```bash
ssh root@165.227.11.220
```

3. Добавьте ключ на сервере:
```bash
mkdir -p ~/.ssh
echo "ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

4. После этого запустите деплой:
```bash
./quick-deploy-now.sh
```

### Вариант 2: Деплой через веб-консоль DigitalOcean

1. Откройте веб-консоль для вашего droplet в панели DigitalOcean

2. Выполните команды:
```bash
# Установка необходимых пакетов
apt-get update
apt-get install -y nginx git

# Клонирование репозитория
cd /var/www
git clone https://github.com/mobidoo-io/adbid-platform.git adbid
cd adbid

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Установка зависимостей и сборка
npm install
npm run build

# Настройка Nginx
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

# Активация сайта
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Перезапуск Nginx
nginx -t && systemctl restart nginx
```

## После деплоя:

Ваше приложение будет доступно по адресам:
- http://165.227.11.220
- http://adbid.me (если DNS настроен)

## GitHub Actions (для автоматического деплоя):

1. Добавьте SSH ключ в секреты GitHub:
   - Перейдите в Settings → Secrets → Actions
   - Создайте новый секрет `SSH_PRIVATE_KEY`
   - Вставьте содержимое `cat ~/.ssh/id_rsa`

2. После этого каждый push в main будет автоматически деплоиться

## Проверка работы:

После деплоя проверьте:
```bash
curl http://165.227.11.220
```

Или откройте в браузере: http://165.227.11.220