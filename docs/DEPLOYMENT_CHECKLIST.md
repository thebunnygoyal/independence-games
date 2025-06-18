# BNI Independence Games 2.0 - Deployment Checklist

## Pre-Deployment

### Code Preparation
- [ ] Remove all V0 branding and references
- [ ] Update package.json with correct project details
- [ ] Ensure all environment variables are documented
- [ ] Remove any hardcoded values
- [ ] Update WhatsApp number placeholder

### Testing
- [ ] Run all unit tests
- [ ] Test all API endpoints
- [ ] Verify Excel template download
- [ ] Test Google Sheets sync
- [ ] Verify scoring calculations
- [ ] Test on mobile devices

### Documentation
- [ ] README.md is complete
- [ ] API documentation is current
- [ ] Environment variables documented
- [ ] Setup instructions tested

## Backend Deployment (Azure)

### Azure Resources
- [ ] Resource Group created
- [ ] App Service Plan created
- [ ] Web App created
- [ ] PostgreSQL database provisioned
- [ ] Connection strings configured

### Database
- [ ] Run initial migration
- [ ] Seed chapters data
- [ ] Verify indexes created
- [ ] Test database connection

### Environment Variables
- [ ] DATABASE_URL set
- [ ] JWT_SECRET configured
- [ ] Google Sheets credentials added
- [ ] FRONTEND_URL configured
- [ ] NODE_ENV set to production

### Security
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] API authentication implemented

## Frontend Deployment (GitHub Pages)

### Build Configuration
- [ ] next.config.mjs updated for static export
- [ ] Base path configured for GitHub Pages
- [ ] Asset prefix set correctly
- [ ] Images configured as unoptimized

### GitHub Setup
- [ ] Repository is public (or GitHub Pro for private)
- [ ] GitHub Pages enabled
- [ ] Custom domain configured (optional)
- [ ] GitHub Actions workflow configured

### Environment Variables
- [ ] NEXT_PUBLIC_API_URL points to production
- [ ] NEXT_PUBLIC_WHATSAPP_NUMBER configured
- [ ] GitHub Secrets added for deployment

## Google Sheets Integration

### Google Cloud Setup
- [ ] Project created in Google Cloud Console
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] JSON key downloaded and secured

### Sheet Configuration
- [ ] Template sheet created
- [ ] Service account has edit access
- [ ] Protected ranges configured
- [ ] Formulas tested

## Post-Deployment

### Verification
- [ ] Frontend loads at production URL
- [ ] API health check passes
- [ ] Database queries work
- [ ] Google Sheets sync functional
- [ ] Leaderboard updates correctly
- [ ] Audit logs recording

### Monitoring
- [ ] Azure Application Insights configured
- [ ] Error alerts set up
- [ ] Performance monitoring enabled
- [ ] Backup strategy implemented

### User Acceptance
- [ ] Team page displays correctly
- [ ] WhatsApp button works
- [ ] Data entry forms functional
- [ ] Excel template downloads
- [ ] Scoring calculations accurate

## Go-Live

### Communication
- [ ] Notify all chapter captains
- [ ] Share access credentials
- [ ] Distribute user guides
- [ ] Schedule training session

### Support
- [ ] Support email monitored
- [ ] WhatsApp support active
- [ ] FAQ document prepared
- [ ] Troubleshooting guide ready

## Rollback Plan

### If Issues Occur
1. [ ] Revert to previous deployment
2. [ ] Restore database backup
3. [ ] Notify users of downtime
4. [ ] Fix issues in staging
5. [ ] Re-deploy after testing

## Sign-off

- [ ] Technical Lead: _________________
- [ ] Project Manager: _________________
- [ ] Client Representative: _________________
- [ ] Date: _________________

---

**Remember:** Always test in staging before production deployment!