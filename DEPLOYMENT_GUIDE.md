# 🚀 AdBid Deployment Guide

## 📋 Содержание
- [Быстрый старт](#быстрый-старт)
- [Автоматический деплой](#автоматический-деплой)
- [GitHub Actions](#github-actions)
- [Ручной деплой](#ручной-деплой)
- [Управление сервером](#управление-сервером)
- [Troubleshooting](#troubleshooting)

## 🎯 Быстрый старт

### Основной деплой
```bash
# Автоматический деплой с проверками
./auto-deploy.sh

# Форсированный деплой (пропустить проверки)
./auto-deploy.sh --force
```

### Проверка статуса
```bash
# Показать статус сервера и версию
./auto-deploy.sh --status
```

### Откат изменений
```bash
# Откатить на предыдущую версию
./auto-deploy.sh --rollback
```

## 🤖 Автоматический деплой

### Использование auto-deploy.sh

Новый улучшенный скрипт `auto-deploy.sh` предоставляет следующие возможности:

#### Основные команды:
```bash
# Обычный деплой с бекапом
./auto-deploy.sh

# Деплой без создания бекапа
./auto-deploy.sh --no-backup

# Принудительный деплой (пропустить проверки)
./auto-deploy.sh --force

# Откат на предыдущую версию
./auto-deploy.sh --rollback

# Настройка SSL сертификата
./auto-deploy.sh --ssl

# Проверка статуса сервера
./auto-deploy.sh --status

# Справка
./auto-deploy.sh --help
```

#### Функции скрипта:
- ✅ Автоматическая проверка SSH доступа
- ✅ Проверка зависимостей (Node.js, npm)
- ✅ Автоматическая сборка проекта
- ✅ Создание версионных бекапов
- ✅ Автоматическая ротация бекапов (хранит последние 5)
- ✅ Проверка доступности сайта после деплоя
- ✅ Откат на предыдущую версию при ошибке
- ✅ Настройка SSL через Let's Encrypt
- ✅ Детальное логирование всех операций

## 🔄 GitHub Actions

### Настройка CI/CD

1. **Добавьте SSH ключ в GitHub Secrets:**
   ```bash
   # Получите приватный ключ
   cat ~/.ssh/id_rsa
   ```
   - Перейдите в Settings → Secrets → Actions
   - Создайте новый секрет `SSH_PRIVATE_KEY`
   - Вставьте содержимое приватного ключа

2. **Автоматический деплой при push:**
   - Деплой запускается автоматически при push в `main` или `master`
   - Можно запустить вручную через GitHub Actions UI

3. **Workflow файл:**
   - Уже настроен в `.github/workflows/deploy.yml`
   - Включает сборку, тестирование и деплой
   - Автоматический откат при ошибке

## 🔧 Ручной деплой

### Старый способ (deploy-do.sh)
```bash
# Использовать только если auto-deploy.sh не работает
./deploy-do.sh
```

### Полностью ручной деплой
```bash
# 1. Сборка проекта
npm install
npm run build

# 2. Создание архива
tar -czf deploy.tar.gz dist/* *.html Dashboard/

# 3. Загрузка на сервер
scp deploy.tar.gz root@165.227.11.220:/tmp/
scp nginx.conf root@165.227.11.220:/tmp/

# 4. Подключение к серверу
ssh root@165.227.11.220

# 5. На сервере: развертывание
cd /var/www/adbid
tar -xzf /tmp/deploy.tar.gz -C current/
chown -R www-data:www-data current
systemctl reload nginx
```

## 📊 Управление сервером

### Информация о сервере
- **IP адрес:** 165.227.11.220
- **Домен:** adbid.me
- **Путь на сервере:** /var/www/adbid/current
- **Бекапы:** /var/www/backups
- **Nginx конфиг:** /etc/nginx/sites-available/adbid

### SSH доступ
```bash
# Подключение к серверу
ssh root@165.227.11.220

# Проверка логов
tail -f /var/log/nginx/adbid_error.log
tail -f /var/log/nginx/adbid_access.log

# Перезапуск nginx
systemctl restart nginx

# Проверка статуса
systemctl status nginx
```

### Управление бекапами
```bash
# Посмотреть все бекапы
ssh root@165.227.11.220 'ls -lh /var/www/backups'

# Восстановить конкретный бекап
ssh root@165.227.11.220 'cp -r /var/www/backups/backup-20250120-153000 /var/www/adbid/current'

# Удалить старые бекапы
ssh root@165.227.11.220 'cd /var/www/backups && ls -t | tail -n +6 | xargs rm -rf'
```

### SSL сертификат
```bash
# Настроить SSL (Let's Encrypt)
./auto-deploy.sh --ssl

# Или вручную на сервере
ssh root@165.227.11.220
certbot --nginx -d adbid.me -d www.adbid.me

# Проверить сертификат
certbot certificates

# Обновить сертификат
certbot renew
```

## 🐛 Troubleshooting

### Проблема: SSH доступ не работает
```bash
# Проверить SSH ключ
ssh-keygen -t rsa -b 4096 -C "adbid-deploy"
ssh-copy-id root@165.227.11.220
```

### Проблема: Сайт не открывается
```bash
# Проверить nginx
ssh root@165.227.11.220 'nginx -t'
ssh root@165.227.11.220 'systemctl status nginx'

# Проверить файлы
ssh root@165.227.11.220 'ls -la /var/www/adbid/current'

# Проверить права
ssh root@165.227.11.220 'chown -R www-data:www-data /var/www/adbid'
```

### Проблема: Ошибка сборки
```bash
# Очистить кеш
rm -rf node_modules package-lock.json
npm install

# Проверить версию Node.js
node --version  # Должна быть 16+ или 18+

# Использовать vite напрямую
npx vite build
```

### Проблема: DNS не работает
```bash
# Проверить DNS записи
nslookup adbid.me
dig adbid.me

# На Cloudflare/вашем DNS провайдере:
# A запись: adbid.me → 165.227.11.220
# A запись: www.adbid.me → 165.227.11.220
```

## 📝 Чеклист перед деплоем

- [ ] Код закоммичен в git
- [ ] Тесты пройдены (если есть)
- [ ] Сборка работает локально (`npm run build`)
- [ ] SSH доступ к серверу настроен
- [ ] DNS записи настроены правильно
- [ ] Nginx конфигурация проверена
- [ ] Бекап предыдущей версии существует

## 🎯 Best Practices

1. **Всегда делайте бекап** перед важными изменениями
2. **Тестируйте локально** перед деплоем
3. **Используйте --status** для проверки состояния
4. **Мониторьте логи** после деплоя
5. **Настройте SSL** для production
6. **Используйте GitHub Actions** для автоматизации
7. **Документируйте изменения** в CHANGELOG

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `./auto-deploy.sh --status`
2. Посмотрите nginx логи на сервере
3. Попробуйте откатиться: `./auto-deploy.sh --rollback`
4. Проверьте этот документ на наличие решения

---

**Последнее обновление:** 20 января 2025
**Версия документа:** 2.0