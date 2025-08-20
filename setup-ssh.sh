#!/bin/bash

echo "🔐 Настройка SSH доступа к серверу AdBid"
echo "========================================="
echo ""

SERVER_IP="165.227.11.220"

# Проверка существующего ключа
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "📝 Создание SSH ключа..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N "" -C "adbid-deploy"
    echo "✅ SSH ключ создан"
else
    echo "✅ SSH ключ уже существует"
fi

echo ""
echo "📋 Ваш публичный ключ:"
echo "========================"
cat ~/.ssh/id_rsa.pub
echo "========================"
echo ""

echo "⚠️  ВАЖНО: Скопируйте ключ выше и добавьте его на сервер!"
echo ""
echo "Варианты добавления ключа:"
echo ""
echo "1️⃣  Автоматически (потребуется пароль root):"
echo "   ssh-copy-id root@$SERVER_IP"
echo ""
echo "2️⃣  Через DigitalOcean панель:"
echo "   - Войдите в DigitalOcean"
echo "   - Droplets → ваш сервер → Access → Launch Droplet Console"
echo "   - Выполните: echo 'ВАШ_КЛЮЧ' >> ~/.ssh/authorized_keys"
echo ""
echo "3️⃣  Вручную на сервере:"
echo "   ssh root@$SERVER_IP"
echo "   mkdir -p ~/.ssh"
echo "   echo 'ВАШ_КЛЮЧ' >> ~/.ssh/authorized_keys"
echo "   chmod 600 ~/.ssh/authorized_keys"
echo ""

# Попытка автоматического добавления
read -p "Попробовать добавить ключ автоматически? (y/n): " try_auto

if [ "$try_auto" = "y" ]; then
    echo ""
    echo "Введите пароль root для сервера $SERVER_IP"
    ssh-copy-id root@$SERVER_IP
    
    if [ $? -eq 0 ]; then
        echo "✅ Ключ успешно добавлен!"
        echo ""
        echo "Проверка подключения..."
        if ssh -o ConnectTimeout=5 root@$SERVER_IP "echo 'SSH работает!'" 2>/dev/null; then
            echo "✅ SSH доступ настроен успешно!"
            echo ""
            echo "Теперь можно запустить деплой:"
            echo "./auto-deploy.sh"
        fi
    else
        echo "❌ Не удалось добавить ключ автоматически"
        echo "Используйте один из ручных способов выше"
    fi
fi