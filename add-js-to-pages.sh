#!/bin/bash

# Скрипт для добавления JavaScript файлов ко всем HTML страницам

HTML_FILES=(
    "new-campaign.html"
    "campaign-step2.html"
    "campaign-step3.html"
    "campaign-step4.html"
    "campaign-step5.html"
    "campaign-success.html"
    "analytics-dashboard.html"
    "audiences.html"
    "creatives.html"
    "pixels.html"
    "billing.html"
    "settings.html"
    "meta-ads-accounts.html"
    "index-campaign.html"
)

JS_SNIPPET='    
    <!-- Core JavaScript Libraries -->
    <script src="js/storage.js"></script>
    <script src="js/data.js"></script>
    <script src="js/app.js"></script>
</body>
</html>'

for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Проверяем, не добавлены ли уже скрипты
        if grep -q "js/storage.js" "$file"; then
            echo "  ✓ JavaScript already added to $file"
        else
            # Добавляем JavaScript перед закрывающим тегом body
            sed -i.bak 's|</body>|    \
    <!-- Core JavaScript Libraries -->\
    <script src="js/storage.js"></script>\
    <script src="js/data.js"></script>\
    <script src="js/app.js"></script>\
</body>|' "$file"
            echo "  ✓ JavaScript added to $file"
        fi
    else
        echo "  ⚠ File not found: $file"
    fi
done

echo "✅ JavaScript integration complete!"