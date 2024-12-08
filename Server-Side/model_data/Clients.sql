SELECT * FROM public."Clients"
ORDER BY id ASC 

alter table "Clients" add constraint full_name_model CHECK(full_name ~ '^[A-Za-z ]+$')
alter table "Clients" add constraint passport_number_model CHECK(passport_number LIKE 'ZN%' )

alter table "Clients" add constraint agents_clients_id_fkey foreign key(agent_id) references "Agents"(id) 
on delete cascade


