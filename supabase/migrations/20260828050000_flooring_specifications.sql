-- Remove duplicated/ambiguous Flooring catalog fields and split the old
-- combined dimensions field into explicit per-plank measurements.
DELETE FROM category_specifications
WHERE category_id = (SELECT id FROM categories WHERE slug = 'flooring')
  AND slug IN ('dimensions', 'surface_finish', 'collection');

INSERT INTO category_specifications
  (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Plank Length', 'plank_length', 'number', 'mm', true, 4
FROM categories WHERE slug = 'flooring'
ON CONFLICT (category_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  data_type = EXCLUDED.data_type,
  unit = EXCLUDED.unit,
  sort_order = EXCLUDED.sort_order;

INSERT INTO category_specifications
  (category_id, name, slug, data_type, unit, is_visible_to_customer, sort_order)
SELECT id, 'Plank Width', 'plank_width', 'number', 'mm', true, 5
FROM categories WHERE slug = 'flooring'
ON CONFLICT (category_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  data_type = EXCLUDED.data_type,
  unit = EXCLUDED.unit,
  sort_order = EXCLUDED.sort_order;

UPDATE category_specifications
SET sort_order = 6
WHERE category_id = (SELECT id FROM categories WHERE slug = 'flooring')
  AND slug = 'pattern';
