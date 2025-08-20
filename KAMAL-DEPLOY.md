# 🚢 Деплой через Kamal на DigitalOcean

Kamal - это современный инструмент для Docker-деплоя без Kubernetes. Он автоматически настраивает SSL, load balancing и zero-downtime deployments.

## 📋 Предварительные требования

1. **Локально установите:**
   ```bash
   # Установка Kamal
   gem install kamal
   
   # Или через bundler
   bundle add kamal
   
   # Проверка установки
   kamal version
   ```

2. **Docker Hub аккаунт** (или другой registry)
   - Зарегистрируйтесь на https://hub.docker.com
   - Создайте репозиторий `adbid`

3. **DigitalOcean сервер**
   - Ubuntu 20.04/22.04
   - Минимум 1GB RAM
   - SSH доступ

## 🔧 Настройка

### Шаг 1: Подготовка окружения

1. **Скопируйте и настройте .env:**
```bash
cp .env.example .env
```

2. **Отредактируйте .env:**
```bash
KAMAL_REGISTRY_PASSWORD=your_docker_hub_password
SERVER_IP=YOUR.SERVER.IP.HERE
DOMAIN=yourdomain.com
LETSENCRYPT_EMAIL=your-email@example.com
```

### Шаг 2: Настройка конфигурации

1. **Отредактируйте `config/deploy.yml`:**
```yaml
# Замените эти значения:
image: yourusername/adbid  # Ваш Docker Hub username
servers:
  web:
    hosts:
      - YOUR_SERVER_IP  # IP вашего сервера
    labels:
      traefik.http.routers.adbid.rule: Host(`yourdomain.com`)  # Ваш домен
```

### Шаг 3: Первоначальная настройка сервера

```bash
# Подготовка сервера (один раз)
kamal setup

# Это установит Docker, настроит сеть и подготовит сервер
```

### Шаг 4: Деплой

```bash
# Сборка и деплой
kamal deploy

# Или пошагово:
kamal build          # Собрать Docker образ
kamal push           # Отправить в registry
kamal traefik boot   # Запустить Traefik (reverse proxy)
kamal app boot       # Запустить приложение
```

## 🚀 Команды Kamal

### Основные команды:
```bash
kamal deploy         # Полный деплой
kamal redeploy       # Передеплой без сборки
kamal rollback       # Откат к предыдущей версии
kamal app stop       # Остановить приложение
kamal app start      # Запустить приложение
kamal app restart    # Перезапустить
```

### Просмотр логов:
```bash
kamal app logs       # Логи приложения
kamal app logs -f    # Следить за логами
kamal traefik logs   # Логи Traefik
```

### Управление:
```bash
kamal app exec 'ls -la'     # Выполнить команду в контейнере
kamal app exec -i 'bash'    # Интерактивный shell
kamal app details            # Информация о деплое
kamal config                 # Проверить конфигурацию
```

### Обслуживание:
```bash
kamal prune          # Очистить старые образы
kamal remove         # Удалить все с сервера
kamal version        # Версия приложения на сервере
```

## 🔐 SSL сертификаты

Kamal автоматически настроит SSL через Let's Encrypt. Убедитесь что:
1. DNS записи указывают на ваш сервер
2. Порты 80 и 443 открыты
3. Email указан в конфигурации

## 🐳 Локальное тестирование

```bash
# Тестирование с Docker Compose
docker-compose up

# Откройте http://localhost:3000
```

## 📊 Мониторинг

### Проверка статуса:
```bash
# На сервере
kamal app details
kamal traefik details

# Проверка здоровья
curl https://yourdomain.com/health
```

### Просмотр ресурсов:
```bash
kamal app exec 'docker stats --no-stream'
```

## 🔄 CI/CD с GitHub Actions

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.2'
        bundler-cache: true
    
    - name: Install Kamal
      run: gem install kamal
    
    - name: Deploy
      env:
        KAMAL_REGISTRY_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
      run: kamal deploy
```

## 🆘 Решение проблем

### Docker registry authentication failed
```bash
# Войдите в Docker Hub локально
docker login

# Проверьте переменную окружения
echo $KAMAL_REGISTRY_PASSWORD
```

### Connection refused
```bash
# Проверьте SSH доступ
ssh root@YOUR_SERVER_IP

# Проверьте ключи
ssh-add -l
```

### Port already in use
```bash
# На сервере остановите конфликтующие сервисы
kamal app stop
docker ps
docker stop $(docker ps -q)
```

### SSL не работает
```bash
# Проверьте DNS
dig yourdomain.com

# Проверьте Traefik
kamal traefik logs
kamal traefik reboot
```

## ✅ Чеклист деплоя

- [ ] Установлен Kamal локально
- [ ] Настроен Docker Hub аккаунт
- [ ] Создан .env файл с credentials
- [ ] Обновлен config/deploy.yml
- [ ] DNS записи указывают на сервер
- [ ] Выполнен `kamal setup`
- [ ] Выполнен `kamal deploy`
- [ ] Проверен https://yourdomain.com
- [ ] Настроен GitHub Actions (опционально)

## 📞 Полезные ссылки

- [Kamal Documentation](https://kamal-deploy.org)
- [Docker Hub](https://hub.docker.com)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)

## 💡 Преимущества Kamal

✅ **Zero-downtime deployments** - обновления без простоя
✅ **Automatic SSL** - автоматические SSL сертификаты
✅ **Load balancing** - встроенная балансировка через Traefik  
✅ **Health checks** - автоматическая проверка здоровья
✅ **Rollback** - быстрый откат к предыдущей версии
✅ **Multi-server** - легко масштабируется на несколько серверов
✅ **No Kubernetes** - простота без сложности k8s