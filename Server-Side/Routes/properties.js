import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pkg from 'pg';

const {Client} =pkg;

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
        console.log(err);
    }
}

Connection();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = "4111"

app.get('/properites', async (req, res) =>{
    const results = await dbConnect.query('SELECT * FROM \"Properties\"');
    res.json(results.rows);
})

app.post('/properites', async (req, res) =>{
    const { name, address, location, number_of_rooms, agent_id , price} = req.body;
    if (!(name && address && location && number_of_rooms && agent_id && price)) {
        return res.status(400).json({message: "All fields are required."});
    }
    try{

        const result = await dbConnect.query('SELECT * FROM \"Properties\" WHERE \"address\" = $1',
            [ address ])
        if(result.rows.length > 0){
            return res.status(400).send('Property with such an Address already exists.');
        }

        try{
            const property = await dbConnect.query('INSERT INTO \"Properties\"(name, address, location, number_of_rooms, price, agent_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*',
                 [name, address, location, number_of_rooms, price, agent_id]
            )
            res.json({ message: 'Property added successfully.', property: property.rows[0] });
        }
        catch(err){
            console.error('Error adding property', err.message);
            res.status(500).send('Error adding property');
        }
    }
    catch(err){
        console.error('Error checking property', err.message);
        res.status(500).send('Error checking property');
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});

