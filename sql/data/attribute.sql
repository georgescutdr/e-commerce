-- PHONES
INSERT INTO attribute (name) VALUES
-- General
('Operating System'),
('Release Year'),
('Body Material'),
('Dimensions'),
('Weight'),
('Color Options'),

-- Display
('Screen Size'),
('Resolution'),
('Display Type'),
('Refresh Rate'),
('HDR Support'),
('Touch Sampling Rate'),

-- Battery
('Battery Capacity'),
('Fast Charging'),
('Wireless Charging'),
('Battery Type'),

-- Camera
('Rear Camera Setup'),
('Front Camera'),
('Optical Zoom'),
('Video Recording'),
('OIS'),
('Camera Features'),

-- Performance
('Chipset'),
('CPU'),
('GPU'),
('RAM'),
('Storage Options'),
('Expandable Storage'),

-- Connectivity
('5G Support'),
('Wi-Fi Version'),
('Bluetooth Version'),
('USB Type'),
('NFC'),
('Dual SIM'),

-- Biometrics
('Fingerprint Sensor'),
('Face Unlock'),
('Security Chip'),

-- Build & Durability
('Water Resistance'),
('Dust Resistance'),

-- Audio & Extras
('Stereo Speakers'),
('3.5mm Jack'),
('Dolby Atmos'),
('Vibration Motor Type'),
('Special Features');


-- LAPTOPS
INSERT INTO attribute (name) VALUES
-- General
('Operating System'),
('Release Year'),
('Color Options'),
('Body Material'),
('Dimensions'),
('Weight'),

-- Display
('Screen Size'),
('Resolution'),
('Display Type'),
('Refresh Rate'),
('Touchscreen'),

-- Processor
('Processor Brand'),
('Processor Model'),
('CPU Generation'),
('CPU Cores'),
('CPU Threads'),
('Base Clock Speed'),
('Max Turbo Speed'),

-- Memory
('RAM Size'),
('RAM Type'),
('RAM Speed'),
('Upgradeable RAM'),

-- Storage
('Storage Type'),
('Storage Capacity'),
('Expandable Storage'),

-- Graphics
('GPU Brand'),
('GPU Model'),
('Graphics Memory'),

-- Battery
('Battery Capacity'),
('Battery Life'),
('Charging Speed'),

-- Connectivity
('Wi-Fi Version'),
('Bluetooth Version'),
('USB Ports'),
('HDMI Port'),
('Thunderbolt Port'),
('Ethernet Port'),
('Audio Jack'),
('Card Reader'),

-- Build & Input
('Keyboard Type'),
('Backlit Keyboard'),
('Fingerprint Sensor'),
('Webcam Resolution'),
('Speakers'),

-- Software & Security
('Pre-installed Software'),
('TPM Support'),
('Security Chip'),

-- Other Features
('Cooling System'),
('Laptop Type'),
('Convertible'),
('Stylus Support');


-- CLOTHING
INSERT INTO attribute (name) VALUES
-- General
('Gender'),
('Color'),
('Size'),
('Material'),
('Fit Type'),
('Pattern'),
('Sleeve Length'),
('Neck Type'),
('Occasion'),
('Season'),
('Style'),
('Closure Type'),

-- Technical & Care
('Stretchability'),
('Lining'),
('Transparency'),
('Care Instructions'),
('Fabric Weight'),

-- Bottoms (if applicable)
('Waist Rise'),
('Waistband Type'),
('Length Type'),
('Inseam Length'),
('Number of Pockets'),

-- Jackets & Outerwear
('Hooded'),
('Water Resistance'),
('Insulation Type'),
('Inner Material'),

-- Accessories (if part of product)
('Belt Included'),
('Scarf Included'),

-- Footwear (optional, if part of clothing section)
('Heel Type'),
('Heel Height'),
('Sole Material'),
('Toe Style');


-- FOOD
INSERT INTO attribute (name) VALUES
-- General
('Type'),
('Flavor'),
('Packaging Type'),
('Net Weight'),
('Serving Size'),
('Number of Servings'),
('Ingredients'),
('Allergen Information'),

-- Nutritional Info
('Calories per Serving'),
('Total Fat'),
('Saturated Fat'),
('Trans Fat'),
('Cholesterol'),
('Sodium'),
('Total Carbohydrates'),
('Dietary Fiber'),
('Sugars'),
('Protein'),
('Vitamins and Minerals'),

-- Dietary & Lifestyle
('Vegetarian'),
('Vegan'),
('Gluten Free'),
('Sugar Free'),
('Organic'),
('Non-GMO'),
('Keto Friendly'),
('Halal'),
('Kosher'),

-- Shelf & Storage
('Shelf Life'),
('Storage Instructions'),
('Expiration Date'),

-- Beverages Specific
('Caffeine Content'),
('Carbonation'),
('Serving Temperature'),
('Bottle/Can Volume'),
('Refrigeration Required');
