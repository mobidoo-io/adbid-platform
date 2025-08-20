#!/bin/bash
# Setup script to run ON THE SERVER
# This script sets up Adbid on the DigitalOcean droplet

set -e

echo "🚀 Setting up Adbid on server..."

# Update system
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Nginx
echo "🔧 Installing Nginx..."
apt-get install -y nginx

# Create directory for the app
echo "📁 Creating app directory..."
mkdir -p /var/www/adbid

# Create a simple deployment instruction
cat > /var/www/deployment-instructions.txt << 'EOF'
===========================================
ADBID DEPLOYMENT INSTRUCTIONS
===========================================

Your server is ready to receive the application files.

From your LOCAL machine, run these commands:

1. First, copy the deployment archive:
   scp deploy.tar.gz root@165.227.11.220:/tmp/

2. Then SSH into the server:
   ssh root@165.227.11.220

3. Extract and setup the files:
   cd /var/www/adbid
   tar -xzf /tmp/deploy.tar.gz
   cp nginx.conf /etc/nginx/sites-available/adbid
   ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
   rm -f /etc/nginx/sites-enabled/default
   systemctl restart nginx

Your app will be available at: http://165.227.11.220

===========================================
EOF

echo "✅ Server preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. From your local machine, copy the files:"
echo "   scp deploy.tar.gz root@165.227.11.220:/tmp/"
echo ""
echo "2. SSH into server and extract:"
echo "   ssh root@165.227.11.220"
echo "   cd /var/www/adbid && tar -xzf /tmp/deploy.tar.gz"
echo ""
echo "3. Setup Nginx and restart:"
echo "   cp nginx.conf /etc/nginx/sites-available/adbid"
echo "   ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/"
echo "   systemctl restart nginx"