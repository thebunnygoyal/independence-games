#!/bin/bash

# BNI Games Backend - Azure Deployment Script
# This script automates the deployment of backend resources to Azure

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP="rg-bni-games-prod"
LOCATION="eastus"
APP_NAME="bni-games-tracker"
APP_PLAN="asp-bni-games"
DB_SERVER="psql-bni-games"
DB_NAME="bnigames"
DB_ADMIN="bniadmin"
DB_PASSWORD="BNI@Games2025!"

echo -e "${GREEN}BNI Games Backend - Azure Deployment${NC}"
echo "======================================"

# Check if logged in to Azure
echo -e "\n${YELLOW}Checking Azure login status...${NC}"
if ! az account show &> /dev/null; then
    echo -e "${RED}Not logged in to Azure. Please run 'az login' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Logged in to Azure${NC}"

# Create Resource Group
echo -e "\n${YELLOW}Creating Resource Group...${NC}"
az group create --name $RESOURCE_GROUP --location $LOCATION
echo -e "${GREEN}✓ Resource Group created${NC}"

# Create App Service Plan
echo -e "\n${YELLOW}Creating App Service Plan...${NC}"
az appservice plan create \
  --name $APP_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku B1 \
  --is-linux
echo -e "${GREEN}✓ App Service Plan created${NC}"

# Create Web App
echo -e "\n${YELLOW}Creating Web App...${NC}"
az webapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_PLAN \
  --runtime "NODE|18-lts"
echo -e "${GREEN}✓ Web App created${NC}"

# Create PostgreSQL Database
echo -e "\n${YELLOW}Creating PostgreSQL Database...${NC}"
az postgres flexible-server create \
  --name $DB_SERVER \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --admin-user $DB_ADMIN \
  --admin-password "$DB_PASSWORD" \
  --sku-name Standard_B1ms \
  --storage-size 32 \
  --version 14

# Create database
az postgres flexible-server db create \
  --server-name $DB_SERVER \
  --resource-group $RESOURCE_GROUP \
  --database-name $DB_NAME

echo -e "${GREEN}✓ PostgreSQL Database created${NC}"

# Configure firewall rule for Azure services
echo -e "\n${YELLOW}Configuring database firewall...${NC}"
az postgres flexible-server firewall-rule create \
  --name AllowAzureServices \
  --resource-group $RESOURCE_GROUP \
  --server-name $DB_SERVER \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

echo -e "${GREEN}✓ Firewall configured${NC}"

# Get connection string
DB_HOST=$(az postgres flexible-server show \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER \
  --query "fullyQualifiedDomainName" -o tsv)

DATABASE_URL="postgresql://${DB_ADMIN}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=require"

# Set App Settings
echo -e "\n${YELLOW}Configuring App Settings...${NC}"
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    DATABASE_URL="$DATABASE_URL" \
    JWT_SECRET="bni-games-secret-2025-$(openssl rand -hex 32)" \
    NODE_ENV="production" \
    PORT="8080"

echo -e "${GREEN}✓ App Settings configured${NC}"

# Enable logging
echo -e "\n${YELLOW}Enabling application logging...${NC}"
az webapp log config \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --application-logging filesystem \
  --level information

echo -e "${GREEN}✓ Logging enabled${NC}"

# Output important information
echo -e "\n${GREEN}========== Deployment Complete ==========${NC}"
echo -e "\nResource Group: ${YELLOW}$RESOURCE_GROUP${NC}"
echo -e "Web App URL: ${YELLOW}https://${APP_NAME}.azurewebsites.net${NC}"
echo -e "Database Host: ${YELLOW}$DB_HOST${NC}"
echo -e "\n${YELLOW}Important: Save these credentials securely!${NC}"
echo -e "Database Admin: ${RED}$DB_ADMIN${NC}"
echo -e "Database Password: ${RED}$DB_PASSWORD${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Update your .env file with the DATABASE_URL"
echo "2. Deploy your code using GitHub Actions or Azure CLI"
echo "3. Run database migrations"
echo "4. Configure Google Sheets API credentials in App Settings"
echo -e "\n${GREEN}Happy coding! 🚀${NC}"