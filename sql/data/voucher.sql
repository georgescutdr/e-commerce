-- Insert voucher entries
INSERT INTO `voucher` (`name`, `description`, `type`, `value`, `expires_at`, `num`, `code`) VALUES
('10% Off Summer Sale', 'Get 10% off on all summer collection items. Limited time offer.', 'percentage', 10, '2025-06-30', 100, 123456),
('Holiday Discount', 'Save $20 on your purchase when you spend over $100. Limited time holiday offer.', 'fixed', 20, '2025-12-25', 200, 998877),
('New Customer Discount', 'Exclusive offer for new customers! Save 15% on your first purchase.', 'percentage', 15, '2025-07-31', 300, 123123);


-- Insert product-voucher associations
INSERT INTO `product_voucher` (`product_id`, `voucher_id`) VALUES
(321, 3), -- iPhone 15 Pro with 10% Off Summer Sale
(322, 7), -- iPhone 14 with New Customer Discount
(323, 3), -- S23 Ultra with 10% Off Summer Sale
(324, 6), -- A54 with Holiday Discount
(325, 3), -- Note 12 Pro with 10% Off Summer Sale
(326, 7), -- 11 with New Customer Discount
(327, 6), -- Pixel 8 with Holiday Discount
(328, 3), -- G Power 2023 with 10% Off Summer Sale
(329, 7), -- XPS 13 Plus with New Customer Discount
(330, 6), -- Spectre x360 with Holiday Discount
(331, 3), -- ThinkPad X1 Carbon with 10% Off Summer Sale
(332, 7), -- ROG Zephyrus G14 with New Customer Discount
(333, 6), -- Swift X with Holiday Discount
(334, 3), -- 511 Slim Jeans with 10% Off Summer Sale
(335, 7), -- Air Max 270 with New Customer Discount
(336, 6), -- Polo Shirt with Holiday Discount
(337, 3), -- Slim Fit Shirt with 10% Off Summer Sale
(338, 7), -- Oversized Blazer with New Customer Discount
(339, 6), -- Basic Hoodie with Holiday Discount
(340, 3), -- Floral Dress with 10% Off Summer Sale
(341, 7), -- Wool Coat with New Customer Discount
(342, 6), -- BBQ Chips with Holiday Discount
(343, 3), -- Cheddar Puffs with 10% Off Summer Sale
(344, 7), -- Salted Pretzels with New Customer Discount
(345, 6), -- Spicy Mix with Holiday Discount
(346, 3), -- Protein Bars with 10% Off Summer Sale
(347, 7), -- Trail Mix with New Customer Discount
(348, 6), -- Granola Bites with Holiday Discount
(349, 3), -- Veggie Chips with 10% Off Summer Sale
(350, 7), -- Sparkling Water with New Customer Discount
(351, 6), -- Cold Brew Coffee with Holiday Discount
(352, 3), -- Energy Drink with 10% Off Summer Sale
(353, 7), -- Coconut Water with New Customer Discount
(354, 6), -- Green Juice with Holiday Discount
(355, 3), -- Vitamin Water with 10% Off Summer Sale
(356, 7), -- Protein Shake with New Customer Discount
(357, 6); -- Herbal Infusion with Holiday Discount
