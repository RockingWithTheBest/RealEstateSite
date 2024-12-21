SELECT * FROM public.roles
ORDER BY id ASC 

alter table  public.roles add constraint agents_role_id_fkey foreign key(agent) references "Agents"(id) 
on delete cascade

alter table  public.roles add constraint client_role_id_fkey foreign key(client) references "Clients"(id) 
on delete cascade

alter table public.roles alter column agent type int USING agent::integer
alter table public.roles alter column client type int USING client::integer