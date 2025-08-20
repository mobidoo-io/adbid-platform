#!/bin/bash

# Скрипт установки Kamal
echo "🔧 Установка Kamal..."

# Попробуем разные способы установки
if command -v gem &> /dev/null; then
    echo "Устанавливаю через gem..."
    echo "Потребуется ввести пароль администратора:"
    sudo gem install kamal
    
    if [ $? -eq 0 ]; then
        echo "✅ Kamal установлен успешно!"
        kamal version
    else
        echo "❌ Не удалось установить через gem"
        echo ""
        echo "Попробуйте установить Ruby через rbenv:"
        echo "1. brew install rbenv"
        echo "2. rbenv install 3.2.0"
        echo "3. rbenv global 3.2.0"
        echo "4. gem install kamal"
    fi
else
    echo "❌ Ruby не найден"
    echo "Установите Ruby и попробуйте снова"
fi