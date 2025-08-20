#!/bin/bash

# DigitalOcean Deployment Script for AdBid
# =========================================

set -e  # Exit on error

# Configuration
SERVER_IP="165.227.11.220"
SERVER_USER="root"
PROJECT_NAME="adbid"
DOMAIN="adbid.me"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment to DigitalOcean${NC}"
echo -e "${BLUE}📍 Server: ${SERVER_IP} (${DOMAIN})${NC}"
echo "==========================================="

# Step 1: Build the project
echo -e "${YELLOW}📦 Building project...${NC}"
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Using existing dist folder${NC}"
else
    npm run build || npx vite build
fi

# Step 2: Create deployment package
echo -e "${YELLOW}📁 Creating deployment package...${NC}"
rm -rf deploy_temp deploy.tar.gz
mkdir -p deploy_temp

# Copy built files and static assets
cp -r dist/* deploy_temp/ 2>/dev/null || true
cp -r *.html deploy_temp/ 2>/dev/null || true
cp -r *.css deploy_temp/ 2>/dev/null || true
cp -r *.js deploy_temp/ 2>/dev/null || true
cp -r Dashboard deploy_temp/ 2>/dev/null || true

# Create archive
tar -czf deploy.tar.gz -C deploy_temp .
rm -rf deploy_temp

echo -e "${GREEN}✅ Deployment package created${NC}"

# Step 3: Upload to server
echo -e "${YELLOW}📤 Uploading to server...${NC}"
scp deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

# Step 4: Upload nginx config
echo -e "${YELLOW}📤 Uploading nginx configuration...${NC}"
scp nginx.conf ${SERVER_USER}@${SERVER_IP}:/tmp/

# Step 5: Deploy on server
echo -e "${YELLOW}🔧 Deploying on server...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
    set -e
    
    # Install required packages if not exists
    if ! command -v nginx &> /dev/null; then
        echo "Installing nginx..."
        apt update
        apt install -y nginx certbot python3-certbot-nginx
    fi
    
    # Create project directory
    mkdir -p /var/www/adbid
    cd /var/www/adbid
    
    # Backup existing deployment
    if [ -d "current" ]; then
        echo "Backing up current deployment..."
        rm -rf backup
        mv current backup
    fi
    
    # Extract new deployment
    mkdir current
    tar -xzf /tmp/deploy.tar.gz -C current/
    
    # Set permissions
    chown -R www-data:www-data /var/www/adbid
    chmod -R 755 /var/www/adbid
    
    # Setup nginx
    echo "Configuring nginx..."
    cp /tmp/nginx.conf /etc/nginx/sites-available/adbid
    ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
    
    # Remove default nginx site if exists
    rm -f /etc/nginx/sites-enabled/default
    
    # Test nginx configuration
    nginx -t
    
    # Reload nginx
    systemctl reload nginx
    systemctl enable nginx
    
    # Clean up
    rm /tmp/deploy.tar.gz
    rm /tmp/nginx.conf
    
    echo "✅ Deployment completed on server"
    
    # Check if site is accessible
    if curl -f -s -o /dev/null "http://localhost"; then
        echo "✅ Site is accessible locally"
    else
        echo "⚠️  Site may not be accessible, check nginx logs"
    fi
ENDSSH

# Clean up local files
rm deploy.tar.gz

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📌 Next steps:${NC}"
echo -e "  1. Visit: ${GREEN}http://${DOMAIN}${NC} or ${GREEN}http://${SERVER_IP}${NC}"
echo -e "  2. Set up SSL: ${YELLOW}ssh root@${SERVER_IP} 'certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}'${NC}"
echo -e "  3. Check logs: ${YELLOW}ssh root@${SERVER_IP} 'tail -f /var/log/nginx/adbid_error.log'${NC}"
echo ""
echo -e "${GREEN}✨ Your site should be live at: http://${DOMAIN}${NC}"