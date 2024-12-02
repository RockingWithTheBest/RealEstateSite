import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg'
import cors from 'cors';

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
        const {full_name, password, phone_number,email_address,passport_number, agent_id } = req.body;
        if(!(full_name && password && phone_number&&email_address&&passport_number&&agent_id)){
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
        
        const encryptpassword =
        const client =  await dbConnect.query('INSERT INTO \"Clients\" (full_name, password, phone_number, email_address, passport_number, agent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ', [req.body.name, req.body.email, req.body.phone]);
        res.json({ message: 'Client added successfully.' });
    } catch (err) {
        console.error('Error adding client', err.message);
        res.status(500).send('Error adding client');
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});