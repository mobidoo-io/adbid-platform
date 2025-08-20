#!/bin/bash

# DigitalOcean Server Setup Script
# =================================
# Run this script on your DigitalOcean server after initial setup

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up DigitalOcean server for AdBid...${NC}"

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt-get update
apt-get upgrade -y

# Install required packages
echo -e "${YELLOW}📦 Installing required packages...${NC}"
apt-get install -y nginx nodejs npm git ufw certbot python3-certbot-nginx

# Setup firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Create web directory
echo -e "${YELLOW}📁 Creating web directory...${NC}"
mkdir -p /var/www/adbid
chown -R www-data:www-data /var/www/adbid

# Setup nginx
echo -e "${YELLOW}🌐 Setting up Nginx...${NC}"
# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Copy nginx config (you'll need to upload nginx.conf first)
# cp /tmp/nginx.conf /etc/nginx/sites-available/adbid
# ln -s /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx
systemctl enable nginx

# Node.js setup (if needed for backend)
echo -e "${YELLOW}📦 Setting up Node.js...${NC}"
npm install -g pm2

echo -e "${GREEN}✅ Server setup completed!${NC}"
echo -e "${YELLOW}📌 Next steps:${NC}"
echo "  1. Upload nginx.conf to /etc/nginx/sites-available/adbid"
echo "  2. Create symlink: ln -s /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/"
echo "  3. Update nginx.conf with your domain/IP"
echo "  4. Run: nginx -t && systemctl reload nginx"
echo "  5. Deploy your project using deploy.sh"
echo "  6. Set up SSL: certbot --nginx -d yourdomain.com"