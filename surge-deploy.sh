#!/bin/bash

# Быстрый деплой через Surge.sh (без сложной регистрации)

echo "🚀 Деплой через Surge.sh..."
echo ""
echo "Введите email (любой) и пароль когда попросят"
echo "Для домена просто нажмите Enter (получите random-name.surge.sh)"
echo ""

npx surge dist

echo ""
echo "✅ Готово!"
echo ""
echo "Чтобы обновить сайт в будущем, используйте ту же команду:"
echo "npx surge dist"