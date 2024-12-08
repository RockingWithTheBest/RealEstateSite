SELECT * FROM public."Properties"
ORDER BY id ASC 

alter table "Properties" add constraint agents_clients_id_fkey foreign key(agent_id) references "Agents"(id) 
on delete cascade
alter table "Properties" add column coordinates_id int null
alter table "Properties" add constraint fk_prop_coord foreign key(coordinates_id)  references "coordinates"(id) on delete cascade 
alter table "Properties" add constraint clients_clients_id_fkey foreign key(client_id) references "Clients"(id) 

INSERT INTO "Properties" (name, address, location, number_of_rooms, price, agent_id) VALUES
('Sunset Villa', '123 Sunset Blvd, Queensburgh', 'Queensburgh', 4, '$300,000', 4),
('Hilltop Mansion', '456 Hilltop Ave, Queensburgh', 'Queensburgh', 5, '$500,000', 4),
('Riverside Cottage', '789 Riverside Dr, Queensburgh', 'Queensburgh', 3, '$150,000', 4),
('Downtown Apartment', '101 Downtown St, Queensburgh', 'Queensburgh', 2, '$120,000', 4),
('Greenwood Home', '202 Greenwood Ln, Chartsworth', 'Chartsworth', 4, '$250,000', 5),
('Beachside Bungalow', '303 Beachside Rd, Chartsworth', 'Chartsworth', 3, '$180,000', 5),
('Uptown Suite', '404 Uptown St, Chartsworth', 'Chartsworth', 1, '$90,000', 5),
('Suburban House', '505 Suburbia St, Risecliff', 'Risecliff', 4, '$220,000', 5),
('Old Town Apartment', '606 Old Town Ave, Western Cape', 'Western Cape', 2, '$110,000', 6),
('Industrial Loft', '707 Industrial Rd, Western Cape', 'Western Cape', 3, '$160,000', 6);