SELECT * FROM public.neighborhoods
ORDER BY id ASC 

alter table "neighborhoods" add constraint neigh_property_id_fkey foreign key(property_id) references "Properties"(id) 
on delete cascade
alter table "neighborhoods" add property_id int not null

INSERT INTO public.neighborhoods (name, description, amenities, number_of_parks, property_id) VALUES
('Downtown', 'A bustling urban area with lots of shops and restaurants.', 'WiFi, Swimming Pool, Gym', 5, 1),
('Greenwood', 'A quiet neighborhood with many parks and green spaces.', 'Playground, Community Center', 8, 2),
('Uptown', 'An upscale area known for its luxury homes and amenities.', 'Spa, Fine Dining', 3, 3),
('Riverside', 'A scenic neighborhood along the river with walking trails.', 'Biking Trails, Fishing Areas', 4, 4),
('Hilltop', 'A peaceful area on a hill with beautiful views.', 'Hiking Trails, Picnic Areas', 2, 5),
('Beachside', 'A vibrant area near the beach with various activities.', 'Beach Access, Surfing', 6, 6),
('Midtown', 'A lively area with a mix of residential and commercial properties.', 'Shopping, Dining', 7, 7),
('Suburbia', 'A family-friendly neighborhood with good schools.', 'Parks, Schools', 9, 8),
('Old Town', 'A historic area with charming architecture and culture.', 'Museums, Galleries', 1, 9),
('Industrial District', 'An area with warehouses and factories.', 'Transport Links', 0, 10);
