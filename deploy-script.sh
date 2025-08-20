#!/bin/bash

# Deploy script for Adbid project
# Server IP: 165.227.11.220

set -e

echo "🚀 Starting deployment to DigitalOcean..."

# Variables
SERVER_IP="165.227.11.220"
SERVER_USER="root"
APP_NAME="adbid"
DOMAIN="adbid.app"  # Change this to your domain

echo "📦 Creating deployment archive..."
tar -czf deploy.tar.gz dist/ nginx.conf

echo "📤 Uploading to server..."
scp deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

echo "🔧 Connecting to server and setting up..."
ssh $SERVER_USER@$SERVER_IP << 'ENDSSH'
    set -e
    
    echo "Installing dependencies..."
    apt-get update
    apt-get install -y nginx certbot python3-certbot-nginx
    
    echo "Creating app directory..."
    mkdir -p /var/www/adbid
    
    echo "Extracting files..."
    cd /var/www/adbid
    tar -xzf /tmp/deploy.tar.gz
    
    echo "Setting up Nginx..."
    cp nginx.conf /etc/nginx/sites-available/adbid
    ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    echo "Testing Nginx configuration..."
    nginx -t
    
    echo "Restarting Nginx..."
    systemctl restart nginx
    
    echo "Cleaning up..."
    rm /tmp/deploy.tar.gz
    
    echo "✅ Deployment complete!"
ENDSSH

echo "🎉 Deployment finished successfully!"
echo "📍 Your app is available at: http://$SERVER_IP"
echo ""
echo "To set up SSL certificate, run:"
echo "ssh $SERVER_USER@$SERVER_IP 'certbot --nginx -d $DOMAIN'"