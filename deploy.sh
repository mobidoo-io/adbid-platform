#!/bin/bash

# DigitalOcean Deployment Script for AdBid Project
# =================================================

# Configuration - ИЗМЕНИТЕ ЭТИ ПАРАМЕТРЫ
SERVER_IP="${1:-YOUR_SERVER_IP}"     # IP адрес вашего сервера (или первый аргумент)
SERVER_USER="root"                   # Пользователь на сервере
PROJECT_NAME="adbid"                 # Название проекта
DOMAIN="${2:-yourdomain.com}"        # Ваш домен (или второй аргумент)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment to DigitalOcean...${NC}"

# Step 1: Build the project locally
echo -e "${YELLOW}📦 Building project...${NC}"
npm run build 2>/dev/null || echo "No build script found, using static files"

# Step 2: Create deployment directory
echo -e "${YELLOW}📁 Creating deployment package...${NC}"
rm -rf deploy_temp
mkdir -p deploy_temp

# Copy all necessary files
cp -r *.html deploy_temp/ 2>/dev/null
cp -r *.css deploy_temp/ 2>/dev/null
cp -r *.js deploy_temp/ 2>/dev/null
cp -r src deploy_temp/ 2>/dev/null
cp -r dist deploy_temp/ 2>/dev/null
cp -r public deploy_temp/ 2>/dev/null
cp -r assets deploy_temp/ 2>/dev/null
cp package*.json deploy_temp/ 2>/dev/null

# Create archive
tar -czf deploy.tar.gz -C deploy_temp .
rm -rf deploy_temp

echo -e "${GREEN}✅ Deployment package created${NC}"

# Step 3: Upload to server
echo -e "${YELLOW}📤 Uploading to server...${NC}"
scp deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

# Step 4: Deploy on server
echo -e "${YELLOW}🔧 Deploying on server...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
    # Create project directory
    mkdir -p /var/www/adbid
    cd /var/www/adbid
    
    # Backup existing deployment
    if [ -d "current" ]; then
        rm -rf backup
        mv current backup
    fi
    
    # Extract new deployment
    mkdir current
    tar -xzf /tmp/deploy.tar.gz -C current/
    
    # Install dependencies if package.json exists
    if [ -f "current/package.json" ]; then
        cd current
        npm install --production
        cd ..
    fi
    
    # Set permissions
    chown -R www-data:www-data /var/www/adbid
    chmod -R 755 /var/www/adbid
    
    # Clean up
    rm /tmp/deploy.tar.gz
    
    echo "✅ Deployment completed on server"
ENDSSH

# Clean up local files
rm deploy.tar.gz

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${YELLOW}📌 Don't forget to:${NC}"
echo "  1. Configure nginx (see nginx.conf)"
echo "  2. Set up SSL with Let's Encrypt"
echo "  3. Configure firewall (ufw)"
echo "  4. Set up domain DNS records"