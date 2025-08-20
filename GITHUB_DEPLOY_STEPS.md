# 🚀 Деплой через GitHub за 5 минут

## Шаг 1: Создайте репозиторий на GitHub

1. Откройте https://github.com/new
2. Введите название: `adbid-deploy`
3. Сделайте его **Public** (публичным)
4. НЕ добавляйте README, .gitignore или лицензию
5. Нажмите **Create repository**

## Шаг 2: Загрузите проект на GitHub

Скопируйте и выполните эти команды в терминале:

```bash
cd /Users/macucer/Downloads/Claude/Adbid

# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/adbid-deploy.git

# Загрузите проект
git branch -M main
git push -u origin main
```

**Примечание:** Если попросит логин/пароль, используйте:
- Username: ваш GitHub username
- Password: ваш GitHub Personal Access Token (не обычный пароль!)

[Создать токен здесь](https://github.com/settings/tokens/new)

## Шаг 3: Скачайте на сервер через Web Console

Откройте **Digital Ocean Web Console** и выполните:

```bash
# Установка необходимых пакетов
apt update && apt install -y nginx git

# Клонирование репозитория (замените YOUR_USERNAME)
cd /tmp
git clone https://github.com/YOUR_USERNAME/adbid-deploy.git
cd adbid-deploy

# Создание директории для сайта
mkdir -p /var/www/adbid

# Копирование файлов
cp -r dist/* /var/www/adbid/ 2>/dev/null || true
cp -r *.html /var/www/adbid/
cp -r Dashboard /var/www/adbid/

# Настройка nginx
cp nginx.conf /etc/nginx/sites-available/adbid
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Права доступа
chown -R www-data:www-data /var/www/adbid

# Перезапуск nginx
nginx -t && systemctl reload nginx

echo "✅ Сайт развернут!"
echo "🌐 Откройте: http://adbid.me или http://165.227.11.220"
```

## 🎯 Альтернатива: Прямая ссылка на архив

Если не хотите использовать git, можно загрузить архив напрямую:

1. Загрузите файл `adbid-deploy.tar.gz` на GitHub как Release
2. Получите прямую ссылку на архив
3. На сервере выполните:

```bash
# Скачайте архив (замените URL)
wget https://github.com/YOUR_USERNAME/adbid-deploy/releases/download/v1.0/adbid-deploy.tar.gz

# Распакуйте
tar -xzf adbid-deploy.tar.gz

# Далее те же команды для установки...
```

## 📌 Быстрая проверка

После деплоя проверьте:

```bash
# Статус nginx
systemctl status nginx

# Проверка сайта
curl http://localhost

# Логи ошибок
tail -f /var/log/nginx/error.log
```

## 🔒 SSL сертификат (опционально)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d adbid.me -d www.adbid.me
```

## ✅ Готово!

Ваш сайт будет доступен по адресам:
- http://adbid.me
- http://www.adbid.me  
- http://165.227.11.220

---

## 🆘 Если что-то не работает

1. **Nginx не запускается:**
   ```bash
   nginx -t  # проверка конфигурации
   journalctl -xe  # логи системы
   ```

2. **Сайт не открывается:**
   - Проверьте DNS: `nslookup adbid.me`
   - Проверьте firewall: `ufw status`
   - Проверьте порты: `netstat -tlpn | grep :80`

3. **404 ошибка:**
   - Проверьте пути: `ls -la /var/www/adbid/`
   - Проверьте права: `chown -R www-data:www-data /var/www/adbid`