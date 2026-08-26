-- Apply to existing databases to prevent duplicate human-readable project IDs
-- when two passports are published concurrently.
CREATE OR REPLACE FUNCTION generate_project_id()
RETURNS TEXT AS $$
DECLARE
  date_part TEXT;
  counter INTEGER;
  new_id TEXT;
BEGIN
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
