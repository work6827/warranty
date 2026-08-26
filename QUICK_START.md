# Project H - Quick Start Guide

Get Project H running in 10 minutes.

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Supabase (3 min)

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Wait for provisioning to complete
3. Get your credentials from Project Settings → API:
   - Project URL
   - Anon/Public Key

## Step 3: Configure Environment (1 min)

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_COMPANY_WHATSAPP=628123456789
NEXT_PUBLIC_COMPANY_NAME=Halla Home
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 4: Initialize Database (2 min)

1. Open Supabase Dashboard → SQL Editor
2. Copy entire contents of `supabase-schema.sql`
3. Paste and click **Run**
4. Wait for success message

## Step 5: Create Storage Bucket (1 min)

1. Go to Storage in Supabase
2. Click **New bucket**
3. Name: `project-photos`
4. Public bucket: **Yes**
5. Click **Create bucket**

## Step 6: Create Admin User (1 min)

1. Go to Authentication in Supabase
2. Click **Add user**
3. Enter email: `admin@hallahome.id`
4. Enter password: (choose a strong password)
5. Click **Create user**

## Step 7: Start Development Server (1 min)

```bash
npm run dev
```

## Step 8: Login & Test (1 min)

1. Open http://localhost:3000
2. Login with your admin credentials
3. You'll see the dashboard

## Create Your First Project

### Add a Product First

1. Click **Products** in nav
2. Click **+ Add Product**
3. Select category: Window Film
4. Fill in:
   - Brand: 3M
   - Name: Crystalline 70
   - VLT: 70
   - UV Rejection: 99
   - Default warranty: 60 months
5. Click **Create Product**

### Create a Project

1. Click **+ New Project**
2. **Customer** tab:
   - Name: Budi Santoso
   - Phone: 628123456789
   - Click **Continue to Project**
3. **Project** tab:
   - Name: PIK Residence
   - Type: Residential
   - Installation date: (today)
   - Click **Continue to Areas**
4. **Areas** tab:
   - Click "Living Room" quick add
   - Click "Master Bedroom" quick add
   - Click **Continue to Products**
5. **Products** tab:
   - Select "Living Room" tab
   - Click **+ Add Product**
   - Select Window Film category
   - Select your 3M product
   - Quantity: 15
   - Unit: m²
   - Click **Add Product**
   - Click **Continue to Installation**
6. **Installation** tab:
   - (Optional) Upload photos
   - Click **Continue to Warranty**
7. **Warranty** tab:
   - Click **Enable Warranty** on the product
   - Verify dates
   - Click **Continue to Review**
8. **Review** tab:
   - Verify all information
   - Click **Save & Generate QR**

### View the Passport

1. After publishing, you'll see the success page
2. Click **Open Passport**
3. You'll see the customer view
4. Test the WhatsApp contact buttons

## Next Steps

- Add more products to your catalog
- Create more projects
- Test on mobile devices
- Customize company information in .env
- Deploy to production

## Common Issues

**"Function generate_project_id does not exist"**
→ Re-run the schema SQL in Supabase

**Can't upload photos**
→ Verify storage bucket exists and is public

**Passport shows "Not Found"**
→ Make sure you clicked "Save & Generate QR" (not just saved as draft)

**Can't login**
→ Verify you created the admin user in Supabase Auth

## Production Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Update WhatsApp number in `.env`
- [ ] Update base URL in `.env`
- [ ] Set up custom domain
- [ ] Configure Supabase production instance
- [ ] Test QR codes on real mobile devices
- [ ] Add real product data
- [ ] Train staff on the workflow

---

Need help? Check `README.md` for full documentation.
