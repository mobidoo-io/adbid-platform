#!/bin/bash

# Quick Deployment Script for adbid.me
# =====================================

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 AdBid Quick Deployment to adbid.me${NC}"
echo "==========================================="

# Check if Docker Hub username is set
if grep -q "YOUR_DOCKERHUB_USERNAME" config/deploy.yml; then
    echo -e "${RED}❌ Error: Please update YOUR_DOCKERHUB_USERNAME in config/deploy.yml${NC}"
    echo -e "${YELLOW}📝 Edit config/deploy.yml and .env files first${NC}"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo -e "${YELLOW}📝 Copy .env.example to .env and fill in your values${NC}"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check if Kamal is installed
if ! command -v kamal &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Kamal...${NC}"
    gem install kamal
fi

# Check Docker login
echo -e "${YELLOW}🐳 Checking Docker Hub login...${NC}"
docker login || {
    echo -e "${RED}❌ Please login to Docker Hub first${NC}"
    echo "Run: docker login"
    exit 1
}

# Options menu
echo -e "\n${BLUE}Choose deployment option:${NC}"
echo "1) First-time setup (full server setup)"
echo "2) Deploy updates (quick deploy)"
echo "3) View logs"
echo "4) Rollback to previous version"
echo "5) Check deployment status"
echo -n "Enter choice [1-5]: "
read choice

case $choice in
    1)
        echo -e "\n${GREEN}🔧 Running first-time setup...${NC}"
        echo -e "${YELLOW}This will configure your server at 165.227.11.220${NC}"
        
        # Test SSH connection
        echo -e "${YELLOW}Testing SSH connection...${NC}"
        ssh -o ConnectTimeout=5 root@165.227.11.220 "echo '✅ SSH connection successful'" || {
            echo -e "${RED}❌ Cannot connect to server${NC}"
            echo "Make sure you can SSH to: ssh root@165.227.11.220"
            exit 1
        }
        
        # Run Kamal setup
        echo -e "${GREEN}🚀 Running Kamal setup...${NC}"
        kamal setup
        
        echo -e "${GREEN}✅ Setup complete!${NC}"
        echo -e "${BLUE}Your site will be available at:${NC}"
        echo "  • https://adbid.me"
        echo "  • https://www.adbid.me"
        ;;
        
    2)
        echo -e "\n${GREEN}🚀 Deploying updates...${NC}"
        
        # Build and deploy
        echo -e "${YELLOW}Building and pushing Docker image...${NC}"
        kamal deploy
        
        echo -e "${GREEN}✅ Deployment complete!${NC}"
        echo -e "${BLUE}Check your site at: https://adbid.me${NC}"
        ;;
        
    3)
        echo -e "\n${BLUE}📋 Viewing logs...${NC}"
        kamal app logs -f
        ;;
        
    4)
        echo -e "\n${YELLOW}⏪ Rolling back to previous version...${NC}"
        kamal rollback
        echo -e "${GREEN}✅ Rollback complete!${NC}"
        ;;
        
    5)
        echo -e "\n${BLUE}📊 Checking deployment status...${NC}"
        kamal app details
        echo -e "\n${YELLOW}🌐 Testing site availability...${NC}"
        curl -I https://adbid.me 2>/dev/null | head -n 1
        ;;
        
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo -e "\n${GREEN}Done!${NC}"