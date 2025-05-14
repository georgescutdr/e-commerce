INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
(26, 1, 'iPhone 15 Pro', 'Apple iPhone 15 Pro with A17 chip and ProMotion display.', 1199.99, 50, 'iphone-15-pro', 1),
(26, 1, 'iPhone 14', 'Apple iPhone 14 with A15 Bionic chip and dual-camera system.', 899.99, 40, 'iphone-14', 1),
(26, 5, 'Galaxy S23 Ultra', 'Samsung Galaxy S23 Ultra with 200MP camera and S Pen support.', 1299.99, 60, 'galaxy-s23-ultra', 1),
(26, 5, 'Galaxy A54', 'Samsung Galaxy A54 mid-range phone with AMOLED display.', 499.99, 100, 'galaxy-a54', 1),
(26, 25, 'Redmi Note 12 Pro', 'Xiaomi Redmi Note 12 Pro with 108MP camera and fast charging.', 349.99, 80, 'redmi-note-12-pro', 1),
(26, 26, 'OnePlus 11', 'OnePlus 11 flagship with Snapdragon 8 Gen 2 and Hasselblad camera.', 699.99, 70, 'oneplus-11', 1),
(26, 27, 'Pixel 8', 'Google Pixel 8 with Tensor G3 chip and AI-powered features.', 799.99, 30, 'pixel-8', 1),
(26, 28, 'Moto G Power 2023', 'Motorola Moto G Power 2023 with long-lasting battery and clean Android.', 199.99, 90, 'moto-g-power-2023', 1);


INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
(25, 29, 'Dell XPS 13 Plus', 'Dell XPS 13 Plus with Intel Core i7, 16GB RAM, and InfinityEdge display.', 1399.99, 30, 'dell-xps-13-plus', 1),
(25, 30, 'HP Spectre x360', 'HP Spectre x360 convertible laptop with 12th Gen Intel i7 and OLED touch display.', 1249.99, 25, 'hp-spectre-x360', 1),
(25, 31, 'Lenovo ThinkPad X1 Carbon', 'Lenovo ThinkPad X1 Carbon Gen 11 with lightweight design and business-grade performance.', 1499.99, 20, 'lenovo-thinkpad-x1-carbon', 1),
(25, 32, 'Asus ROG Zephyrus G14', 'Asus ROG Zephyrus G14 gaming laptop with Ryzen 9 and RTX 4060 GPU.', 1599.99, 15, 'asus-rog-zephyrus-g14', 1),
(25, 33, 'Acer Swift X', 'Acer Swift X ultra-portable laptop with AMD Ryzen 7 and NVIDIA GTX 1650.', 899.99, 40, 'acer-swift-x', 1);


INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
(27, 34, 'Levi\'s 511 Slim Jeans', 'Levi\'s 511 Slim Fit Jeans made with stretch denim for all-day comfort.', 79.99, 100, 'levis-511-slim-jeans', 1),
(27, 35, 'Nike Air Max 270', 'Nike Air Max 270 sneakers with large air unit and sporty design.', 129.99, 80, 'nike-air-max-270', 1),
(27, 36, 'Tommy Hilfiger Polo Shirt', 'Classic Tommy Hilfiger men\'s polo shirt with embroidered logo.', 59.99, 60, 'tommy-hilfiger-polo-shirt', 1),
(27, 37, 'Calvin Klein Slim Fit Shirt', 'Calvin Klein slim fit dress shirt made from breathable cotton.', 69.99, 50, 'calvin-klein-slim-fit-shirt', 1),
(3, 38, 'Zara Oversized Blazer', 'Zara oversized women\'s blazer with structured shoulders.', 99.99, 40, 'zara-oversized-blazer', 1),
(28, 39, 'H&M Basic Hoodie', 'H&M basic unisex hoodie made from soft fleece fabric.', 29.99, 120, 'hm-basic-hoodie', 1),
(28, 40, 'Forever 21 Floral Dress', 'Forever 21 women\'s floral print dress perfect for summer.', 39.99, 70, 'forever-21-floral-dress', 1),
(28, 41, 'Mango Wool Coat', 'Mango long wool coat with belt and notch lapel.', 149.99, 30, 'mango-wool-coat', 1);


INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
-- CrunchTime (Snacks)
(29, 42, 'CrunchTime BBQ Chips', 'Crispy BBQ-flavored potato chips with a bold, smoky taste.', 2.49, 200, 'crunchtime-bbq-chips', 1),
(29, 42, 'CrunchTime Cheddar Puffs', 'Baked cheese puffs bursting with cheddar flavor.', 2.99, 180, 'crunchtime-cheddar-puffs', 1),
(29, 42, 'CrunchTime Salted Pretzels', 'Classic salted pretzels made with whole wheat.', 1.99, 220, 'crunchtime-salted-pretzels', 1),
(29, 42, 'CrunchTime Spicy Mix', 'Snack mix with spicy nuts, crackers, and chips.', 3.49, 160, 'crunchtime-spicy-mix', 1),

-- Snackster (Snacks)
(29, 43, 'Snackster Protein Bars', 'Chocolate-flavored protein bars packed with 12g of protein.', 1.79, 300, 'snackster-protein-bars', 1),
(29, 43, 'Snackster Trail Mix', 'Healthy blend of dried fruits, seeds, and nuts.', 3.99, 250, 'snackster-trail-mix', 1),
(29, 43, 'Snackster Granola Bites', 'Crispy granola clusters with honey and oats.', 2.49, 210, 'snackster-granola-bites', 1),
(29, 43, 'Snackster Veggie Chips', 'Mixed vegetable chips made with real beets, carrots, and sweet potatoes.', 3.29, 190, 'snackster-veggie-chips', 1),

-- RefreshCo (Beverages)
(30, 44, 'RefreshCo Sparkling Water', 'Zero-calorie sparkling water with lemon-lime flavor.', 1.29, 400, 'refreshco-sparkling-water', 1),
(30, 44, 'RefreshCo Cold Brew Coffee', 'Smooth cold brew coffee with a bold kick.', 2.99, 350, 'refreshco-cold-brew-coffee', 1),
(30, 44, 'RefreshCo Energy Drink', 'Energy drink with caffeine, B-vitamins, and natural flavors.', 2.49, 380, 'refreshco-energy-drink', 1),
(30, 44, 'RefreshCo Coconut Water', 'Hydrating coconut water with no added sugar.', 2.19, 330, 'refreshco-coconut-water', 1),

-- VitalSip (Health Beverages)
(30, 45, 'VitalSip Green Juice', 'Organic green juice blend with spinach, kale, and apple.', 4.99, 150, 'vitalsip-green-juice', 1),
(30, 45, 'VitalSip Vitamin Water', 'Electrolyte-enhanced vitamin water with citrus flavor.', 2.29, 200, 'vitalsip-vitamin-water', 1),
(30, 45, 'VitalSip Protein Shake', 'Ready-to-drink chocolate protein shake with 20g protein.', 3.49, 180, 'vitalsip-protein-shake', 1),
(30, 45, 'VitalSip Herbal Infusion', 'Caffeine-free herbal tea blend with chamomile and mint.', 2.79, 170, 'vitalsip-herbal-infusion', 1);

-------------------------

INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
(26, 1, 'iPhone 15 Pro', 'Apple iPhone 15 Pro with A17 chip and ProMotion display.', 1199.99, 50, 'iphone-15-pro', 1),
(26, 1, 'iPhone 14', 'Apple iPhone 14 with A15 Bionic chip and dual-camera system.', 899.99, 40, 'iphone-14', 1),
(26, 5, 'S23 Ultra', 'Samsung Galaxy S23 Ultra with 200MP camera and S Pen support.', 1299.99, 60, 's23-ultra', 1),
(26, 5, 'A54', 'Samsung Galaxy A54 mid-range phone with AMOLED display.', 499.99, 100, 'a54', 1),
(26, 25, 'Note 12 Pro', 'Xiaomi Redmi Note 12 Pro with 108MP camera and fast charging.', 349.99, 80, 'note-12-pro', 1),
(26, 26, '11', 'OnePlus 11 flagship with Snapdragon 8 Gen 2 and Hasselblad camera.', 699.99, 70, '11', 1),
(26, 27, 'Pixel 8', 'Google Pixel 8 with Tensor G3 chip and AI-powered features.', 799.99, 30, 'pixel-8', 1),
(26, 28, 'G Power 2023', 'Motorola Moto G Power 2023 with long-lasting battery and clean Android.', 199.99, 90, 'g-power-2023', 1);

INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
(25, 29, 'XPS 13 Plus', 'Dell XPS 13 Plus with Intel Core i7, 16GB RAM, and InfinityEdge display.', 1399.99, 30, 'xps-13-plus', 1),
(25, 30, 'Spectre x360', 'HP Spectre x360 convertible laptop with 12th Gen Intel i7 and OLED touch display.', 1249.99, 25, 'spectre-x360', 1),
(25, 31, 'ThinkPad X1 Carbon', 'Lenovo ThinkPad X1 Carbon Gen 11 with lightweight design and business-grade performance.', 1499.99, 20, 'thinkpad-x1-carbon', 1),
(25, 32, 'ROG Zephyrus G14', 'Asus ROG Zephyrus G14 gaming laptop with Ryzen 9 and RTX 4060 GPU.', 1599.99, 15, 'rog-zephyrus-g14', 1),
(25, 33, 'Swift X', 'Acer Swift X ultra-portable laptop with AMD Ryzen 7 and NVIDIA GTX 1650.', 899.99, 40, 'swift-x', 1);

INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
(27, 34, '511 Slim Jeans', 'Levi\'s 511 Slim Fit Jeans made with stretch denim for all-day comfort.', 79.99, 100, '511-slim-jeans', 1),
(27, 35, 'Air Max 270', 'Nike Air Max 270 sneakers with large air unit and sporty design.', 129.99, 80, 'air-max-270', 1),
(27, 36, 'Polo Shirt', 'Classic Tommy Hilfiger men\'s polo shirt with embroidered logo.', 59.99, 60, 'polo-shirt', 1),
(27, 37, 'Slim Fit Shirt', 'Calvin Klein slim fit dress shirt made from breathable cotton.', 69.99, 50, 'slim-fit-shirt', 1),
(3, 38, 'Oversized Blazer', 'Zara oversized women\'s blazer with structured shoulders.', 99.99, 40, 'oversized-blazer', 1),
(28, 39, 'Basic Hoodie', 'H&M basic unisex hoodie made from soft fleece fabric.', 29.99, 120, 'basic-hoodie', 1),
(28, 40, 'Floral Dress', 'Forever 21 women\'s floral print dress perfect for summer.', 39.99, 70, 'floral-dress', 1),
(28, 41, 'Wool Coat', 'Mango long wool coat with belt and notch lapel.', 149.99, 30, 'wool-coat', 1);

INSERT INTO `product` (`category_id`, `brand_id`, `name`, `description`, `price`, `quantity`, `slug`, `visible`) VALUES
-- CrunchTime (Snacks)
(29, 42, 'BBQ Chips', 'Crispy BBQ-flavored potato chips with a bold, smoky taste.', 2.49, 200, 'bbq-chips', 1),
(29, 42, 'Cheddar Puffs', 'Baked cheese puffs bursting with cheddar flavor.', 2.99, 180, 'cheddar-puffs', 1),
(29, 42, 'Salted Pretzels', 'Classic salted pretzels made with whole wheat.', 1.99, 220, 'salted-pretzels', 1),
(29, 42, 'Spicy Mix', 'Snack mix with spicy nuts, crackers, and chips.', 3.49, 160, 'spicy-mix', 1),

-- Snackster (Snacks)
(29, 43, 'Protein Bars', 'Chocolate-flavored protein bars packed with 12g of protein.', 1.79, 300, 'protein-bars', 1),
(29, 43, 'Trail Mix', 'Healthy blend of dried fruits, seeds, and nuts.', 3.99, 250, 'trail-mix', 1),
(29, 43, 'Granola Bites', 'Crispy granola clusters with honey and oats.', 2.49, 210, 'granola-bites', 1),
(29, 43, 'Veggie Chips', 'Mixed vegetable chips made with real beets, carrots, and sweet potatoes.', 3.29, 190, 'veggie-chips', 1),

-- RefreshCo (Beverages)
(30, 44, 'Sparkling Water', 'Zero-calorie sparkling water with lemon-lime flavor.', 1.29, 400, 'sparkling-water', 1),
(30, 44, 'Cold Brew Coffee', 'Smooth cold brew coffee with a bold kick.', 2.99, 350, 'cold-brew-coffee', 1),
(30, 44, 'Energy Drink', 'Energy drink with caffeine, B-vitamins, and natural flavors.', 2.49, 380, 'energy-drink', 1),
(30, 44, 'Coconut Water', 'Hydrating coconut water with no added sugar.', 2.19, 330, 'coconut-water', 1),

-- VitalSip (Health Beverages)
(30, 45, 'Green Juice', 'Organic green juice blend with spinach, kale, and apple.', 4.99, 150, 'green-juice', 1),
(30, 45, 'Vitamin Water', 'Electrolyte-enhanced vitamin water with citrus flavor.', 2.29, 200, 'vitamin-water', 1),
(30, 45, 'Protein Shake', 'Ready-to-drink chocolate protein shake with 20g protein.', 3.49, 180, 'protein-shake', 1),
(30, 45, 'Herbal Infusion', 'Caffeine-free herbal tea blend with chamomile and mint.', 2.79, 170, 'herbal-infusion', 1);
