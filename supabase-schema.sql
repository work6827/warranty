-- Project H Database Schema for Supabase
-- This schema is designed for flexibility and multi-category support

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ADMIN USERS
-- ============================================================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- CUSTOMERS
-- ============================================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  notes TEXT,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_name ON customers(name);

-- ============================================================================
-- PROJECTS
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT UNIQUE NOT NULL, -- H-260824-001
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  project_type TEXT NOT NULL CHECK (project_type IN ('residential', 'office', 'commercial', 'hospitality', 'healthcare', 'education', 'other')),
  address TEXT,
  installation_date DATE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  public_token TEXT UNIQUE, -- Secure random token for public access
  notes TEXT,
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_projects_customer ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_public_token ON projects(public_token);
CREATE INDEX idx_projects_project_id ON projects(project_id);

-- Function to generate project ID
CREATE OR REPLACE FUNCTION generate_project_id()
RETURNS TEXT AS $$
DECLARE
  date_part TEXT;
  counter INTEGER;
  new_id TEXT;
BEGIN
  -- Serialize ID generation so concurrent publishes cannot receive the same ID.
  PERFORM pg_advisory_xact_lock(hashtext('project-h-project-id'));
  date_part := TO_CHAR(CURRENT_DATE, 'YYMMDD');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(project_id FROM 10) AS INTEGER)), 0) + 1
  INTO counter
  FROM projects
  WHERE project_id LIKE 'H-' || date_part || '-%';
  
  new_id := 'H-' || date_part || '-' || LPAD(counter::TEXT, 3, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- PROJECT AREAS
-- ============================================================================
CREATE TABLE project_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_areas_project ON project_areas(project_id);

-- ============================================================================
-- PRODUCT CATEGORIES
-- ============================================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Window Film', 'window-film', 'Kaca Film / Window Film products', 1),
('Flooring', 'flooring', 'Flooring products including vinyl, laminate, etc.', 2),
('Wall Panel', 'wall-panel', 'Wall panel products', 3),
('Wallboard', 'wallboard', 'Wallboard products', 4),
('Premium Wallpaper', 'premium-wallpaper', 'Premium wallpaper products', 5),
('Other', 'other', 'Other products', 999);

-- ============================================================================
-- CATEGORY SPECIFICATIONS
-- ============================================================================
CREATE TABLE category_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  data_type TEXT DEFAULT 'text' CHECK (data_type IN ('text', 'number', 'percentage', 'option')),
  unit TEXT, -- %, mm, m², etc.
  options JSONB, -- For select/radio options
  is_required BOOLEAN DEFAULT false,
  is_visible_to_customer BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Insert Window Film specifications
INSERT INTO category_specifications (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Film Type', 'film_type', 'text', NULL, true, 1 FROM categories WHERE slug = 'window-film'
UNION ALL
SELECT id, 'VLT', 'vlt', 'percentage', '%', true, 2 FROM categories WHERE slug = 'window-film'
UNION ALL
SELECT id, 'UV Rejection', 'uv_rejection', 'percentage', '%', true, 3 FROM categories WHERE slug = 'window-film'
UNION ALL
SELECT id, 'IR Rejection', 'ir_rejection', 'percentage', '%', true, 4 FROM categories WHERE slug = 'window-film'
UNION ALL
SELECT id, 'TSER', 'tser', 'percentage', '%', true, 5 FROM categories WHERE slug = 'window-film'
UNION ALL
SELECT id, 'Shade', 'shade', 'text', NULL, true, 6 FROM categories WHERE slug = 'window-film'
UNION ALL
SELECT id, 'Technology', 'technology', 'text', NULL, true, 7 FROM categories WHERE slug = 'window-film';

-- Insert Flooring specifications
INSERT INTO category_specifications (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Material', 'material', 'text', NULL, true, 1 FROM categories WHERE slug = 'flooring'
UNION ALL
SELECT id, 'Thickness', 'thickness', 'number', 'mm', true, 2 FROM categories WHERE slug = 'flooring'
UNION ALL
SELECT id, 'Wear Layer', 'wear_layer', 'number', 'mm', true, 3 FROM categories WHERE slug = 'flooring'
UNION ALL
SELECT id, 'Dimensions', 'dimensions', 'text', NULL, true, 4 FROM categories WHERE slug = 'flooring'
UNION ALL
SELECT id, 'Surface Finish', 'surface_finish', 'text', NULL, true, 5 FROM categories WHERE slug = 'flooring'
UNION ALL
SELECT id, 'Pattern', 'pattern', 'text', NULL, true, 6 FROM categories WHERE slug = 'flooring'
UNION ALL
SELECT id, 'Collection', 'collection', 'text', NULL, true, 7 FROM categories WHERE slug = 'flooring';

-- Insert Wall Panel specifications
INSERT INTO category_specifications (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Material', 'material', 'text', NULL, true, 1 FROM categories WHERE slug = 'wall-panel'
UNION ALL
SELECT id, 'Thickness', 'thickness', 'number', 'mm', true, 2 FROM categories WHERE slug = 'wall-panel'
UNION ALL
SELECT id, 'Dimensions', 'dimensions', 'text', NULL, true, 3 FROM categories WHERE slug = 'wall-panel'
UNION ALL
SELECT id, 'Finish', 'finish', 'text', NULL, true, 4 FROM categories WHERE slug = 'wall-panel'
UNION ALL
SELECT id, 'Pattern', 'pattern', 'text', NULL, true, 5 FROM categories WHERE slug = 'wall-panel'
UNION ALL
SELECT id, 'Collection', 'collection', 'text', NULL, true, 6 FROM categories WHERE slug = 'wall-panel';

-- Insert Wallboard specifications
INSERT INTO category_specifications (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Material', 'material', 'text', NULL, true, 1 FROM categories WHERE slug = 'wallboard'
UNION ALL
SELECT id, 'Thickness', 'thickness', 'number', 'mm', true, 2 FROM categories WHERE slug = 'wallboard'
UNION ALL
SELECT id, 'Dimensions', 'dimensions', 'text', NULL, true, 3 FROM categories WHERE slug = 'wallboard'
UNION ALL
SELECT id, 'Finish', 'finish', 'text', NULL, true, 4 FROM categories WHERE slug = 'wallboard'
UNION ALL
SELECT id, 'Collection', 'collection', 'text', NULL, true, 5 FROM categories WHERE slug = 'wallboard';

-- Insert Premium Wallpaper specifications
INSERT INTO category_specifications (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Collection', 'collection', 'text', NULL, true, 1 FROM categories WHERE slug = 'premium-wallpaper'
UNION ALL
SELECT id, 'Material', 'material', 'text', NULL, true, 2 FROM categories WHERE slug = 'premium-wallpaper'
UNION ALL
SELECT id, 'Roll Dimensions', 'roll_dimensions', 'text', NULL, true, 3 FROM categories WHERE slug = 'premium-wallpaper'
UNION ALL
SELECT id, 'Pattern', 'pattern', 'text', NULL, true, 4 FROM categories WHERE slug = 'premium-wallpaper'
UNION ALL
SELECT id, 'Origin', 'origin', 'text', NULL, true, 5 FROM categories WHERE slug = 'premium-wallpaper'
UNION ALL
SELECT id, 'Finish', 'finish', 'text', NULL, true, 6 FROM categories WHERE slug = 'premium-wallpaper';

-- ============================================================================
-- PRODUCTS (Catalog)
-- ============================================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id),
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  series TEXT,
  sku TEXT,
  specifications JSONB DEFAULT '{}', -- Flexible key-value storage
  default_warranty_months INTEGER DEFAULT 0,
  maintenance_instructions TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_active ON products(is_active);

-- ============================================================================
-- INSTALLERS
-- ============================================================================
CREATE TABLE installers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_installers_active ON installers(is_active);

-- ============================================================================
-- PROJECT ITEMS (Installed Products)
-- ============================================================================
CREATE TABLE project_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  area_id UUID NOT NULL REFERENCES project_areas(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  
  -- Installation details
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL, -- m², pcs, box, roll, meter
  installation_date DATE,
  installer_id UUID REFERENCES installers(id),
  batch_number TEXT,
  
  -- Overrides (if different from product catalog)
  custom_specifications JSONB DEFAULT '{}',
  custom_maintenance TEXT,
  
  -- Notes
  customer_notes TEXT,
  internal_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_items_project ON project_items(project_id);
CREATE INDEX idx_project_items_area ON project_items(area_id);
CREATE INDEX idx_project_items_product ON project_items(product_id);

-- ============================================================================
-- WARRANTIES
-- ============================================================================
CREATE TABLE warranties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_item_id UUID UNIQUE NOT NULL REFERENCES project_items(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT true,
  start_date DATE NOT NULL,
  duration_months INTEGER NOT NULL,
  expiration_date DATE NOT NULL,
  terms TEXT,
  -- Not a GENERATED column: CURRENT_DATE isn't IMMUTABLE, which Postgres
  -- requires for generated expressions. A BEFORE INSERT/UPDATE trigger
  -- (below) recomputes this instead — same "recomputed on write, not
  -- continuously" behavior a STORED generated column would have had.
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_warranties_status ON warranties(status);
CREATE INDEX idx_warranties_expiration ON warranties(expiration_date);

CREATE OR REPLACE FUNCTION calculate_warranty_status()
RETURNS TRIGGER AS $$
BEGIN
  NEW.status := CASE
    WHEN NOT NEW.is_enabled THEN 'no_warranty'
    WHEN NEW.expiration_date < CURRENT_DATE THEN 'expired'
    WHEN NEW.expiration_date <= CURRENT_DATE + INTERVAL '90 days' THEN 'expiring_soon'
    ELSE 'active'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_warranty_status
  BEFORE INSERT OR UPDATE ON warranties
  FOR EACH ROW EXECUTE FUNCTION calculate_warranty_status();

-- ============================================================================
-- PROJECT PHOTOS
-- ============================================================================
CREATE TABLE project_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  area_id UUID REFERENCES project_areas(id) ON DELETE SET NULL,
  project_item_id UUID REFERENCES project_items(id) ON DELETE SET NULL,
  
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  photo_type TEXT CHECK (photo_type IN ('before', 'during', 'after')),
  is_customer_visible BOOLEAN DEFAULT true,
  caption TEXT,
  
  uploaded_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_photos_project ON project_photos(project_id);
CREATE INDEX idx_project_photos_visibility ON project_photos(is_customer_visible);

-- ============================================================================
-- SERVICE RECORDS
-- ============================================================================
CREATE TABLE service_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  area_id UUID REFERENCES project_areas(id) ON DELETE SET NULL,
  project_item_id UUID REFERENCES project_items(id) ON DELETE SET NULL,
  
  service_date DATE NOT NULL,
  service_type TEXT NOT NULL,
  technician_id UUID REFERENCES installers(id),
  status TEXT DEFAULT 'completed' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  
  customer_notes TEXT,
  internal_notes TEXT,
  
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_records_project ON service_records(project_id);
CREATE INDEX idx_service_records_date ON service_records(service_date DESC);

-- ============================================================================
-- SETTINGS
-- ============================================================================
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO settings (key, value, description) VALUES
('company_name', 'Halla Home', 'Company name displayed on passports'),
('company_whatsapp', '628123456789', 'WhatsApp number for customer contact'),
('passport_url_prefix', 'https://projecth.hallahome.id/p/', 'Base URL for passport links');

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE installers ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranties ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Admin access policies (authenticated users with admin role)
CREATE POLICY "Admins can do everything on admin_users" ON admin_users
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on customers" ON customers
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on projects" ON projects
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on project_areas" ON project_areas
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Everyone can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Everyone can read category_specifications" ON category_specifications
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage category_specifications" ON category_specifications
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on products" ON products
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on installers" ON installers
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on project_items" ON project_items
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on warranties" ON warranties
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on project_photos" ON project_photos
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Admins can do everything on service_records" ON service_records
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

CREATE POLICY "Everyone can read settings" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings" ON settings
  FOR ALL USING (auth.jwt()->>'role' = 'authenticated');

-- Public access to published projects
--
-- Anonymous visitors (the /p/[token] passport page and the home page's
-- code+phone lookup) query as the anon role, so without explicit SELECT
-- policies scoped to published projects, RLS blocks them entirely — see
-- supabase-migration-public-passport-access.sql for the same statements
-- with fuller commentary if you're patching an existing database instead
-- of running this file fresh.

CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

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

CREATE POLICY "Public can view customer-visible photos of published projects" ON project_photos
  FOR SELECT USING (
    is_customer_visible = true
    AND EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_photos.project_id
        AND projects.status = 'published'
    )
  );

CREATE POLICY "Everyone can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Everyone can read installers" ON installers
  FOR SELECT USING (true);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_items_updated_at BEFORE UPDATE ON project_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_warranties_updated_at BEFORE UPDATE ON warranties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_records_updated_at BEFORE UPDATE ON service_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- STORAGE BUCKETS (Run these in Supabase Dashboard)
-- ============================================================================

-- Create storage bucket for project photos
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-photos', 'project-photos', false);

-- Storage policies for project photos
-- CREATE POLICY "Admins can upload project photos" ON storage.objects
--   FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-photos');

-- CREATE POLICY "Admins can update project photos" ON storage.objects
--   FOR UPDATE TO authenticated USING (bucket_id = 'project-photos');

-- CREATE POLICY "Admins can delete project photos" ON storage.objects
--   FOR DELETE TO authenticated USING (bucket_id = 'project-photos');

-- CREATE POLICY "Public can view customer-visible photos" ON storage.objects
--   FOR SELECT USING (bucket_id = 'project-photos');
