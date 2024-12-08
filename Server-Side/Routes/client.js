import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'
import cors from 'cors';
import bcrypt from 'bcrypt';

const { Client } = pkg;

const dbConnect = new Client({
    user: "postgres",
    password: "1790380037",
    database: "RealEstateDb",
    host: "127.0.0.1",
    port : "5432"
})

function Connection (){
    try{
        dbConnect.connect();
        console.log("Database connected successfully.");
    }
    catch(err){
        console.error("Error connecting to the database", err.message);
    }
}

Connection();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT  = '4000'
app.post('/client-register', async (req, res) => {
    try {
        const {full_name , password , phone_number , email_address , passport_number , agent_id } = req.body;
        if(!( full_name && password && phone_number && email_address && passport_number && agent_id)){
            res.status(400).send('All fields are required.');
            return;
        }
        // if(!( full_name && password && phone_number && email_address && passport_number )){
        //     res.status(400).send('All fields are required.');
        //     return;
        // }
        const result = await dbConnect.query("SELECT * FROM \"Clients\" WHERE \"passport_number\" = $1",
            [passport_number]
        )

        if(result.rows.length > 0){
            res.status(400).send('Client with such a Passport Number already exists.');
            return;
        }
        
        const hashedpassword = await bcrypt.hash(password, 10)
        console.log("HASHED", hashedpassword);
        //INSERTION
        try{
            const client =  await dbConnect.query('INSERT INTO \"Clients\" (full_name, password, phone_number, email_address, passport_number, agent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*', 
                [ full_name, hashedpassword, phone_number , email_address , passport_number , agent_id ]);
                // const client =  await dbConnect.query('INSERT INTO \"Clients\" (full_name, password, phone_number, email_address, passport_number) VALUES ($1, $2, $3, $4, $5) RETURNING*', 
                //     [ full_name, hashedpassword, phone_number , email_address , passport_number  ]);
            res.json({ message: 'Client added successfully.', data: client.rows[0] });
        }
        catch(err){
            console.error('Error adding client', err.message);
            res.status(500).send('Error adding client', err.message);
        }

 
    } catch (err) {
        console.error('Error adding client', err.message);
        res.status(500).send('Error adding client');
    }
})



app.get('/client-data', async(req, res) => {
    try{
        const result = await dbConnect.query("SELECT * FROM \"Clients\"");
        res.json(result.rows);
    }
    catch(err){
        console.error('Error getting clients', err.message);
        res.status(500).send('Error getting clients');
    }
});
app.put('/client-edit/:id', async(req, res) => {
    const {id} = req.params;
    try{
        const { full_name, phone_number, email_address, passport_number } = req.body;
        
        await dbConnect.query(
            "UPDATE \"Clients\" SET full_name=$1, phone_number=$2, email_address=$3, passport_number=$4 WHERE id=$5",
            [ full_name, phone_number, email_address, passport_number, id ]
        )
        const result = await dbConnect.query("SELECT * FROM \"Clients\" WHERE id=$1",
            [id]
        );
        if(result.rows.length === 0){
            res.status(404).send('Client not found.');
            return;
        }
        res.json(result.rows[0]);
    }
    catch(err) {
        console.error('Error updating client', err.message);
        res.status(500).send('Error updating client');
    }
})

app.delete('/client-delete/:id', async(req, res) => {
    const {id} = req.params;
    try{
        await dbConnect.query(
            "DELETE FROM \"Clients\" WHERE id=$1",
            [id]
        )
        res.json({ message: 'Client deleted successfully.' });
    }
    catch(err) {
        console.error('Error deleting client', err.message);
        res.status(500).send('Error deleting client');
    }
})
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});