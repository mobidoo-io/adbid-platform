#!/bin/bash

echo "🚀 Quick deployment to 165.227.11.220..."

# Create deployment package with built files
tar -czf deploy-quick.tar.gz \
  dist \
  *.html \
  nginx.conf \
  --exclude node_modules 2>/dev/null

# Upload and deploy
scp deploy-quick.tar.gz root@165.227.11.220:/tmp/

ssh root@165.227.11.220 << 'ENDSSH'
set -e

# Install Nginx if needed
if ! command -v nginx &> /dev/null; then
    apt-get update
    apt-get install -y nginx
fi

# Deploy files
mkdir -p /var/www/adbid
cd /var/www/adbid
tar -xzf /tmp/deploy-quick.tar.gz

# Configure Nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    server_name 165.227.11.220 adbid.me www.adbid.me;
    
    root /var/www/adbid/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Serve HTML files from root
    location ~ \.html$ {
        root /var/www/adbid;
        try_files $uri /dist/$uri =404;
    }
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Set permissions
chown -R www-data:www-data /var/www/adbid
chmod -R 755 /var/www/adbid

# Restart Nginx
nginx -t && systemctl restart nginx

echo "✅ Deployment complete!"
ENDSSH

rm -f deploy-quick.tar.gz

echo "✨ Deployment finished!"
echo "🔗 Visit: http://165.227.11.220"
echo "🔗 Or: http://adbid.me"