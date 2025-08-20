#!/bin/bash
# ТОЧНЫЕ команды для исправления SSH ключа
# Выполните ЭТИ команды в Digital Ocean Web Console

echo "=== Исправление SSH доступа ==="

# 1. Проверяем текущие ключи
echo "Текущие SSH ключи:"
cat ~/.ssh/authorized_keys 2>/dev/null || echo "Файл не найден"

# 2. Создаем правильную структуру
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 3. ПОЛНОСТЬЮ заменяем файл authorized_keys
cat > ~/.ssh/authorized_keys << 'EOF'
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/VLoOXFqOhmVwk5zudxUEWJ8DLGkMyHnjjyq0QHPsxiBQs1uskYM1vmNCasFyYK2v3zIGiBKZUESozm45a9Le3QHy9QmYQgljD68GcgHdm3SOgM3fBhRI/hyD24RpeBObeExHjDIM0iuxlgAWrBAyzLSrsUaOyZU9LzUoJoNBgt/ur0OqsRdUnFitaFWaiDmX0X49ok9zu0f2whts/9gsb/G4tfVRUFicIth20Bt81taaNATlT0D4Dzcyw3cckighs8ddWEZBRdIJNYfMNfAf9Qk4lH0DUSJeXH2OcR+AFF2DqUUr33iLSVQ6803v3cfvPapMWanirJz3MwQ8RJRn macucer@MacBook-Pro-MacUser.local
EOF

# 4. Устанавливаем правильные права
chmod 600 ~/.ssh/authorized_keys

# 5. Проверяем права доступа
ls -la ~/.ssh/

# 6. Проверяем содержимое файла
echo ""
echo "Ключ добавлен:"
cat ~/.ssh/authorized_keys

# 7. Проверяем SSH настройки
echo ""
echo "SSH настройки:"
grep -E "^(PermitRootLogin|PubkeyAuthentication|PasswordAuthentication)" /etc/ssh/sshd_config

# 8. Перезапускаем SSH (если нужно)
systemctl restart ssh 2>/dev/null || systemctl restart sshd 2>/dev/null || echo "SSH сервис уже работает"

echo ""
echo "✅ SSH ключ обновлен! Попробуйте подключиться снова."