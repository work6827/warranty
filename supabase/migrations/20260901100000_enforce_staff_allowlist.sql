-- Restrict administration to explicitly allowlisted, active staff accounts.
-- Bootstrap only users that are already confirmed when this migration runs.

INSERT INTO public.admin_users (id, email, full_name, role, is_active)
SELECT
  u.id,
  u.email,
  COALESCE(NULLIF(u.raw_user_meta_data->>'full_name', ''), split_part(u.email, '@', 1)),
  'admin',
  true
FROM auth.users u
WHERE u.email IS NOT NULL AND u.email_confirmed_at IS NOT NULL
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  is_active = true,
  updated_at = now();

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users a
    WHERE a.id = auth.uid() AND a.is_active = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;

DROP POLICY IF EXISTS "Admins can do everything on admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins can do everything on customers" ON customers;
DROP POLICY IF EXISTS "Admins can do everything on projects" ON projects;
DROP POLICY IF EXISTS "Admins can do everything on project_areas" ON project_areas;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage category_specifications" ON category_specifications;
DROP POLICY IF EXISTS "Admins can do everything on products" ON products;
DROP POLICY IF EXISTS "Admins can do everything on installers" ON installers;
DROP POLICY IF EXISTS "Admins can do everything on project_items" ON project_items;
DROP POLICY IF EXISTS "Admins can do everything on warranties" ON warranties;
DROP POLICY IF EXISTS "Admins can do everything on project_photos" ON project_photos;
DROP POLICY IF EXISTS "Admins can do everything on service_records" ON service_records;
DROP POLICY IF EXISTS "Admins can manage settings" ON settings;

CREATE POLICY "Active staff can manage admin_users" ON admin_users
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage customers" ON customers
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage projects" ON projects
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage project_areas" ON project_areas
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage categories" ON categories
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage category_specifications" ON category_specifications
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage products" ON products
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage installers" ON installers
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage project_items" ON project_items
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage warranties" ON warranties
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage project_photos" ON project_photos
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage service_records" ON service_records
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
CREATE POLICY "Active staff can manage settings" ON settings
  FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

-- Replace broad authenticated storage access if those original policies exist.
DROP POLICY IF EXISTS "Admins can upload project photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project photos" ON storage.objects;
CREATE POLICY "Active staff can upload project photos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-photos' AND public.is_admin_user());
CREATE POLICY "Active staff can update project photos" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-photos' AND public.is_admin_user())
  WITH CHECK (bucket_id = 'project-photos' AND public.is_admin_user());
CREATE POLICY "Active staff can delete project photos" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-photos' AND public.is_admin_user());

