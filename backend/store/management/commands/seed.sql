INSERT INTO store_collection (title) VALUES
    ('Dog Essentials'),
    ('Cat Essentials'),
    ('Aquarium Essentials'),
    ('Bird Essentials'),
    ('Small Pet Essentials'),
    ('Grooming Essentials'),
    ('Training Essentials'),
    ('Health & Wellness Essentials'),
    ('Seasonal Essentials');

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

INSERT INTO store_promotion (description, discount) VALUES
    ('10% off on all pet food', 10.0),
    ('Buy one get one free on toys', 50.0);

INSERT INTO store_product_promotions (product_id, promotion_id) VALUES
    (1, 1), (2, 2), (3, 1), (4, 2);

INSERT INTO store_review (product_id, name, description, date) VALUES
    (1, 'Alice', 'My dog loves this food!', NOW()),
    (2, 'Bob', 'Great quality litter box.', NOW()),
    (3, 'Charlie', 'Works well in my aquarium.', NOW()),
    (4, 'Daisy', 'My cat enjoys this scratching post.', NOW());

INSERT INTO store_productimage (image, product_id)
VALUES 
    ('product_images/Dog-Food-Chicken-Rice.jpeg', (SELECT id FROM store_product WHERE slug = 'dog-food-chicken-rice')),
    ('product_images/dog-chew-toy.jpg', (SELECT id FROM store_product WHERE slug = 'dog-chew-toy')),
    ('product_images/cat-litter-box.jpg', (SELECT id FROM store_product WHERE slug = 'cat-litter-box')),
    ('product_images/cat-scratching-post.jpg', (SELECT id FROM store_product WHERE slug = 'cat-scratching-post')),
    ('product_images/aquarium-water-filter.jpg', (SELECT id FROM store_product WHERE slug = 'aquarium-water-filter')),
    ('product_images/fish-tank-heater.jpg', (SELECT id FROM store_product WHERE slug = 'fish-tank-heater')),
    ('product_images/bird-cage.jpeg', (SELECT id FROM store_product WHERE slug = 'bird-cage')),
    ('product_images/parrot-food.jpg', (SELECT id FROM store_product WHERE slug = 'parrot-food')),
    ('product_images/dog-training-pads.jpg', (SELECT id FROM store_product WHERE slug = 'dog-training-pads')),
    ('product_images/cat-tree-tower.jpg', (SELECT id FROM store_product WHERE slug = 'cat-tree-tower')),
    ('product_images/Hamster-Wheel.jpeg', (SELECT id FROM store_product WHERE slug = 'hamster-wheel')),
    ('product_images/bird-feeder.jpg', (SELECT id FROM store_product WHERE slug = 'bird-feeder')),
    ('product_images/dog-shampoo.jpg', (SELECT id FROM store_product WHERE slug = 'dog-shampoo')),
    ('product_images/cat-nail-clippers.jpg', (SELECT id FROM store_product WHERE slug = 'cat-nail-clippers')),
    ('product_images/Fish-Food.jpg', (SELECT id FROM store_product WHERE slug = 'fish-food-tropical')),
    ('product_images/dog-leash.jpg', (SELECT id FROM store_product WHERE slug = 'dog-leash')),
    ('product_images/cat-harness.jpg', (SELECT id FROM store_product WHERE slug = 'cat-harness')),
    ('product_images/aquarium-led-light.jpg', (SELECT id FROM store_product WHERE slug = 'aquarium-led-light')),
    ('product_images/bird-swing.jpg', (SELECT id FROM store_product WHERE slug = 'bird-swing')),
    ('product_images/puppy-training-clicker.jpg', (SELECT id FROM store_product WHERE slug = 'puppy-training-clicker')),
    ('product_images/dog-bed.jpg', (SELECT id FROM store_product WHERE slug = 'dog-bed')),
    ('product_images/cat-tunnel.jpg', (SELECT id FROM store_product WHERE slug = 'cat-tunnel')),
    ('product_images/guinea-pig-hideout.jpg', (SELECT id FROM store_product WHERE slug = 'guinea-pig-hideout')),
    ('product_images/tropical-fish-net.jpg', (SELECT id FROM store_product WHERE slug = 'tropical-fish-net')),
    ('product_images/rabbit-hay-feeder.jpg', (SELECT id FROM store_product WHERE slug = 'rabbit-hay-feeder')),
    ('product_images/dog-cooling-mat.jpg', (SELECT id FROM store_product WHERE slug = 'dog-cooling-mat')),
    ('product_images/catnip-toy.jpg', (SELECT id FROM store_product WHERE slug = 'catnip-toys')),
    ('product_images/aquarium-air-pump.jpg', (SELECT id FROM store_product WHERE slug = 'aquarium-air-pump'));