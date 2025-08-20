# Настройка GitHub для MCP

## Шаги для подключения GitHub:

### 1. Создайте Personal Access Token на GitHub:

1. Откройте GitHub.com и войдите в свой аккаунт
2. Перейдите в Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Нажмите "Generate new token (classic)"
4. Дайте токену имя: "MCP DigitalOcean Deploy"
5. Выберите права доступа:
   - ✅ repo (полный доступ к репозиториям)
   - ✅ workflow
   - ✅ write:packages
   - ✅ delete:packages
   - ✅ admin:org
   - ✅ admin:public_key
   - ✅ admin:repo_hook

6. Нажмите "Generate token"
7. **ВАЖНО**: Скопируйте токен сразу! Он больше не будет показан.

### 2. Добавьте токен в конфигурацию MCP:

Токен нужно добавить в файл `.mcp.json` или в переменные окружения.

### 3. После настройки токена мы сможем:
- Создать репозиторий на GitHub
- Загрузить код проекта
- Настроить автоматический деплой через DigitalOcean App Platform

## Альтернативный вариант - используем уже существующий репозиторий:

Если у вас уже есть GitHub репозиторий, сообщите мне:
1. Имя пользователя/организации
2. Название репозитория
3. Мы подключим его к DigitalOcean App Platform