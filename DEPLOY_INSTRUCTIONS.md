# 🚀 Инструкции по деплою AdBid

## Вариант 1: Kamal (Docker) - РЕКОМЕНДУЕТСЯ

### Что нужно сделать:

1. **Установите Kamal:**
   ```bash
   brew install kamal
   ```

2. **Запустите настройку:**
   ```bash
   ./setup-kamal.sh
   ```
   Скрипт попросит:
   - Docker Hub username
   - Docker Hub password или token
   - Подтвердит IP сервера (165.227.11.220)
   - Подтвердит домен (adbid.me)

3. **Инициализация и деплой:**
   ```bash
   # Проверка конфигурации
   ./kamal-deploy.sh init

   # Настройка сервера (только первый раз!)
   ./kamal-deploy.sh setup

   # Деплой приложения
   ./kamal-deploy.sh deploy
   ```

### Последующие деплои:
```bash
# После изменений в коде
./kamal-deploy.sh deploy
```

### Полезные команды:
```bash
./kamal-deploy.sh logs      # Посмотреть логи
./kamal-deploy.sh status    # Проверить статус
./kamal-deploy.sh rollback  # Откатить изменения
```

---

## Вариант 2: Прямой деплой (без Docker)

### Использовать если Kamal не работает:

```bash
# Простой деплой
./auto-deploy.sh

# С дополнительными опциями
./auto-deploy.sh --ssl     # Настроить SSL
./auto-deploy.sh --status  # Проверить статус
./auto-deploy.sh --rollback # Откатить
```

---

## ❓ Что выбрать?

### Используйте Kamal если:
- ✅ У вас есть Docker Hub аккаунт
- ✅ Хотите автоматический SSL
- ✅ Хотите zero-downtime деплой
- ✅ Хотите легкий откат

### Используйте auto-deploy.sh если:
- ✅ Нужен быстрый деплой без Docker
- ✅ Не хотите настраивать Docker Hub
- ✅ Kamal не установлен/не работает

---

## 🎯 Быстрый старт (5 минут)

Если у вас есть Docker Hub:
```bash
# 1. Настройка (один раз)
./setup-kamal.sh

# 2. Установка Kamal
brew install kamal

# 3. Деплой
./kamal-deploy.sh init
./kamal-deploy.sh setup
./kamal-deploy.sh deploy
```

Если нет Docker Hub:
```bash
# Прямой деплой
./auto-deploy.sh
```

---

## 📞 Проверка после деплоя

1. Откройте в браузере: https://adbid.me
2. Проверьте логи: `./kamal-deploy.sh logs`
3. Проверьте статус: `./kamal-deploy.sh status`

## 🆘 Если что-то пошло не так

```bash
# Для Kamal
./kamal-deploy.sh rollback

# Для auto-deploy
./auto-deploy.sh --rollback
```