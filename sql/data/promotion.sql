INSERT INTO `promotion` (`name`, `description`, `type`, `value`, `start_date`, `end_date`, `home`) VALUES
-- Percentage discount for a weekend flash sale
('Flash Deal Frenzy', 'Limited-time weekend offer! Enjoy a major discount on select items.', 'percentage', 15.0, '2025-05-17', '2025-05-19', 1),

-- Fixed amount off for bulk purchases
('Buy More, Save More', 'Get $10 off when you spend $100 or more. Great for bulk shopping!', 'fixed', 10.0, '2025-05-15', '2025-06-15', 0),

-- Tiered price drop promotion
('Weekend Price Drop', 'Prices drop automatically at checkout during the weekend. Don’t miss out!', 'percentage', 20.0, '2025-05-18', '2025-05-20', 1);



-- Insert product-promotion associations
INSERT INTO `product_promotion` (`product_id`, `promotion_id`) VALUES
(321, 5), -- iPhone 15 Pro with Flash Deal Frenzy
(322, 7), -- iPhone 14 with Weekend Price Drop
(323, 5), -- S23 Ultra with Flash Deal Frenzy
(324, 6), -- A54 with Buy More, Save More
(325, 5), -- Note 12 Pro with Flash Deal Frenzy
(326, 7), -- 11 with Weekend Price Drop
(327, 6), -- Pixel 8 with Buy More, Save More
(328, 5), -- G Power 2023 with Flash Deal Frenzy
(329, 7), -- XPS 13 Plus with Weekend Price Drop
(330, 6), -- Spectre x360 with Buy More, Save More
(331, 5), -- ThinkPad X1 Carbon with Flash Deal Frenzy
(332, 7), -- ROG Zephyrus G14 with Weekend Price Drop
(333, 6), -- Swift X with Buy More, Save More
(334, 5), -- 511 Slim Jeans with Flash Deal Frenzy
(335, 7), -- Air Max 270 with Weekend Price Drop
(336, 6), -- Polo Shirt with Buy More, Save More
(337, 5), -- Slim Fit Shirt with Flash Deal Frenzy
(338, 7), -- Oversized Blazer with Weekend Price Drop
(339, 6), -- Basic Hoodie with Buy More, Save More
(340, 5), -- Floral Dress with Flash Deal Frenzy
(341, 7), -- Wool Coat with Weekend Price Drop
(342, 6), -- BBQ Chips with Buy More, Save More
(343, 5), -- Cheddar Puffs with Flash Deal Frenzy
(344, 7), -- Salted Pretzels with Weekend Price Drop
(345, 6), -- Spicy Mix with Buy More, Save More
(346, 5), -- Protein Bars with Flash Deal Frenzy
(347, 7), -- Trail Mix with Weekend Price Drop
(348, 6), -- Granola Bites with Buy More, Save More
(349, 5), -- Veggie Chips with Flash Deal Frenzy
(350, 7), -- Sparkling Water with Weekend Price Drop
(351, 6), -- Cold Brew Coffee with Buy More, Save More
(352, 5), -- Energy Drink with Flash Deal Frenzy
(353, 7), -- Coconut Water with Weekend Price Drop
(354, 6), -- Green Juice with Buy More, Save More
(355, 5), -- Vitamin Water with Flash Deal Frenzy
(356, 7), -- Protein Shake with Weekend Price Drop
(357, 6); -- Herbal Infusion with Buy More, Save More
