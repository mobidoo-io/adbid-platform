# 🔑 Инструкция по настройке SSH доступа к серверу Digital Ocean

## Способ 1: Через Web Console (Рекомендуется)

1. **Откройте Digital Ocean Console:**
   - Зайдите на https://cloud.digitalocean.com
   - Найдите ваш droplet с IP: `165.227.11.220`
   - Нажмите на название droplet
   - Нажмите кнопку **"Access"** → **"Launch Droplet Console"**

2. **В открывшейся консоли выполните команды по очереди:**

```bash
# Создайте директорию для SSH ключей
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Добавьте SSH ключ (скопируйте и вставьте эту команду целиком)
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/VLoOXFqOhmVwk5zudxUEWJ8DLGkMyHnjjyq0QHPsxiBQs1uskYM1vmNCasFyYK2v3zIGiBKZUESozm45a9Le3QHy9QmYQgljD68GcgHdm3SOgM3fBhRI/hyD24RpeBObeExHjDIM0iuxlgAWrBAyzLSrsUaOyZU9LzUoJoNBgt/ur0OqsRdUnFitaFWaiDmX0X49ok9zu0f2whts/9gsb/G4tfVRUFicIth20Bt81taaNATlT0D4Dzcyw3cckighs8ddWEZBRdIJNYfMNfAf9Qk4lH0DUSJeXH2OcR+AFF2DqUUr33iLSVQ6803v3cfvPapMWanirJz3MwQ8RJRn macucer@MacBook-Pro-MacUser.local" >> ~/.ssh/authorized_keys

# Установите правильные права доступа
chmod 600 ~/.ssh/authorized_keys

# Проверьте, что ключ добавлен
cat ~/.ssh/authorized_keys
```

3. **Проверьте, что все работает:**
   - В консоли должен появиться ваш SSH ключ
   - Закройте Web Console

## Способ 2: Через Recovery Console (Если первый не работает)

1. Перейдите в **Settings** → **Access** → **Reset Root Password**
2. Получите временный пароль на email
3. Подключитесь через терминал с паролем:
   ```bash
   ssh root@165.227.11.220
   ```
4. Введите временный пароль и установите новый
5. Выполните команды из Способа 1

## 🧪 Проверка подключения

После добавления ключа, запустите в терминале:

```bash
ssh root@165.227.11.220
```

Если все настроено правильно, вы подключитесь без запроса пароля.

## 🚀 После успешной настройки SSH

Запустите скрипт деплоя:

```bash
cd /Users/macucer/Downloads/Claude/Adbid
./deploy-do.sh
```

## ⚠️ Возможные проблемы

1. **Permission denied (publickey)** - SSH ключ не добавлен или добавлен неправильно
2. **Connection refused** - Проверьте IP адрес и что сервер запущен
3. **Connection timeout** - Проверьте firewall настройки в Digital Ocean

## 📞 Нужна помощь?

Если возникли проблемы:
1. Проверьте что копируете ВЕСЬ ключ (начинается с `ssh-rsa` и заканчивается `local`)
2. Убедитесь что используете правильный IP: `165.227.11.220`
3. Проверьте статус droplet в Digital Ocean панели