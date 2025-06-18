# BNI Independence Games 2.0 - Complete Setup Instructions

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- Git installed
- Azure account (for backend deployment)
- Google Cloud account (for Sheets API)
- GitHub account

### 1. Clone and Setup Frontend

```bash
# Clone the repository
git clone https://github.com/thebunnygoyal/independence-games.git
cd independence-games

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
# NEXT_PUBLIC_API_URL=http://localhost:3000  # For development
# NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210   # Your WhatsApp number
```

### 2. Run Frontend Locally

```bash
# Start development server
npm run dev

# Open http://localhost:3001 in your browser
```

### 3. Deploy Backend (Separate Repository)

```bash
# Create new repository for backend
mkdir bni-games-backend
cd bni-games-backend

# Copy backend folder contents from main repo
cp -r ../independence-games/backend/* .

# Initialize git
git init
git add .
git commit -m "Initial backend setup"

# Create GitHub repository and push
gh repo create bni-games-backend --private
git remote add origin https://github.com/[YOUR_USERNAME]/bni-games-backend.git
git push -u origin main
```

### 4. Setup Azure Resources

```bash
# Login to Azure
az login

# Run the deployment script
cd backend
chmod +x deploy-azure.sh
./deploy-azure.sh
```

### 5. Configure Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "BNI-Games-Tracker"
3. Enable Google Sheets API
4. Create Service Account:
   - Go to "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Download JSON key file
5. Add service account email to your Google Sheet with edit permissions

### 6. Update Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://bni-games-tracker.azurewebsites.net
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

#### Backend (.env)
```env
DATABASE_URL=postgresql://[from Azure]
JWT_SECRET=your-super-secret-key
GOOGLE_SERVICE_ACCOUNT_EMAIL=[from JSON key]
GOOGLE_PRIVATE_KEY=[from JSON key]
GOOGLE_SHEET_ID=[your sheet ID]
FRONTEND_URL=https://thebunnygoyal.github.io/independence-games
```

### 7. Deploy Frontend to GitHub Pages

```bash
# Build for production
npm run build
npm run export

# The GitHub Action will automatically deploy when you push to main
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 📋 Verification Checklist

- [ ] Frontend runs locally at http://localhost:3001
- [ ] Backend API responds at /api/health
- [ ] Database migrations completed successfully
- [ ] Google Sheets sync works
- [ ] Team page shows with WhatsApp button
- [ ] Leaderboard displays mock data (or real data if connected)
- [ ] Excel template downloads correctly

## 🔧 Troubleshooting

### Frontend Issues
- **Module not found**: Run `npm install` again
- **API connection failed**: Check NEXT_PUBLIC_API_URL in .env.local
- **Build errors**: Ensure you're using Node.js 18+

### Backend Issues
- **Database connection failed**: Verify DATABASE_URL format
- **Google Sheets error**: Check service account permissions
- **Azure deployment failed**: Ensure you have correct Azure credentials

### Common Commands

```bash
# Frontend
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Check code quality

# Backend
npm run dev          # Development server with nodemon
npm run migrate      # Run database migrations
npm start            # Production server

# Database
psql $DATABASE_URL   # Connect to PostgreSQL
```

## 📞 Support

- **Technical Issues**: Contact Rishav Goyal via WhatsApp button on Team page
- **Game Rules**: benchmarkgames.bnikol@gmail.com
- **Documentation**: Check /docs folder for detailed guides

## 🎯 Next Steps

1. **Add Real Data**: 
   - Create chapters in database
   - Add members to each chapter
   - Start tracking weekly metrics

2. **Configure Monitoring**:
   - Set up Azure Application Insights
   - Configure error alerts
   - Monitor API performance

3. **Customize Branding**:
   - Update logo in public folder
   - Modify color scheme in tailwind.config.ts
   - Add custom fonts if needed

4. **Security Hardening**:
   - Enable Azure AD B2C for authentication
   - Set up API rate limiting
   - Configure CORS properly

---

**Built with ❤️ by Rishav Goyal for BNI Independence Games 2.0**