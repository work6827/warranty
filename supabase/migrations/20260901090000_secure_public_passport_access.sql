-- Secure public passport access behind narrowly scoped SECURITY DEFINER RPCs.
-- Anonymous users must not be able to enumerate published projects, customers,
-- phone numbers, internal notes, products, warranties, or installers directly.

CREATE OR REPLACE FUNCTION get_public_passport(p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'project', jsonb_build_object(
      'id', p.id,
      'project_id', p.project_id,
      'name', p.name,
      'project_type', p.project_type,
      'address', p.address,
      'installation_date', p.installation_date,
      'published_at', p.published_at,
      'customer', jsonb_build_object('name', c.name)
    ),
    'areas', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'name', a.name,
          'sort_order', a.sort_order,
          'items', COALESCE((
            SELECT jsonb_agg(
              jsonb_build_object(
                'id', i.id,
                'quantity', i.quantity,
                'unit', i.unit,
                'installation_date', i.installation_date,
                'batch_number', i.batch_number,
                'custom_specifications', i.custom_specifications,
                'custom_maintenance', i.custom_maintenance,
                'customer_notes', i.customer_notes,
                'product', jsonb_build_object(
                  'id', pr.id,
                  'brand', pr.brand,
                  'name', pr.name,
                  'series', pr.series,
                  'sku', pr.sku,
                  'specifications', pr.specifications,
                  'maintenance_instructions', pr.maintenance_instructions,
                  'category', jsonb_build_object('name', cat.name)
                ),
                'warranty', CASE WHEN w.id IS NULL THEN NULL ELSE jsonb_build_object(
                  'is_enabled', w.is_enabled,
                  'start_date', w.start_date,
                  'duration_months', w.duration_months,
                  'expiration_date', w.expiration_date,
                  'status', w.status,
                  'terms', w.terms
                ) END,
                'installer', CASE WHEN ins.id IS NULL THEN NULL ELSE jsonb_build_object('name', ins.name) END
              ) ORDER BY i.created_at
            )
            FROM project_items i
            JOIN products pr ON pr.id = i.product_id
            JOIN categories cat ON cat.id = pr.category_id
            LEFT JOIN warranties w ON w.project_item_id = i.id
            LEFT JOIN installers ins ON ins.id = i.installer_id
            WHERE i.area_id = a.id AND i.project_id = p.id
          ), '[]'::jsonb)
        ) ORDER BY a.sort_order
      )
      FROM project_areas a
      WHERE a.project_id = p.id
    ), '[]'::jsonb),
    'photos', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', ph.id,
          'file_url', ph.file_url,
          'photo_type', ph.photo_type,
          'caption', ph.caption
        ) ORDER BY ph.created_at
      )
      FROM project_photos ph
      WHERE ph.project_id = p.id AND ph.is_customer_visible = true
    ), '[]'::jsonb)
  ) INTO result
  FROM projects p
  JOIN customers c ON c.id = p.customer_id
  WHERE p.public_token = p_token AND p.status = 'published';

  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION lookup_public_passport(p_code TEXT, p_phone TEXT)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT p.public_token
  FROM projects p
  JOIN customers c ON c.id = p.customer_id
  WHERE p.project_id = upper(trim(p_code))
    AND p.status = 'published'
    AND length(regexp_replace(p_phone, '\D', '', 'g')) >= 6
    AND right(regexp_replace(c.phone, '\D', '', 'g'), 6)
      = right(regexp_replace(p_phone, '\D', '', 'g'), 6)
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION get_public_passport(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION lookup_public_passport(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_public_passport(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION lookup_public_passport(TEXT, TEXT) TO anon, authenticated;

DROP POLICY IF EXISTS "Public can view published projects" ON projects;
DROP POLICY IF EXISTS "Public can view customers of published projects" ON customers;
DROP POLICY IF EXISTS "Public can view areas of published projects" ON project_areas;
DROP POLICY IF EXISTS "Public can view items of published projects" ON project_items;
DROP POLICY IF EXISTS "Public can view warranties of published projects" ON warranties;
DROP POLICY IF EXISTS "Public can view customer-visible photos of published projects" ON project_photos;
DROP POLICY IF EXISTS "Everyone can read products" ON products;
DROP POLICY IF EXISTS "Everyone can read installers" ON installers;

