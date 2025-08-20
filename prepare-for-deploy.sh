#!/bin/bash

# Prepare files for manual deployment
# ====================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📦 Preparing deployment package for adbid.me${NC}"
echo "============================================"

# Build if needed
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}Building project...${NC}"
    npx vite build
fi

# Create deployment directory
rm -rf adbid-deploy
mkdir -p adbid-deploy

# Copy all necessary files
echo -e "${YELLOW}Copying files...${NC}"
cp -r dist/* adbid-deploy/ 2>/dev/null || true
cp -r *.html adbid-deploy/ 2>/dev/null || true
cp -r Dashboard adbid-deploy/ 2>/dev/null || true
cp nginx.conf adbid-deploy/
cp setup-server.sh adbid-deploy/

# Create deployment archive
echo -e "${YELLOW}Creating archive...${NC}"
tar -czf adbid-deploy.tar.gz adbid-deploy/

echo -e "${GREEN}✅ Deployment package ready: adbid-deploy.tar.gz${NC}"
echo ""
echo -e "${BLUE}📋 Manual deployment instructions:${NC}"
echo ""
echo "1. Upload the archive to your server:"
echo -e "   ${YELLOW}scp adbid-deploy.tar.gz root@165.227.11.220:/tmp/${NC}"
echo ""
echo "2. SSH into your server:"
echo -e "   ${YELLOW}ssh root@165.227.11.220${NC}"
echo ""
echo "3. Run these commands on the server:"
cat << 'EOF'
   cd /tmp
   tar -xzf adbid-deploy.tar.gz
   cd adbid-deploy
   
   # Install nginx if needed
   apt update && apt install -y nginx certbot python3-certbot-nginx
   
   # Deploy files
   mkdir -p /var/www/adbid/current
   cp -r * /var/www/adbid/current/
   
   # Setup nginx
   cp nginx.conf /etc/nginx/sites-available/adbid
   ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
   rm -f /etc/nginx/sites-enabled/default
   
   # Set permissions
   chown -R www-data:www-data /var/www/adbid
   
   # Restart nginx
   nginx -t && systemctl reload nginx
   
   # Setup SSL (optional)
   certbot --nginx -d adbid.me -d www.adbid.me
EOF
echo ""
echo -e "${GREEN}Your site will be available at: http://adbid.me${NC}"