SELECT * FROM public."Agents"
ORDER BY id ASC 

alter table "Agents" add constraint full_name_model CHECK(full_name ~ '^[A-Za-z ]+$')
insert into "Agents"(full_name, password,phone_number, email_address) values ('2q32w','esgd',1211,'3asezgts')
delete from "Agents" where Id>0 