-- Insert promotions
INSERT INTO store_promotion (description, discount) VALUES
    ('10% off on all pet food', 10.0),
    ('Buy one get one free on toys', 50.0);

-- Insert collections (Removed "Reptile Essentials")
INSERT INTO store_collection (title, featured_product_id) VALUES
    ('Dog Essentials', NULL),
    ('Cat Essentials', NULL),
    ('Aquarium Essentials', NULL),
    ('Bird Essentials', NULL),
    ('Small Pet Essentials', NULL),
    ('Grooming Essentials', NULL),
    ('Training Essentials', NULL),
    ('Health & Wellness Essentials', NULL),
    ('Seasonal Essentials', NULL);

-- Insert products (Updated collection_id values)
INSERT INTO store_product (title, slug, description, unit_price, inventory, last_update, collection_id) VALUES
    ('Dog Food - Chicken & Rice', 'dog-food-chicken-rice', 'Nutritious dog food with chicken and rice.', 19.99, 50, NOW(), 1),
    ('Dog Chew Toy', 'dog-chew-toy', 'Durable chew toy for dogs.', 9.99, 100, NOW(), 1),
    ('Cat Litter Box', 'cat-litter-box', 'Easy to clean cat litter box.', 24.99, 30, NOW(), 2),
    ('Cat Scratching Post', 'cat-scratching-post', 'Perfect for keeping your cat’s claws healthy.', 29.99, 40, NOW(), 2),
    ('Aquarium Water Filter', 'aquarium-water-filter', 'High-efficiency aquarium water filter.', 39.99, 20, NOW(), 3),
    ('Fish Tank Heater', 'fish-tank-heater', 'Adjustable heater for aquariums.', 19.99, 25, NOW(), 3),
    ('Bird Cage', 'bird-cage', 'Spacious cage for birds.', 59.99, 15, NOW(), 4),
    ('Parrot Food', 'parrot-food', 'Nutritional food for parrots.', 14.99, 80, NOW(), 4),
    ('Dog Training Pads', 'dog-training-pads', 'Leak-proof training pads for puppies.', 15.99, 200, NOW(), 7),
    ('Cat Tree Tower', 'cat-tree-tower', 'Multi-level play area for cats.', 89.99, 18, NOW(), 2),
    ('Hamster Wheel', 'hamster-wheel', 'Exercise wheel for small pets.', 14.99, 60, NOW(), 5),
    ('Bird Feeder', 'bird-feeder', 'Outdoor feeder for wild birds.', 19.99, 50, NOW(), 4),
    ('Dog Shampoo', 'dog-shampoo', 'Gentle shampoo for dogs.', 12.99, 75, NOW(), 6),
    ('Cat Nail Clippers', 'cat-nail-clippers', 'Safe nail clippers for cats.', 9.99, 90, NOW(), 6),
    ('Fish Food - Tropical', 'fish-food-tropical', 'Nutrient-rich food for tropical fish.', 8.99, 100, NOW(), 3),
    ('Dog Leash', 'dog-leash', 'Strong and durable dog leash.', 17.99, 80, NOW(), 7),
    ('Cat Harness', 'cat-harness', 'Comfortable harness for cats.', 15.99, 65, NOW(), 7),
    ('Aquarium LED Light', 'aquarium-led-light', 'Energy-efficient lighting for fish tanks.', 29.99, 25, NOW(), 3),
    ('Bird Swing', 'bird-swing', 'Fun swinging perch for birds.', 10.99, 40, NOW(), 4),
    ('Puppy Training Clicker', 'puppy-training-clicker', 'Clicker for training puppies.', 5.99, 200, NOW(), 7),
    ('Dog Bed', 'dog-bed', 'Comfortable bed for dogs.', 45.99, 25, NOW(), 1),
    ('Cat Tunnel', 'cat-tunnel', 'Fun play tunnel for cats.', 22.99, 40, NOW(), 2),
    ('Guinea Pig Hideout', 'guinea-pig-hideout', 'Cozy hideout for small pets.', 18.99, 50, NOW(), 5),
    ('Tropical Fish Net', 'tropical-fish-net', 'Soft mesh net for handling fish.', 6.99, 80, NOW(), 3),
    ('Rabbit Hay Feeder', 'rabbit-hay-feeder', 'Hay feeder for rabbits.', 14.99, 60, NOW(), 5),
    ('Dog Cooling Mat', 'dog-cooling-mat', 'Cooling mat for hot days.', 39.99, 35, NOW(), 9),
    ('Catnip Toys', 'catnip-toys', 'Fun toys infused with catnip.', 12.99, 120, NOW(), 2),
    ('Aquarium Air Pump', 'aquarium-air-pump', 'Silent air pump for fish tanks.', 27.99, 30, NOW(), 3);

-- Insert product promotions
INSERT INTO store_product_promotions (product_id, promotion_id) VALUES
    (1, 1), (2, 2), (3, 1), (4, 2);

-- Insert order items
INSERT INTO store_orderitem (order_id, product_id, quantity, unit_price) VALUES
    (1, 1, 2, 19.99),
    (1, 2, 3, 9.99),
    (2, 3, 1, 24.99),
    (2, 4, 2, 29.99);

-- Insert reviews
INSERT INTO store_review (product_id, name, description, date) VALUES
    (1, 'Alice', 'My dog loves this food!', NOW()),
    (2, 'Bob', 'Great quality litter box.', NOW()),
    (3, 'Charlie', 'Works well in my aquarium.', NOW()),
    (4, 'Daisy', 'My cat enjoys this scratching post.', NOW());
