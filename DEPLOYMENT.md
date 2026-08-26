# Project H - Deployment Guide

## Pre-Deployment Checklist

### 1. Supabase Production Setup

- [ ] Create production Supabase project
- [ ] Run `supabase-schema.sql` on production database
- [ ] Create `project-photos` storage bucket
- [ ] Configure storage policies
- [ ] Create admin users in Authentication
- [ ] Note production credentials (URL + Anon Key)

### 2. Environment Configuration

Create production `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_COMPANY_WHATSAPP=628123456789
NEXT_PUBLIC_COMPANY_NAME=Halla Home
NEXT_PUBLIC_BASE_URL=https://projecth.hallahome.id
```

### 3. Domain Setup

- [ ] Purchase domain (e.g., projecth.hallahome.id)
- [ ] Configure DNS records
- [ ] Set up SSL certificate

### 4. Vercel Deployment

#### Option A: GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
6. Add environment variables (from step 2 above)
7. Click **Deploy**

#### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow prompts and add environment variables when asked.

### 5. Post-Deployment Verification

- [ ] Test admin login
- [ ] Create a test customer
- [ ] Create a test project
- [ ] Upload test photos
- [ ] Publish project
- [ ] Scan QR code on mobile device
- [ ] Verify passport displays correctly
- [ ] Test WhatsApp integration
- [ ] Check warranty calculations
- [ ] Test on multiple mobile devices (iOS + Android)
- [ ] Test on desktop browsers

### 6. Data Migration (if applicable)

If migrating from existing system:

- [ ] Export existing customer data
- [ ] Export product catalog
- [ ] Transform data to match schema
- [ ] Import using SQL or Supabase API
- [ ] Verify data integrity

### 7. Staff Training

Before going live:

- [ ] Train admin staff on project creation workflow
- [ ] Provide quick reference guide
- [ ] Do practice runs
- [ ] Set up support process for issues

### 8. Production Data Setup

- [ ] Add all real products to catalog
- [ ] Organize by categories
- [ ] Set accurate warranty durations
- [ ] Add maintenance instructions
- [ ] Add installer records
- [ ] Import customer database (if existing)

### 9. Security Hardening

- [ ] Change all default passwords
- [ ] Review Supabase RLS policies
- [ ] Enable Supabase Auth email verification (optional)
- [ ] Set up rate limiting (Vercel/Supabase)
- [ ] Configure CORS if needed
- [ ] Review exposed environment variables

### 10. Monitoring Setup

- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (Sentry recommended)
- [ ] Set up uptime monitoring
- [ ] Configure database backups in Supabase
- [ ] Set up storage usage alerts

## Deployment Commands

### Build Locally

```bash
npm run build
npm start
```

Test the production build locally before deploying.

### Deploy to Vercel

```bash
vercel --prod
```

### Environment Variables in Vercel

Add these in Project Settings → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_COMPANY_WHATSAPP`
- `NEXT_PUBLIC_COMPANY_NAME`
- `NEXT_PUBLIC_BASE_URL`

Mark all as **Production**, **Preview**, and **Development** environments.

## Custom Domain Setup

### In Vercel:

1. Go to Project Settings → Domains
2. Add your domain: `projecth.hallahome.id`
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

### DNS Records (Example):

```
Type: CNAME
Name: projecth
Value: cname.vercel-dns.com
```

## Post-Launch Monitoring

### Week 1 Checklist

- [ ] Monitor error rates
- [ ] Check database performance
- [ ] Review storage usage
- [ ] Gather user feedback
- [ ] Fix any critical bugs
- [ ] Monitor QR scan rates

### Monthly Checklist

- [ ] Review Supabase usage and costs
- [ ] Check storage capacity
- [ ] Update dependencies
- [ ] Review security logs
- [ ] Backup critical data

## Rollback Plan

If issues occur:

1. **Vercel**: Use deployment history to rollback
2. **Database**: Restore from Supabase backup
3. **Storage**: Files remain intact during rollback

## Performance Optimization

### After Launch:

- [ ] Enable Next.js Image Optimization
- [ ] Set up CDN for photos (Supabase Storage has CDN)
- [ ] Monitor Core Web Vitals
- [ ] Optimize large images before upload
- [ ] Enable Vercel Analytics

## Scaling Considerations

### When you grow:

- **Database**: Supabase scales automatically, upgrade plan as needed
- **Storage**: Monitor usage, upgrade storage plan
- **Bandwidth**: Vercel scales automatically
- **Team**: Add more admin users in Supabase Auth

## Cost Estimates (Monthly)

### Small Scale (100 projects/month):
- Supabase: Free tier (~$0)
- Vercel: Free tier (~$0)
- Domain: ~$10-15/year

### Medium Scale (1000 projects/month):
- Supabase Pro: ~$25/month
- Vercel Pro: ~$20/month
- Domain: ~$10-15/year

### Large Scale (5000+ projects/month):
- Supabase: ~$100-500/month
- Vercel: ~$100+/month
- Consider dedicated infrastructure

## Support & Maintenance

### Daily:
- Monitor error logs
- Check deployment status

### Weekly:
- Review new projects created
- Check storage usage
- Respond to customer support issues

### Monthly:
- Update dependencies
- Review security
- Analyze usage patterns
- Plan feature updates

## Troubleshooting Production Issues

### "Projects not loading"
- Check Supabase connection
- Verify environment variables
- Check RLS policies

### "Photos not displaying"
- Verify storage bucket is public
- Check CORS settings
- Verify file URLs are correct

### "QR codes not working"
- Verify BASE_URL is correct
- Check project status is 'published'
- Verify public_token generated

### "Slow performance"
- Check database indexes
- Optimize images
- Review query performance in Supabase
- Consider caching strategy

## Emergency Contacts

Maintain a list of:
- Supabase support
- Vercel support
- Domain registrar support
- Internal development team
- Key stakeholders

---

## Launch Day Checklist

Final checklist for go-live:

- [ ] All environment variables set
- [ ] Domain pointing to Vercel
- [ ] SSL certificate active
- [ ] Test project created and verified
- [ ] QR code tested on mobile
- [ ] Staff trained
- [ ] Backup created
- [ ] Monitoring active
- [ ] Support process ready
- [ ] Announcement prepared

🚀 **Ready to launch Project H!**
