SELECT * FROM public."Agents"
ORDER BY id ASC 

alter table "Agents" add constraint full_name_model CHECK(full_name ~ '^[A-Za-z ]+$')
insert into "Agents"(full_name, password , phone_number, email_address) values 
('Lindah Chingeleshi','ChinLind123',09764756,'lindahchingeleshi@gmail.com'),
('Annie Mwape','AnnieMwape23',097788149, 'anniemwape@gmail.com'),
('Bennies Sikanwe', 'BSikawne345', 097788199,'bsikanwe@gmail.com')
