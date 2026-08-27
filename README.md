# Halla+ Digital Passport System

A production-quality MVP web application for managing interior finishing projects, generating digital project passports, and providing warranty tracking via QR codes.

## 🎯 Product Vision

Halla+ is a **digital project identity, product record, installation documentation, warranty, and after-sales platform**.

Every completed Halla+ project receives a unique **Halla+ Digital Passport** that provides:
- Complete product records with specifications
- Installation documentation with photos
- Warranty tracking and expiration monitoring
- Maintenance instructions
- Direct contact with Halla+ support

## ✨ Key Features

### Admin Interface
- **Customer Management**: Create and search customers
- **Product Catalog**: Multi-category product database with flexible specifications
- **Multi-Step Project Creation**:
  1. Customer selection/creation
  2. Project details
  3. Area/room definition
  4. Product installation records
  5. Photo documentation
  6. Product-level warranty configuration
  7. Comprehensive review before publishing
- **QR Code Generation**: Automatic secure token and QR code creation
- **Dashboard**: Project overview with statistics

### Customer Passport (Public)
- **Mobile-First Design**: Optimized for phone viewing
- **Professional Presentation**: Clean, premium interface
- **Product Details**: Organized by area with full specifications
- **Warranty Overview**: Active/expired status with expiration dates
- **Maintenance Guides**: Product care instructions
- **Photo Gallery**: Before/during/after installation photos
- **Direct Support**: WhatsApp integration for service requests

### Technical Highlights
- **Flexible Product System**: Different categories have different specifications
- **Product-Level Warranties**: Individual warranty tracking per installed product
- **Photo Management**: Upload with customer visibility control
- **Secure Access**: Public tokens for customer passports, admin authentication
- **QR Code Access**: Instant passport access via scanning

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Base UI preset)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for photos)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **QR Codes**: qrcode library

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- A Supabase account and project

### Setup Steps

1. **Clone and Install**
```bash
npm install
```

2. **Configure Environment Variables**
Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_COMPANY_WHATSAPP=628123456789
NEXT_PUBLIC_COMPANY_NAME=Halla+
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. **Set Up Database**
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Copy and paste the entire contents of `supabase-schema.sql`
- Run the SQL script to create all tables, relationships, and policies

4. **Create Storage Bucket**
- Go to Storage in Supabase dashboard
- Create a new bucket called `project-photos`
- Set it to **public** (or configure policies as needed)

5. **Create Admin User**
- Go to Authentication in Supabase dashboard
- Add a new user with email and password
- This will be your admin login

6. **Run Development Server**
```bash
npm run dev
```

7. **Access the Application**
- Admin: http://localhost:3000/login
- Sign in with the credentials you created

## 📖 Usage Guide

### Creating Your First Project

1. **Login** at `/login`
2. Click **+ New Project** on the dashboard
3. Follow the 7-step workflow:
   - **Customer**: Create new or select existing customer
   - **Project**: Enter project name, type, and installation date
   - **Areas**: Add rooms/areas (Living Room, Bedroom, etc.)
   - **Products**: Select products from catalog for each area
   - **Installation**: Upload photos and assign installers
   - **Warranty**: Configure warranty per product
   - **Review**: Verify everything and publish

4. After publishing, you'll get:
   - QR code for the passport
   - Shareable URL
   - WhatsApp share option

### Managing Products

Before creating projects, add products to your catalog:

1. Go to **Products** in the admin nav
2. Click **+ Add Product**
3. Select a category (Window Film, Flooring, etc.)
4. Fill in:
   - Brand and product name
   - Category-specific specifications
   - Default warranty duration
   - Maintenance instructions
5. Products are now available when creating projects

### Customer Experience

When a customer scans the QR code:
1. Passport opens instantly in their browser (no app required)
2. They see:
   - Verified Halla installation badge
   - Complete product list organized by area
   - Product specifications
   - Warranty status and expiration dates
   - Maintenance instructions
   - Installation photos (only customer-visible ones)
   - Contact buttons for support

## 🗂️ Project Structure

```
├── app/
│   ├── admin/              # Admin interface
│   │   ├── products/       # Product management
│   │   ├── projects/       # Project management
│   │   └── ...
│   ├── login/              # Admin login
│   └── p/[token]/          # Public passport pages
├── components/
│   ├── admin/              # Admin components
│   ├── passport/           # Customer passport components
│   ├── product-form/       # Product management
│   └── project-form/       # Project creation workflow
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── store/              # Zustand stores
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
└── supabase-schema.sql     # Complete database schema
```

## 🎨 Design Philosophy

Halla+ follows these principles:

- **Clarity**: The next action should always be obvious
- **Restraint**: Avoid unnecessary visual decoration
- **Hierarchy**: Important information stands out
- **Generous Spacing**: Not dense enterprise software
- **Mobile First**: Customer passport exceptional on phones
- **Speed**: Interfaces feel responsive
- **Feedback**: Clear confirmation for every action

## 🔐 Security

- Admin routes protected by middleware
- Row Level Security (RLS) enabled on all tables
- Public passport access via secure random tokens
- Photos marked as internal-only never appear on public passports
- Customer personal data (address, full details) not exposed publicly

## 📱 Mobile Responsiveness

- Customer passport fully optimized for mobile viewing
- Admin interface usable on tablets and phones
- Touch-friendly interface elements
- Responsive grid layouts

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
NEXT_PUBLIC_COMPANY_WHATSAPP=628123456789
NEXT_PUBLIC_COMPANY_NAME=Halla+
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 📝 Product Categories

Pre-configured categories with specifications:

1. **Window Film**: VLT, UV Rejection, IR Rejection, TSER, Shade, Technology
2. **Flooring**: Material, Thickness, Wear Layer, Dimensions, Surface Finish
3. **Wall Panel**: Material, Thickness, Dimensions, Finish, Pattern
4. **Wallboard**: Material, Thickness, Dimensions, Finish
5. **Premium Wallpaper**: Collection, Material, Roll Dimensions, Pattern, Origin
6. **Other**: Flexible for future categories

## 🔄 Workflow Overview

```
Admin Creates Project
    ↓
Select/Create Customer
    ↓
Define Project Details
    ↓
Add Areas/Rooms
    ↓
Add Products to Areas
    ↓
Upload Photos & Installation Info
    ↓
Configure Product Warranties
    ↓
Review Everything
    ↓
Publish & Generate QR
    ↓
Customer Scans QR
    ↓
Instant Passport Access
```

## 🎯 Future Enhancements (Not in MVP)

- Project editing after publishing
- Service record management
- Customer accounts
- Email notifications
- Warranty expiration reminders
- Analytics dashboard
- Multi-branch support
- Installer management interface
- PDF export
- Bulk import

## 🐛 Troubleshooting

### "Cannot create project"
- Verify `generate_project_id()` function exists in database
- Check that you're authenticated as admin

### Photos not uploading
- Verify `project-photos` storage bucket exists
- Check storage policies allow authenticated uploads
- Ensure file size is under 5MB

### Passport not found
- Verify project status is 'published'
- Check that public_token was generated
- Confirm token in URL matches database

### RLS Errors
- Ensure all RLS policies were created
- Verify user is authenticated for admin routes

## 📚 Additional Documentation

- `DATABASE_SETUP.md` - Detailed database setup instructions
- `supabase-schema.sql` - Complete schema with comments

## 🤝 Support

For questions or issues, contact the Halla+ development team.

---

**Halla+** - Making installations feel documented, traceable, professional, premium, and supported.
