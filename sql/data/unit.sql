INSERT INTO unit (name_singular, name, symbol) VALUES
('gram', 'grams', 'g'),
('inch', 'inches', 'in'),
('hertz', 'hertz', 'Hz'),
('milliampere-hour', 'milliampere-hours', 'mAh'),
('gigahertz', 'gigahertz', 'GHz'),
('gigabyte', 'gigabytes', 'GB'),
('megahertz', 'megahertz', 'MHz'),
('watt-hour', 'watt-hours', 'Wh'),
('hour', 'hours', 'h'),
('watt', 'watts', 'W'),
('kilocalorie', 'kilocalories', 'kcal'),
('milligram', 'milligrams', 'mg'),
('percent daily value', 'percent daily values', '%DV'),
('milliliter', 'milliliters', 'ml');


INSERT INTO attribute_unit (attribute_id, unit_id) VALUES
(10, 1),  -- Weight
(12, 2),  -- Screen Size
(15, 3),  -- Refresh Rate
(17, 3),  -- Touch Sampling Rate
(18, 4),  -- Battery Capacity (phones)
(68, 5),  -- Base Clock Speed
(69, 5),  -- Max Turbo Speed
(70, 6),  -- RAM Size
(72, 7),  -- RAM Speed
(75, 6),  -- Storage Capacity
(79, 6),  -- Graphics Memory
(80, 8),  -- Battery Capacity (laptops)
(81, 9),  -- Battery Life
(82, 10), -- Charging Speed
(138, 1), -- Net Weight
(139, 1), -- Serving Size
(143, 11),-- Calories per Serving
(144, 1), -- Total Fat
(145, 1), -- Saturated Fat
(146, 1), -- Trans Fat
(147, 12),-- Cholesterol
(148, 12),-- Sodium
(149, 1), -- Total Carbohydrates
(150, 1), -- Dietary Fiber
(151, 1), -- Sugars
(152, 1), -- Protein
(153, 13),-- Vitamins and Minerals
(166, 12),-- Caffeine Content
(169, 14);-- Bottle/Can Volume
