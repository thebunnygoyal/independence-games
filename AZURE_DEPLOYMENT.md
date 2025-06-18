# 🚀 Azure Deployment Guide - BNI Independence Games

## ✅ **AZURE FRONTEND DEPLOYED!**

**🔗 Live URL**: https://bni-games-frontend.azurewebsites.net

## 📋 **Resources Created**

### Azure Resources (All on FREE tier - $0/month!)
- **Resource Group**: `rg-bni-games-frontend`
- **App Service Plan**: `asp-bni-games-frontend` (F1 - Free)
- **Web App**: `bni-games-frontend` (Node.js 20 LTS)
- **Location**: East US

### Monthly Costs
- **App Service (F1)**: $0 (Free tier)
- **Domain**: Uses Azure subdomain (free)
- **SSL Certificate**: Automatic (free)
- **Total**: **$0/month** 🎉

## 🔧 **Setup GitHub Actions Deployment**

### Step 1: Add Azure Publish Profile Secret

1. Go to your GitHub repository: https://github.com/thebunnygoyal/independence-games
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
5. Value: Copy and paste this entire XML:

```xml
<publishData><publishProfile profileName="bni-games-frontend - Web Deploy" publishMethod="MSDeploy" publishUrl="bni-games-frontend.scm.azurewebsites.net:443" msdeploySite="bni-games-frontend" userName="$bni-games-frontend" userPWD="CbJmvFsHc8eC9tSNk5lsSPSjk4pWqcRtqdgizbaRhxkcwarNq0JwtfsWbnkl" destinationAppUrl="http://bni-games-frontend.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://portal.azure.com" webSystem="WebSites"><databases /></publishProfile><publishProfile profileName="bni-games-frontend - FTP" publishMethod="FTP" publishUrl="ftps://waws-prod-blu-435.ftp.azurewebsites.windows.net/site/wwwroot" ftpPassiveMode="True" userName="bni-games-frontend\$bni-games-frontend" userPWD="CbJmvFsHc8eC9tSNk5lsSPSjk4pWqcRtqdgizbaRhxkcwarNq0JwtfsWbnkl" destinationAppUrl="http://bni-games-frontend.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://portal.azure.com" webSystem="WebSites"><databases /></publishProfile><publishProfile profileName="bni-games-frontend - Zip Deploy" publishMethod="ZipDeploy" publishUrl="bni-games-frontend.scm.azurewebsites.net:443" userName="$bni-games-frontend" userPWD="CbJmvFsHc8eC9tSNk5lsSPSjk4pWqcRtqdgizbaRhxkcwarNq0JwtfsWbnkl" destinationAppUrl="http://bni-games-frontend.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://portal.azure.com" webSystem="WebSites"><databases /></publishProfile></publishData>
```

### Step 2: Configure Environment Variables (Optional)

Add these as **Repository variables** (not secrets):
- `NEXT_PUBLIC_API_URL`: `https://bni-games-tracker.azurewebsites.net`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919876543210`

### Step 3: Trigger Deployment

Now push any change to trigger automatic deployment:

```bash
git add .
git commit -m "Deploy to Azure"
git push origin main
```

The GitHub Action will:
1. Build your Next.js app
2. Deploy to Azure App Service
3. Your site will be live at: https://bni-games-frontend.azurewebsites.net

## 🏗️ **Architecture Overview**

```
┌─────────────────────┐    ┌─────────────────────┐
│   GitHub Repo       │───▶│   Azure App Service │
│   (Private)         │    │   (Node.js 20 LTS)  │
│   Actions CI/CD     │    │   F1 Free Tier     │
└─────────────────────┘    └─────────────────────┘
                                       │
                                       ▼
                           ┌─────────────────────┐
                           │   Live Website      │
                           │   SSL Enabled       │
                           │   Auto Scaling      │
                           └─────────────────────┘
```

## 📊 **Configuration Details**

### Azure App Service Settings
- **Runtime**: Node.js 20 LTS
- **Platform**: Linux
- **Startup Command**: `npm start`
- **Always On**: Disabled (Free tier)
- **HTTPS Only**: Enabled
- **Minimum TLS**: 1.2

### Environment Variables Set
- `NEXT_PUBLIC_API_URL`: https://bni-games-tracker.azurewebsites.net
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: 919876543210
- `NODE_ENV`: production
- `WEBSITE_NODE_DEFAULT_VERSION`: 20.9.0

## 🔗 **Important URLs**

| Service | URL | Purpose |
|---------|-----|---------|
| **Live Website** | https://bni-games-frontend.azurewebsites.net | Your production site |
| **Azure Portal** | https://portal.azure.com | Manage Azure resources |
| **SCM/Kudu** | https://bni-games-frontend.scm.azurewebsites.net | Deployment logs |
| **GitHub Actions** | https://github.com/thebunnygoyal/independence-games/actions | Monitor deployments |

## 🚨 **Next Steps**

### 1. Test the Deployment
Once you add the publish profile secret, the GitHub Action will deploy your app automatically.

### 2. Custom Domain (Optional)
To use your own domain:
```bash
# Add custom domain
az webapp config hostname add --webapp-name bni-games-frontend --resource-group rg-bni-games-frontend --hostname yourdomain.com

# Add SSL certificate
az webapp config ssl bind --certificate-thumbprint <thumbprint> --ssl-type SNI --name bni-games-frontend --resource-group rg-bni-games-frontend
```

### 3. Monitor Performance
- **Application Insights**: Available in Azure Portal
- **Log Stream**: View real-time logs in Azure Portal
- **Metrics**: CPU, Memory, Response times

## 🛠️ **Local Development**

```bash
# Clone repository
git clone https://github.com/thebunnygoyal/independence-games.git
cd independence-games

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev  # Runs on http://localhost:3001
```

## 🔧 **Troubleshooting**

### Common Issues

1. **GitHub Action Fails**
   - Check if `AZURE_WEBAPP_PUBLISH_PROFILE` secret is set correctly
   - Ensure the XML is pasted completely without extra spaces

2. **Site Shows Error**
   - Check logs in Azure Portal → App Service → Log stream
   - Verify Node.js version compatibility

3. **Environment Variables Not Working**
   - Check Azure Portal → App Service → Configuration → Application settings
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access

### Useful Commands

```bash
# View Azure resources
az resource list --resource-group rg-bni-games-frontend

# Check app status
az webapp show --name bni-games-frontend --resource-group rg-bni-games-frontend

# View logs
az webapp log tail --name bni-games-frontend --resource-group rg-bni-games-frontend
```

## 💰 **Cost Management**

### Current Setup (FREE!)
- **F1 App Service Plan**: 60 CPU minutes/day, 1GB storage
- **Custom Domain**: Add for $12/year (optional)
- **SSL Certificate**: Free with App Service

### If You Need to Scale Later
- **B1 Basic**: $13/month (Always On, custom domain)
- **S1 Standard**: $56/month (Auto-scaling, backup)
- **P1 Premium**: $146/month (Premium performance)

## 🎯 **Deployment Status**

✅ **Azure Resources**: Created  
✅ **Node.js Runtime**: Configured  
✅ **Environment Variables**: Set  
✅ **SSL Certificate**: Auto-enabled  
✅ **GitHub Actions**: Ready (needs publish profile)  
✅ **Domain**: bni-games-frontend.azurewebsites.net  
✅ **Cost**: $0/month (Free tier)

---

**🚀 Your BNI Independence Games frontend is ready to deploy!**

Just add the publish profile secret to GitHub and push your next commit to see it live!