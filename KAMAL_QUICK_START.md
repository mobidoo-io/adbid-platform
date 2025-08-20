# 🚀 Kamal Quick Start для AdBid

## 📦 Что такое Kamal?

Kamal - это современный инструмент для деплоя Docker контейнеров на любой сервер без сложности Kubernetes. Он автоматически настраивает:
- ✅ SSL сертификаты (Let's Encrypt)
- ✅ Zero-downtime deployments
- ✅ Load balancing через Traefik
- ✅ Health checks
- ✅ Автоматические rollbacks

## 🎯 Быстрый старт за 5 минут

### Шаг 1: Установите Kamal
```bash
# Установка через gem (требуется Ruby)
gem install kamal

# Или на Mac через Homebrew
brew install kamal
```

### Шаг 2: Создайте Docker Hub аккаунт
1. Зарегистрируйтесь на [Docker Hub](https://hub.docker.com)
2. Создайте репозиторий с именем `adbid`
3. Получите Access Token: Account Settings → Security → New Access Token

### Шаг 3: Настройте проект
```bash
# Скопируйте и заполните .env файл
cp .env.example .env

# Отредактируйте .env
nano .env
```

Добавьте в .env:
```env
KAMAL_REGISTRY_USERNAME=ваш_dockerhub_username
KAMAL_REGISTRY_PASSWORD=ваш_dockerhub_token
```

### Шаг 4: Используйте готовый скрипт
```bash
# Проверка конфигурации
./kamal-deploy.sh init

# Первоначальная настройка сервера (только один раз)
./kamal-deploy.sh setup

# Деплой приложения
./kamal-deploy.sh deploy
```

## 📋 Пошаговая инструкция

### 1️⃣ Подготовка локального окружения

```bash
# Проверьте установку Ruby
ruby --version  # Должно быть 2.7+

# Установите Kamal
gem install kamal

# Проверьте установку
kamal version
```

### 2️⃣ Настройка Docker Hub

```bash
# Войдите в Docker локально
docker login

# Введите ваш username и password/token
```

### 3️⃣ Конфигурация проекта

```bash
# Создайте .env из примера
cp .env.example .env

# Отредактируйте .env файл
# Добавьте ваши Docker Hub credentials:
KAMAL_REGISTRY_USERNAME=your_username
KAMAL_REGISTRY_PASSWORD=your_token_or_password
```

### 4️⃣ Обновите config/deploy.yml

Откройте `config/deploy.yml` и замените:
```yaml
# Было:
image: yourdockerhub/adbid

# Стало:
image: ваш_dockerhub_username/adbid
```

### 5️⃣ Проверьте SSH доступ

```bash
# Проверьте подключение к серверу
ssh root@165.227.11.220

# Если не работает, добавьте SSH ключ:
ssh-copy-id root@165.227.11.220
```

### 6️⃣ Первый деплой

```bash
# Инициализация и проверка
./kamal-deploy.sh init

# Настройка сервера (только первый раз!)
./kamal-deploy.sh setup

# Деплой приложения
./kamal-deploy.sh deploy
```

## 🔧 Команды для работы

### Основные команды скрипта:
```bash
./kamal-deploy.sh deploy    # Полный деплой
./kamal-deploy.sh quick     # Быстрый деплой без пересборки
./kamal-deploy.sh rollback  # Откат на предыдущую версию
./kamal-deploy.sh logs      # Просмотр логов
./kamal-deploy.sh status    # Статус деплоя
./kamal-deploy.sh console   # Консоль в контейнере
```

### Прямые команды Kamal:
```bash
kamal deploy         # Деплой
kamal rollback       # Откат
kamal app logs -f    # Логи в реальном времени
kamal app exec bash  # Shell в контейнере
kamal app restart    # Перезапуск
kamal app stop       # Остановка
kamal app start      # Запуск
```

## 🐛 Решение частых проблем

### Проблема: "Docker registry authentication failed"
```bash
# Решение 1: Проверьте .env файл
cat .env | grep KAMAL_REGISTRY

# Решение 2: Войдите в Docker Hub
docker login

# Решение 3: Используйте Access Token вместо пароля
# Создайте на Docker Hub: Settings → Security → Access Tokens
```

### Проблема: "SSH connection refused"
```bash
# Решение 1: Проверьте SSH ключ
ssh-keygen -t rsa -b 4096
ssh-copy-id root@165.227.11.220

# Решение 2: Проверьте IP сервера
ping 165.227.11.220
```

### Проблема: "Image build failed"
```bash
# Решение 1: Проверьте Dockerfile
docker build . -t test

# Решение 2: Проверьте package.json
npm install
npm run build

# Решение 3: Очистите кеш Docker
docker system prune -a
```

### Проблема: "Port 80/443 already in use"
```bash
# На сервере остановите nginx если он запущен
ssh root@165.227.11.220
systemctl stop nginx
systemctl disable nginx
```

## 📊 Мониторинг после деплоя

### Проверка работы сайта:
```bash
# Проверка HTTP
curl -I http://adbid.me

# Проверка HTTPS
curl -I https://adbid.me

# Проверка здоровья
curl https://adbid.me/health
```

### Просмотр логов:
```bash
# Логи приложения
./kamal-deploy.sh logs

# Логи Traefik (reverse proxy)
kamal traefik logs

# Все логи на сервере
ssh root@165.227.11.220 'docker logs $(docker ps -q)'
```

## ✅ Чеклист перед деплоем

- [ ] Ruby установлен (2.7+)
- [ ] Kamal установлен (`gem install kamal`)
- [ ] Docker Hub аккаунт создан
- [ ] Docker Hub token получен
- [ ] .env файл создан и заполнен
- [ ] config/deploy.yml обновлен (image name)
- [ ] SSH доступ к серверу работает
- [ ] DNS записи настроены (A записи для adbid.me)
- [ ] Порты 80 и 443 свободны на сервере

## 🎉 После успешного деплоя

1. **Сайт будет доступен по адресам:**
   - http://adbid.me (автоматический редирект на HTTPS)
   - https://adbid.me (с SSL сертификатом)

2. **SSL сертификат настроится автоматически** через Let's Encrypt

3. **Для обновлений используйте:**
   ```bash
   # После изменений в коде
   git add .
   git commit -m "Update"
   ./kamal-deploy.sh deploy
   ```

## 💡 Советы

1. **Используйте скрипт** `./kamal-deploy.sh` для упрощения работы
2. **Сохраните .env файл** в безопасном месте
3. **Регулярно делайте** `./kamal-deploy.sh cleanup` для очистки старых образов
4. **Мониторьте логи** после деплоя первые 5 минут
5. **Настройте GitHub Actions** для автоматического деплоя при push

## 🆘 Нужна помощь?

1. Проверьте логи: `./kamal-deploy.sh logs`
2. Проверьте статус: `./kamal-deploy.sh status`
3. Посмотрите [официальную документацию Kamal](https://kamal-deploy.org)
4. Откатитесь если что-то пошло не так: `./kamal-deploy.sh rollback`

---

**Готово к деплою!** 🚀 Следуйте инструкциям выше и ваш сайт будет развернут за 5-10 минут.