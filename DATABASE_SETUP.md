# Database Setup Instructions

## Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be fully provisioned

2. **Run the Database Schema**
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the entire contents of `supabase-schema.sql`
   - Paste and run it in the SQL Editor
   - This will create all tables, relationships, RLS policies, and initial data

3. **Set up Storage**
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `project-photos`
   - Set it to private (not public)
   - Go to Policies and add policies for authenticated users to upload/delete

4. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your project URL (found in Project Settings > API)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key (found in Project Settings > API)
     - `NEXT_PUBLIC_BASE_URL`: Your deployment URL (use `http://localhost:3000` for development)

5. **Create Admin User**
   - Go to Authentication in your Supabase dashboard
   - Add a new user with email and password
   - This will be your admin login

6. **Add Admin User to Database** (Optional)
   - If you want to track who creates/modifies records, run this SQL:
   ```sql
   INSERT INTO admin_users (email, full_name, role)
   VALUES ('your-admin@email.com', 'Admin Name', 'admin');
   ```

## Initial Data

The schema automatically populates:
- Product categories (Window Film, Flooring, Wall Panel, etc.)
- Category specifications for each product type
- Default settings

## Testing

1. Start the development server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Sign in with your admin credentials
4. You should be redirected to the admin dashboard

## Storage Policies (Run in SQL Editor if needed)

```sql
-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-photos');

-- Allow authenticated users to update photos
CREATE POLICY "Authenticated users can update photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-photos');

-- Allow authenticated users to delete photos
CREATE POLICY "Authenticated users can delete photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-photos');

-- Allow public access to photos (controlled at application level)
CREATE POLICY "Public can view photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-photos');
```

## Troubleshooting

### Can't create projects
- Ensure the `generate_project_id()` function was created successfully
- Check that your user is authenticated

### RLS Errors
- Make sure all RLS policies were created
- Verify that authenticated users have proper permissions

### Storage upload fails
- Verify the `project-photos` bucket exists
- Check that storage policies are in place
- Ensure the bucket has the correct access level

## Next Steps

After setup:
1. Log in to the admin panel
2. Create your first customer
3. Create a project
4. Add areas and products
5. Publish and test the customer passport
