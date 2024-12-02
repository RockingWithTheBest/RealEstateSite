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
        // if(!( full_name && password && phone_number && email_address && passport_number && agent_id)){
        //     res.status(400).send('All fields are required.');
        //     return;
        // }
        if(!( full_name && password && phone_number && email_address && passport_number )){
            res.status(400).send('All fields are required.');
            return;
        }
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
            // const client =  await dbConnect.query('INSERT INTO \"Clients\" (full_name, password, phone_number, email_address, passport_number, agent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ', 
            //     [ full_name, hashedpassword, phone_number , email_address , passport_number , agent_id ]);
                const client =  await dbConnect.query('INSERT INTO \"Clients\" (full_name, password, phone_number, email_address, passport_number) VALUES ($1, $2, $3, $4, $5) RETURNING*', 
                    [ full_name, hashedpassword, phone_number , email_address , passport_number  ]);
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

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});