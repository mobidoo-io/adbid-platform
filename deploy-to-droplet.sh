#!/bin/bash

# Deploy script for AdBid Platform
# Server: 165.227.11.220

echo "🚀 Starting deployment to DigitalOcean Droplet..."

# Configuration
SERVER_IP="165.227.11.220"
SERVER_USER="root"
APP_DIR="/var/www/adbid"
REPO_URL="https://github.com/mobidoo-io/adbid-platform.git"

# Build locally first
echo "📦 Building application locally..."
npm install
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy-package.tar.gz \
  dist \
  package.json \
  package-lock.json \
  nginx.conf \
  --exclude node_modules

# Upload to server
echo "📤 Uploading to server..."
scp deploy-package.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

# Deploy on server
echo "🔧 Deploying on server..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
set -e

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    apt-get install -y nodejs
fi

# Install Nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    apt-get update
    apt-get install -y nginx
fi

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Create app directory
mkdir -p /var/www/adbid
cd /var/www/adbid

# Extract deployment package
tar -xzf /tmp/deploy-package.tar.gz

# Install dependencies
npm install --production

# Setup Nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    server_name 165.227.11.220 adbid.me www.adbid.me;

    root /var/www/adbid/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx

# Start application with PM2 (if you have backend)
# pm2 delete adbid || true
# pm2 start npm --name "adbid" -- start
# pm2 save
# pm2 startup systemd -u root --hp /root

echo "✅ Deployment complete!"
echo "🌐 Application is available at: http://165.227.11.220"
ENDSSH

# Cleanup
rm -f deploy-package.tar.gz

echo "✨ Deployment finished successfully!"
echo "🔗 Access your application at: http://165.227.11.220"
echo "🔗 Or at your domain: http://adbid.me"