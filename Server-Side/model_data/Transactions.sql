SELECT * FROM public."Transactions"
ORDER BY id ASC 

alter table "Transactions" add constraint transactions_clients_id_fkey foreign key(client_id) references "Clients"(id) 
on delete cascade

alter table "Transactions" add constraint buy_sell_rent CHECK(transaction_status IN('Buy','Rent','Sell'))