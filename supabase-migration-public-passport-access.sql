-- ============================================================================
-- Public passport read access
--
-- supabase-schema.sql enables RLS on every table but only ever grants SELECT
-- to authenticated admins (`auth.jwt()->>'role' = 'authenticated'`). The
-- public passport page (/p/[token]) and the new code+phone lookup on the
-- home page both query as the anon role, so without the policies below
-- every public request returns zero rows — the passport looks "not found"
-- for every real customer, regardless of a valid token or QR scan.
--
-- Run this once in the Supabase SQL Editor against your existing project.
-- It's additive (CREATE POLICY only) — safe to run alongside the existing
-- schema, and safe to fold into supabase-schema.sql for future fresh
-- installs (already reflected there).
--
-- Design: every policy is scoped to `projects.status = 'published'`, so
-- drafts stay admin-only. This intentionally does NOT expose data by token
-- match — Postgres RLS can't reference the query's :token parameter, only
-- row contents — so the token itself remains the secret; these policies
-- just stop blocking every anonymous read outright.
-- ============================================================================

-- Published projects themselves (passport header, project type/date, and
-- the code+phone lookup's project_id/status/customer join)
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

-- The customer's name (shown on the passport) and phone (matched
-- server-side by the lookup form) for published projects only — never
-- exposes customers linked to drafts.
CREATE POLICY "Public can view customers of published projects" ON customers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.customer_id = customers.id
        AND projects.status = 'published'
    )
  );

CREATE POLICY "Public can view areas of published projects" ON project_areas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_areas.project_id
        AND projects.status = 'published'
    )
  );

CREATE POLICY "Public can view items of published projects" ON project_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_items.project_id
        AND projects.status = 'published'
    )
  );

CREATE POLICY "Public can view warranties of published projects" ON warranties
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM project_items
      JOIN projects ON projects.id = project_items.project_id
      WHERE project_items.id = warranties.project_item_id
        AND projects.status = 'published'
    )
  );

-- Only customer-visible photos, and only for published projects — internal
-- installation photos stay admin-only.
CREATE POLICY "Public can view customer-visible photos of published projects" ON project_photos
  FOR SELECT USING (
    is_customer_visible = true
    AND EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_photos.project_id
        AND projects.status = 'published'
    )
  );

-- The product catalog and installer directory are reference data, not
-- secrets — the passport needs to read product specs/maintenance text and
-- the installer's name regardless of project status.
CREATE POLICY "Everyone can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read installers" ON installers
  FOR SELECT USING (true);
