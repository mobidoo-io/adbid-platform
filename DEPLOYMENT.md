# 🚀 Руководство по деплою на DigitalOcean

## 📋 Предварительные требования

1. **Сервер DigitalOcean** (Ubuntu 20.04/22.04)
2. **SSH доступ** к серверу
3. **Домен** (опционально, можно использовать IP)

## 🛠️ Пошаговая инструкция

### Шаг 1: Подготовка сервера

1. **Подключитесь к серверу:**
```bash
ssh root@YOUR_SERVER_IP
```

2. **Скопируйте и запустите setup-server.sh:**
```bash
# На локальной машине
scp setup-server.sh root@YOUR_SERVER_IP:/tmp/

# На сервере
ssh root@YOUR_SERVER_IP
chmod +x /tmp/setup-server.sh
/tmp/setup-server.sh
```

### Шаг 2: Настройка Nginx

1. **Отредактируйте nginx.conf локально:**
   - Замените `yourdomain.com` на ваш домен или IP сервера
   
2. **Загрузите конфигурацию на сервер:**
```bash
scp nginx.conf root@YOUR_SERVER_IP:/tmp/
```

3. **На сервере установите конфигурацию:**
```bash
ssh root@YOUR_SERVER_IP
cp /tmp/nginx.conf /etc/nginx/sites-available/adbid
ln -s /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Шаг 3: Деплой проекта

1. **Отредактируйте deploy.sh:**
```bash
# Откройте deploy.sh и измените:
SERVER_IP="YOUR_SERVER_IP"    # Ваш IP адрес
DOMAIN="yourdomain.com"       # Ваш домен (если есть)
```

2. **Сделайте скрипт исполняемым:**
```bash
chmod +x deploy.sh
```

3. **Запустите деплой:**
```bash
./deploy.sh
```

### Шаг 4: Настройка SSL (HTTPS)

Если у вас есть домен:

```bash
ssh root@YOUR_SERVER_IP
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Шаг 5: Проверка

1. **Откройте в браузере:**
   - http://YOUR_SERVER_IP или http://yourdomain.com
   - Проверьте dashboard: http://YOUR_SERVER_IP/dashboard.html

## 🔧 Дополнительные настройки

### Создание non-root пользователя (рекомендуется)

```bash
adduser adbid
usermod -aG sudo adbid
su - adbid
```

### Настройка автоматического деплоя

1. **Настройте SSH ключи:**
```bash
ssh-copy-id root@YOUR_SERVER_IP
```

2. **Используйте GitHub Actions (опционально):**
Создайте `.github/workflows/deploy.yml` для автоматического деплоя

### Мониторинг и логи

```bash
# Просмотр логов nginx
tail -f /var/log/nginx/adbid_access.log
tail -f /var/log/nginx/adbid_error.log

# Проверка статуса nginx
systemctl status nginx
```

## 📱 Структура проекта на сервере

```
/var/www/adbid/
├── current/          # Текущая версия
│   ├── index.html
│   ├── dashboard.html
│   ├── analytics-dashboard.html
│   └── ...
└── backup/           # Предыдущая версия (автоматический бекап)
```

## 🆘 Решение проблем

### Nginx не запускается
```bash
nginx -t  # Проверка конфигурации
journalctl -xe  # Просмотр логов
```

### 502 Bad Gateway
- Проверьте, что все пути в nginx.conf правильные
- Убедитесь, что права доступа установлены правильно

### Файлы не обновляются
- Очистите кеш браузера (Ctrl+Shift+R)
- Проверьте права доступа: `chown -R www-data:www-data /var/www/adbid`

## 🔐 Безопасность

1. **Используйте SSH ключи** вместо паролей
2. **Настройте firewall** (ufw)
3. **Регулярно обновляйте** систему
4. **Используйте SSL** сертификаты
5. **Создайте non-root** пользователя для деплоя

## 📞 Быстрые команды

```bash
# Быстрый деплой
./deploy.sh

# Перезапуск nginx
ssh root@YOUR_SERVER_IP "systemctl restart nginx"

# Просмотр логов
ssh root@YOUR_SERVER_IP "tail -f /var/log/nginx/adbid_error.log"

# Откат к предыдущей версии
ssh root@YOUR_SERVER_IP "cd /var/www/adbid && rm -rf current && mv backup current"
```

## ✅ Чеклист деплоя

- [ ] Сервер настроен (setup-server.sh)
- [ ] Nginx сконфигурирован
- [ ] Проект задеплоен (deploy.sh)
- [ ] Сайт доступен по HTTP
- [ ] SSL настроен (если есть домен)
- [ ] Firewall настроен
- [ ] Бекапы работают
- [ ] Мониторинг настроен