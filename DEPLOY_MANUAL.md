# 📋 Ручной деплой AdBid

## Вариант 1: Настроить SSH и использовать скрипты

### Шаг 1: Настройте SSH
```bash
./setup-ssh.sh
```
Следуйте инструкциям на экране.

### Шаг 2: Запустите деплой
```bash
./auto-deploy.sh
```

---

## Вариант 2: Деплой через DigitalOcean консоль

### Шаг 1: Соберите проект локально
```bash
npm install
npm run build
```

### Шаг 2: Создайте архив
```bash
tar -czf adbid-deploy.tar.gz dist/* *.html Dashboard/ nginx.conf
```

### Шаг 3: Загрузите через DigitalOcean

1. Войдите в [DigitalOcean](https://cloud.digitalocean.com)
2. Откройте ваш Droplet (165.227.11.220)
3. Нажмите "Access" → "Launch Droplet Console"
4. В консоли выполните:

```bash
# Создание директорий
mkdir -p /var/www/adbid
cd /var/www/adbid

# Загрузка файлов (используйте Droplet Console Upload)
# Или используйте wget если файлы на GitHub:
# wget https://github.com/yourusername/adbid/archive/main.zip

# Распаковка
tar -xzf adbid-deploy.tar.gz

# Установка nginx если нужно
apt update && apt install -y nginx

# Настройка nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    server_name adbid.me www.adbid.me 165.227.11.220;
    root /var/www/adbid;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Активация сайта
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Перезапуск nginx
nginx -t && systemctl restart nginx

# Настройка SSL
apt install -y certbot python3-certbot-nginx
certbot --nginx -d adbid.me -d www.adbid.me --non-interactive --agree-tos -m admin@adbid.me
```

---

## Вариант 3: Деплой через GitHub Actions

### Если проект на GitHub:

1. Добавьте SSH ключ в GitHub Secrets:
   - Settings → Secrets → Actions
   - New repository secret
   - Name: `SSH_PRIVATE_KEY`
   - Value: содержимое `~/.ssh/id_rsa`

2. Push в репозиторий:
```bash
git add .
git commit -m "Deploy to server"
git push
```

GitHub Actions автоматически выполнит деплой (если настроен .github/workflows/deploy.yml)

---

## 🆘 Быстрые команды для проверки

### Проверить сайт:
```bash
curl -I http://adbid.me
curl -I http://165.227.11.220
```

### Проверить SSH (если настроен):
```bash
ssh root@165.227.11.220 "echo 'SSH works'"
```

### Проверить статус на сервере:
Через DigitalOcean Console:
```bash
systemctl status nginx
ls -la /var/www/adbid
```

---

## ⚡ Самый быстрый способ:

1. Откройте [DigitalOcean Droplet Console](https://cloud.digitalocean.com/droplets)
2. Скопируйте и выполните:

```bash
# Быстрый деплой одной командой
cd /tmp && \
wget https://raw.githubusercontent.com/yourusername/adbid/main/setup-server.sh && \
chmod +x setup-server.sh && \
./setup-server.sh
```

Или используйте готовый архив если он есть на сервере:
```bash
cd /var/www/adbid
tar -xzf /tmp/adbid-deploy.tar.gz
systemctl restart nginx
```