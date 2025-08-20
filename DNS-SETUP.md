# 🌐 Настройка DNS для adbid.me

## Где купили домен?

### Вариант 1: Namecheap
1. Войдите в [Namecheap](https://www.namecheap.com)
2. Domain List → Manage → Advanced DNS
3. Добавьте записи:
   ```
   Type: A Record
   Host: @
   Value: 165.227.11.220
   TTL: Automatic
   
   Type: A Record  
   Host: www
   Value: 165.227.11.220
   TTL: Automatic
   ```

### Вариант 2: GoDaddy
1. Войдите в [GoDaddy](https://www.godaddy.com)
2. My Products → DNS → Manage DNS
3. Добавьте те же A записи

### Вариант 3: Cloudflare (рекомендуется)
1. Добавьте сайт в [Cloudflare](https://www.cloudflare.com)
2. DNS → Records → Add Record
3. Добавьте:
   ```
   Type: A
   Name: adbid.me
   IPv4: 165.227.11.220
   Proxy: OFF (важно для SSL через Kamal)
   
   Type: A
   Name: www
   IPv4: 165.227.11.220  
   Proxy: OFF
   ```

### Вариант 4: DigitalOcean (если домен там)
1. Networking → Domains
2. Add Domain → adbid.me
3. Create Records:
   ```
   A Record: @ → 165.227.11.220
   A Record: www → 165.227.11.220
   ```

## 🔍 Проверка DNS

После добавления записей проверьте:

```bash
# Проверка A записей
dig adbid.me
dig www.adbid.me

# Или через nslookup
nslookup adbid.me
nslookup www.adbid.me

# Должны видеть: 165.227.11.220
```

## ⏱️ Время распространения

DNS записи распространяются от 5 минут до 48 часов. Обычно:
- Cloudflare: 1-5 минут
- DigitalOcean: 5-15 минут  
- Namecheap/GoDaddy: 15-60 минут

## ✅ Готово к деплою

Когда DNS настроен, можно деплоить!